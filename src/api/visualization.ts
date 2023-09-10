import axios from 'axios';

export function getRecent7DaysData() {
  return axios.get('/api/stats/recent7DaysData');
}
