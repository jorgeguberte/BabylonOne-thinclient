'use strict';
var BrokerConnector = require('./BrokerConnector').BrokerConnector;

module.exports = {

  /* Thin Client */
  ThinClient: class ThinClient{
    constructor(){
      console.log("ThinClient initialized");

      this.brokerConnector = new BrokerConnector();
      this.brokerConnector.client.on('connect', function(connection){
        console.log("Connected!");
      });

      this.brokerConnector.client.connect('ws://localhost:8080', 'echo-protocol');

      this.things = [];
    }

    addThing(thing){
      this.things.push(thing);
    }


  }

}
