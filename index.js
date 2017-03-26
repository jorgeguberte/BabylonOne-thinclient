"use strict";

var five = require('johnny-five'),

board = new five.Board();

board.on('ready', function(){
  this.samplingInterval(1000); //Change the sampling interval so we can send less data per minute to the server #TODO: Find out if this can be used in the sensor's scope
  var ldrSensor = new five.Sensor('A0'); //Setup our LDR sensor

  ldrSensor.on('change', function(value){
    console.log(value); //Just the data for now
  })
});
