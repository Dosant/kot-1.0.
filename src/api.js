import axios from 'axios';

export function startImitation(params) {
  return axios.post('/start', params)
    .then((result) => result.data);
}

export function stopImitation() {
  return axios.post('/stop')
    .then((result) => result.data);
}

export function getStatus() {
  return axios.get('/status')
    .then((result) => result.data);
}

export function tryToReconnect() {
  return axios.get('/reconnect')
    .then((result) => result.data);
}