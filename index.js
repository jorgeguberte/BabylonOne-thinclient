"use strict";

var ThinClient = require('./lib/ThinClient').ThinClient;
var Thing = require('./lib/Thing').Thing;

var thinClient = new ThinClient();
var websocketConnection = thinClient.connectWebSocket();

var five = require('johnny-five'),
    arduino = new five.Board();


    function getTimestamp(){
      var date = new Date();

      var year = date.getFullYear();
      var month = str_pad(date.getMonth());
      var day = str_pad(date.getDate());

      var hour = str_pad(date.getHours());
      var minute = str_pad(date.getMinutes());
      var second = str_pad(date.getSeconds());

      var timestamp = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;





      function str_pad(n) {
          return String("00" + n).slice(-2);
      }

    return timestamp;
    }




arduino.on('ready', function(){
  var thing = new Thing({name:'Vaso', description: 'Um vaso de manjericão', location: 'São Paulo - SP - Brasil'});
  thinClient.addThing(thing);

  /*Setup data sources*/


  var luminositySensor = new five.Sensor({pin:'A0', freq: 2000});
  var luminosity_dataSource = {id: 'luminosity', name: 'Luminosity', description: 'Luminosity level in the area around the plant', telemetry: []};
  thing.addDataSource(luminosity_dataSource);

  luminositySensor.on('change', function(){
    var telemetry_value = this.scaleTo(-1,100);
    var timestamp = getTimestamp();
    thing.addTelemetryEvent({'property': 'luminosity', 'value': telemetry_value,'timestamp': timestamp });
    thing.relayTelemetry();
  });
});
