import axios from 'axios';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/auth/login', data);
  // return axios.post<LoginRes>('/api/user/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/auth/info');
  // return axios.post<UserState>('/api/user/info');
}

export function getCodeImg() {
  return axios.get('/auth/code');
}

export function updatePass(data) {
  return axios.post('/api/users/updatePass', data);
}

export function editUser(data) {
  return axios.put('/api/users/center', data);
}

export function resetEmail(data) {
  return axios.post(`api/code/resetEmail?email=${data}`);
}

export function getRoles(params) {
  return axios.get('/api/roles', { params });
}

export function addRole(data) {
  return axios.post('/api/roles', data);
}

export function deleteRole(ids) {
  return axios.delete('/api/roles/', { data: ids });
}

export function editRole(data) {
  return axios.put('/api/roles', data);
}
