var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed',  function(error){
  console.log("Connect error: "+error.toString());
});

client.on('connect', function(connection){
  console.log("WebSocket client conneceted");

  connection.on('error', function(error){
    console.log('COnnection error: '+error.toString());
  });

  connection.on('close', function(){
    console.log('echo-protocol connection closed');
  })

  connection.on('message', function(message){
    if(message.type === 'utf8'){
      console.log("Received: '"+message.utf8Data+"'");
    }
  });

  function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});

client.connect('ws://localhost:8080', 'echo-protocol');
