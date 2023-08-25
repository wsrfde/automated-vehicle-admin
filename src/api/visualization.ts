import axios from 'axios';

export function getRecent7DaysData(params) {
  return axios.get('/api/stats/recent7DaysData', { params });
}
