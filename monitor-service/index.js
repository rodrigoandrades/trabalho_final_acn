'use strict';

require('dotenv').config()

const check = require('./check');

check({
  batimentos: 132
});

const PubSub = require('@google-cloud/pubsub');

const projectId = 'eighth-jigsaw-219600';
const subscriberName = 'my-sub';

const pubsub = new PubSub({
  projectId: projectId,
});

var subscription = pubsub.subscription('projects/' + projectId + '/subscriptions/' + subscriberName); 

var messageHandler = function(message) { 
  console.log('Message Begin >>>>>>>>'); 
  console.log('message.connectionId', message.connectionId); 
  console.log('message.attributes', message.attributes); 
  console.log('message.data', Buffer.from(message.data, 'base64').toString('ascii')); 
  console.log('Message End >>>>>>>>>>'); 
 
  // "Ack" (acknowledge receipt of) the message 
  message.ack(); 
}; 
 
// Listen for new messages 
subscription.on('message', messageHandler);