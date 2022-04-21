import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../utils';

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const ApiService = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Space'],
  endpoints: () => ({}),
});

export default ApiService;
