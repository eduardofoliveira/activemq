const stompit = require('stompit');

const connectOptions = {
  'host': '3.13.163.192',
  'port': 61613,
  'connectHeaders':{
    'host': '/',
    'login': 'admin',
    'passcode': 'activemq',
    'heart-beat': '5000,5000'
  }
};

stompit.connect(connectOptions, function(error, client) {
  
  if (error) {
    console.log('connect error ' + error.message);
    return;
  }
  
  // const sendHeaders = {
  //   'destination': '/queue/test',
  //   'content-type': 'text/plain'
  // };
  
  // const frame = client.send(sendHeaders);
  // frame.write('hello');
  // frame.end();
  
  const subscribeHeaders = {
    'destination': 'sas/jms/callCenterWebEvents',
    'ack': 'client-individual'
  };
  
  client.subscribe(subscribeHeaders, function(error, message) {
    if (error) {
      console.log('subscribe error ' + error.message);
      return;
    }
    
    message.readString('utf-8', function(error, body) {
      
      if (error) {
        console.log('read message error ' + error.message);
        return;
      }
      
      console.log('received message: ' + body);
      
      client.ack(message);
      
      // client.disconnect();
    });
  });
});