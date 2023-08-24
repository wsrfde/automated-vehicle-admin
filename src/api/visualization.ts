import axios from 'axios';

export function getStatistics(params) {
  return axios.get('/api/stats/analysis', { params });
}
