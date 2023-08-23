import axios from 'axios';

export function getSystemLogs(params) {
  return axios.get('/api/logs', { params });
}
