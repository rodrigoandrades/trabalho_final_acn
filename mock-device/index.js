'use strict';

var fs = require('fs'); 
var jwt = require('jsonwebtoken'); 
var mqtt = require('mqtt'); 
 
var projectId = 'eighth-jigsaw-219600';
var cloudRegion = 'us-central1'; 
var registryId = 'puc-minas'; 
var deviceId = 'dispositivo-paciente'; 
 
var mqttHost = 'mqtt.googleapis.com'; 
var mqttPort = 443; 
var privateKeyFile = '../certs/rsa_private.pem'; 
var algorithm = 'RS256'; 
var messageType = 'events'; // state or events


const mqttClientId = `projects/${projectId}/locations/${cloudRegion}/registries/${registryId}/devices/${deviceId}`;
let mqttTopic = `/devices/${deviceId}/${messageType}`;

let connectionArgs = {
  host: mqttHost,
  port: mqttPort,
  clientId: mqttClientId,
  username: 'unused',
  password: createJwt(projectId, privateKeyFile, algorithm),
  protocol: 'mqtts',
  secureProtocol: 'TLSv1_2_method'
};

let client = mqtt.connect(connectionArgs);

client.on('connect', (success) => {
  if (success) { 
    console.log('Client connected...'); 
    sendData();
  } else { 
    console.log('Client not connected...'); 
  } 
});

client.on('close', () => {
  //console.log('close');
});

client.on('error', (err) => {
  console.log('error', err);
});

client.on('message', (topic, message, packet) => {
  console.log('message received: ', Buffer.from(message, 'base64').toString('ascii'));
});

client.on('packetsend', () => {
  //console.log('packetsend')
});

function createJwt (projectId, privateKeyFile, algorithm) {
  const token = {
    'iat': parseInt(Date.now() / 1000),
    'exp': parseInt(Date.now() / 1000) + 20 * 60, // 20 minutes
    'aud': projectId
  };
  const privateKey = fs.readFileSync(privateKeyFile);
  return jwt.sign(token, privateKey, { algorithm: algorithm });
}

function sendData() { 
  var payload = JSON.parse(process.argv[2]);
  payload.time = new Date().toISOString().slice(0, 19).replace('T', ' ');
 
  payload = JSON.stringify(payload); 
  console.log(mqttTopic, ': Publishing message:', payload);
  client.publish(mqttTopic, payload, { qos: 0 });
  client.end();
  //console.log('Transmitting in 30 seconds');
  //setTimeout(sendData, 30000);
}
