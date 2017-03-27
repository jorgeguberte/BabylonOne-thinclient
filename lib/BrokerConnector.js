'use strict';
var WebSocketClient = require('websocket').client;

module.exports = {
  BrokerConnector : class BrokerConnector{
    constructor(){
      //this.connection = this.connect();
      this.client = new WebSocketClient();

    }

    connect(){
      return 'ohaiiiiii';
    }
  }
}
