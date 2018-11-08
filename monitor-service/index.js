'use strict';

console.log('Inicializando...'); 

require('dotenv').config()

const check = require('./check');

const PubSub = require('@google-cloud/pubsub');

const projectId = 'eighth-jigsaw-219600';
const subscriberName = 'sub-paciente';

const pubsub = new PubSub({
  projectId: projectId
});

var subscription = pubsub.subscription('projects/' + projectId + '/subscriptions/' + subscriberName); 

var messageHandler = (message) => { 
  console.log('--------------------------------------------------------');
  console.log('Mensagem recebida');
  var payload = Buffer.from(message.data, 'base64').toString('ascii');

  console.log('Checando mensagem:');
  console.log(payload);
  let result = check(JSON.parse(payload));

  if(!result.success){
    console.log('DISPARAR ALARME');
    console.log(result.message);
  } else {
    console.log('Parâmetros OK.');
  }
  
  message.ack(); 
}; 
 
// Listen for new messages 
subscription.on('message', messageHandler);

console.log('Inicializado'); 