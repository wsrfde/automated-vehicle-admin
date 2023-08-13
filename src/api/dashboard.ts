import axios from 'axios';

export function addVehicleData(data) {
  return axios.post('/api/vehicle', data);
}

export function getVehicleData(params) {
  return axios.get('/api/vehicle', { params });
}

export function deleteVehicleData(data) {
  return axios.delete('/api/vehicle', { data });
}

export function editVehicleData(data) {
  return axios.put('/api/vehicle', data);
}
