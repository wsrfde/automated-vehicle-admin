import axios from 'axios';

export function addVehicleData(data) {
  return axios.post('/api/vehicles', data);
}

export function getVehicleData(params) {
  return axios.get('/api/vehicles', { params });
}

export function deleteVehicleData(data) {
  return axios.delete('/api/vehicles', { data });
}

export function editVehicleData(data) {
  return axios.put('/api/vehicles', data);
}

export function emergencyStop(data) {
  return axios.post('/api/mqtt/emergency', data);
}

export function overheadCrane(data) {
  return axios.post('/api/mqtt/overheadCrane', data);
}

export function getJobStatistics(params) {
  return axios.get('/api/stats', { params });
}
// 发送指令，baseURL写死，只允许在测试环境测试
export function sendInstructions(data) {
  const testURL = 'http://121.196.49.105:6645';
  return axios.post(`${testURL}/api/mqtt/sendMessage`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
