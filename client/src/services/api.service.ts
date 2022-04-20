import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { REFRESH_TOKEN_NAME } from '../constants';
import { newCookie } from './auth.service';

export function getRefreshToken(): string {
  return localStorage.getItem(REFRESH_TOKEN_NAME) || '';
}

export function setRefreshToken(token: string) {
  return localStorage.setItem(REFRESH_TOKEN_NAME, token);
}

const apiInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiInstance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.params = config.params || {};
  return config;
});

if (process.env.NODE_ENV !== 'production') {
  apiInstance.defaults.baseURL = 'http://localhost:8000/api/';
  //  apiInstance.defaults.baseURL = 'https://jobtec-api.herokuapp.com/api/';
} else {
  apiInstance.defaults.baseURL = 'http://localhost:8000/api/';
}

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async function (error: AxiosError) {
    const originalRequest = error.config;
    let retry = false;
    if (error?.response?.status === 401 && !retry) {
      retry = true;
      const refreshToken = getRefreshToken();
      return newCookie({ refreshToken })
        .then(() => {
          return apiInstance(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  },
);

export default apiInstance;
