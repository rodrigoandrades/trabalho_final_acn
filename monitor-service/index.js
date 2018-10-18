// Imports the Google Cloud client library
const PubSub = require('@google-cloud/pubsub');

// Your Google Cloud Platform project ID
const projectId = 'eighth-jigsaw-219600';

// Instantiates a client
const pubsub = new PubSub({
  projectId: projectId,
});

var topic = pubsub.topic('my-topic');
var subscription = topic.subscription('my-sub');

subscription.on('error', function(err) {
    console.log('error')
});

function onMessage(message) {
  // Called every time a message is received.

  console.log(message);
  // message.id = ID of the message.
  // message.ackId = ID used to acknowledge the message receival.
  // message.data = Contents of the message.
  // message.attributes = Attributes of the message.
  // message.timestamp = Timestamp when Pub/Sub received the message.

  // Ack the message:
  message.ack();

  // This doesn't ack the message, but allows more messages to be retrieved
  // if your limit was hit or if you don't want to ack the message.
  // message.nack();
}
subscription.on('message', onMessage);