var fs = require('fs'); 
var jwt = require('jsonwebtoken'); 
var mqtt = require('mqtt'); 
 
var projectId = 'eighth-jigsaw-219600';
var cloudRegion = 'us-central1'; 
var registryId = 'my-registry'; 
var deviceId = 'my-node-device'; 
 
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
  console.log('close');
});

client.on('error', (err) => {
  console.log('error', err);
});

client.on('message', (topic, message, packet) => {
  console.log('message received: ', Buffer.from(message, 'base64').toString('ascii'));
});

client.on('packetsend', () => {
  console.log('packetsend')
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
  var payload = {
    'temp': 1,
    'humd': 1,
    'time': new Date().toISOString().slice(0, 19).replace('T', ' ') // https://stackoverflow.com/a/11150727/1015046 
  }
 
  payload = JSON.stringify(payload); 
  console.log(mqttTopic, ': Publishing message:', payload);
  client.publish(mqttTopic, payload, { qos: 1 });
 
  console.log('Transmitting in 30 seconds');
  setTimeout(sendData, 30000);
}






/*
var mqttClientId = `projects/${projectId}/locations/${cloudRegion}/registries/${registryId}/devices/${deviceId}`;
var mqttTopic = `/devices/${deviceId}/${messageType}`;
 
var connectionArgs = { 
  host: mqttHost, 
  port: mqttPort, 
  clientId: mqttClientId, 
  username: 'unused', 
  password: createJwt(projectId, privateKeyFile, algorithm),
  protocol: 'mqtts', 
  secureProtocol: 'TLSv1_2_method',
  ca: fs.readFileSync('roots.pem'),
  rejectUnauthorized: false
}; 
 
console.log('connecting...'); 
var client = mqtt.connect(connectionArgs); 
 
// Subscribe to the /devices/{device-id}/config topic to receive config updates. 
client.subscribe('/devices/' + deviceId + '/my-device-events'); 
// client.subscribe(`projects/${projectId}/topics/my-device-events`);

 
client.on('connect', function(success) { 
  if (success) { 
    console.log('Client connected...'); 
    sendData(); 
  } else { 
    console.log('Client not connected...'); 
  } 
}); 
 
client.on('close', function() { 
  console.log('close'); 
}); 
 
client.on('error', function(err) { 
  console.log('error', err); 
}); 

client.on('message', function(topic, message, packet) { 
  console.log(topic, 'message received: ', Buffer.from(message, 'base64').toString('ascii')); 
}); 

function createJwt(projectId, privateKeyFile, algorithm) { 
  var token = { 
    'iat': parseInt(Date.now() / 1000), 
    'exp': parseInt(Date.now() / 1000) + 86400 * 60, // 1 day 
    'aud': projectId 
  }; 
  var privateKey = fs.readFileSync(privateKeyFile); 
  return jwt.sign(token, privateKey, { 
    algorithm: algorithm
  }); 
} 

function fetchData() { 
  var readout = dht.read(); 
  var temp = readout.temperature.toFixed(2); 
  var humd = readout.humidity.toFixed(2); 
 
  return { 
    'temp': temp, 
    'humd': humd, 
    'time': new Date().toISOString().slice(0, 19).replace('T', ' ') // https://stackoverflow.com/a/11150727/1015046 
  }; 
} 
 
function sendData() { 
  var payload = fetchData(); 
 
  payload = JSON.stringify(payload); 
  console.log(mqttTopic, ': Publishing message:', payload); 
  client.publish(mqttTopic, payload, { qos: 1 }); 
 
  console.log('Transmitting in 30 seconds'); 
  setTimeout(sendData, 30000); 
}
*/