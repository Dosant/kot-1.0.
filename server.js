const express = require('express');
const app = express();
// const http = require('http');
require('./server/config')(app);
const port = process.env.PORT || 8150;
let imitationTimer;

// const server = http.createServer(app);
// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ server });
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
const config = require('config');
const systemUrl = config.get('systemUrl');

const WebSocket = require('ws');
let ws = connect();
function connect() {
  let ws = new WebSocket(`ws://${systemUrl}/api/realtime/imitation`);

  ws.on('open', function open() {
    console.log('Connection with system server is active');
  });

  ws.on('error', (error) => {
    console.error('Connection error:', error);
  });

  return ws;
}

const axios = require('axios');
let elements;
axios.get(`http://${systemUrl}/api/elements`)
  .then(result => {
    console.log('Elements loaded');
    elements = result.data;
  });

app.get('/status', (req, res, next) => {
    res.json({isConnected: ws.readyState === ws.OPEN, isActive: !!imitationTimer });
});

app.post('/start', (req, res, next) => {
  console.log('start generating with params: ', req.body);
  imitationTimer = startImitation(req.body.errorRate, req.body.period);
  res.send(true);
});

app.post('/stop', (req, res, next) => {
  if (imitationTimer) {
    clearInterval(imitationTimer);
    imitationTimer = null;
  }
  console.log('finish generating');
  res.send(true);
});

app.get('/reconnect', (req, res, next) => {
  console.log('/reconnect');
  if (ws.readyState === ws.OPEN) {
    res.send(true);
  } else {
    ws = connect();
    res.send(true);
  }
});

app.use('/', express.static('build/'));
app.use('/*', express.static('build/index.html'));


function startImitation(errorRate, period) {
  const intervalTime = 60*60 / period;
  return setInterval(() => {
    generateAndSendData(elements, errorRate, intervalTime);
  }, intervalTime * 1000);
}

const { generateOneTimeLayer } = require('./generator/index');

function generateAndSendData(errorRate, intervalTime) {
  const data = prepareDataForSending(generateOneTimeLayer(elements, errorRate, intervalTime));
  console.log('data generated:', data);
  if (ws.readyState === ws.OPEN) {
    axios.post(`http://${systemUrl}/api/data`, data);
  }
}

function prepareDataForSending(dataSet) {
  return dataSet.map((data) => {
    return {
      element: data.element._id,
      date: data.date,
      isolation: +data.isolation,
      resistance: +data.resistance,
      power: +data.power
    }
  })
}