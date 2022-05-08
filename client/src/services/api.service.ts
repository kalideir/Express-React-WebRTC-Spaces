import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { REFRESH_TOKEN_NAME } from '../constants';
import { newCookie } from '../store/authSlice';

export function getRefreshToken(): string {
  return localStorage.getItem(REFRESH_TOKEN_NAME) || '';
}

export function setRefreshToken(token: string) {
  return localStorage.setItem(REFRESH_TOKEN_NAME, token);
}

const apiService = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiService.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.params = config.params || {};
  return config;
});

if (process.env.NODE_ENV !== 'production') {
  apiService.defaults.baseURL = 'http://localhost:8000/api/';
  //  apiService.defaults.baseURL = 'https://jobtec-api.herokuapp.com/api/';
} else {
  apiService.defaults.baseURL = 'http://localhost:8000/api/';
}
let retries = 0;

apiService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async function (error: AxiosError) {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();
    if (refreshToken && error?.response?.status === 401) {
      retries += 1;
      if (retries < 3)
        return newCookie(refreshToken)
          .then(() => {
            return apiService(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
    }
    return Promise.reject(error);
  },
);

export default apiService;
