'use strict';

console.log('Inicializando...'); 

require('dotenv').config()

const check = require('./check');

const PubSub = require('@google-cloud/pubsub');

const projectId = 'eighth-jigsaw-219600';
const subscriberName = 'sub-paciente';

const pubsub = new PubSub({
  projectId: projectId,
});

var subscription = pubsub.subscription('projects/' + projectId + '/subscriptions/' + subscriberName); 

var messageHandler = function(message) { 
  console.log('Mensagem recebida');
  var payload = Buffer.from(message.data, 'base64').toString('ascii');

  console.log('Checando mensagem');
  console.log(payload);
  console.log(check(JSON.parse(payload)));
  
  message.ack(); 
}; 
 
// Listen for new messages 
subscription.on('message', messageHandler);

console.log('Inicializado'); 