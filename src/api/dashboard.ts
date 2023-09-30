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
// 发送自定义指令
export function sendCustomDirective(data) {
  return axios.post(`/api/mqtt/sendMessage`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
// 测试环境：发送自定义指令
// export function sendInstructions(data) {
//   const testURL = 'http://192.168.8.8:8000';
//   return axios.post(`${testURL}/api/mqtt/sendMessage`, data, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// }
