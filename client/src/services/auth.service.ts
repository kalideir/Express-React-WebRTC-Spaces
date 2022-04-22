import apiService from './api.service';
import { NewTokenData } from '../@types';

export async function newCookie(data: NewTokenData) {
  return apiService.get('/auth/token', { data });
}
