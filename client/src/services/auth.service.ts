import { NewTokenData } from '../@types';
import apiInstance from './api.service';

export async function newCookie(data: NewTokenData) {
  return apiInstance.get('/auth/token', { data });
}
