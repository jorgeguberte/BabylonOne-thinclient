"use strict";

/* Thin Client */
class ThinClient{
  constructor(){
    console.log("ThinClient initialized");
    this.things = [];
  }

  addThing(thing){
    this.things.push(thing);
  }
}


/* Thing */
class Thing{
  constructor(name, description, location){
    this.name = name;
    this.description = description;
    this.location = location;
    this.dataSources = {};
  }

  addDataSource(dataSource){
    this.dataSources[dataSource.id] = dataSource;
  }

  updateDataSource(dataSource){
    this.dataSources[dataSource.id] = dataSource.value;
  }
}




var five = require('johnny-five'),
    arduino = new five.Board();

  var thinClient = new ThinClient();

arduino.on('ready', function(){
  var thing = new Thing({name:'Vaso', description: 'Um vaso de manjericão', location: 'São Paulo - SP - Brasil'});

  /*Setup data sources*/

  var humiditySensor = new five.Sensor({pin: 'A2', freq: 500});
  var humidity_dataSource = {id: 'humidity', value:0, name: 'Humidity', description: 'Humidity in the soil where the plant lives. Ideal number is ~75%'}
  thing.addDataSource(humidity_dataSource);

  humiditySensor.on('change', function(){
    var humidity = this.scaleTo(100, -1); //#TODO: find out if -1 is the best lower threshold
    thing.updateDataSource({'property':'humidity', 'value':humidity});
  });




  var luminositySensor = new five.Sensor({pin:'A0', freq: 500});
  var luminosity_dataSource = {id: 'luminosity', value: 0, name: 'Luminosity', description: 'Luminosity level in the area around the plant'};
  thing.addDataSource(luminosity_dataSource);

  luminositySensor.on('change', function(){
    var luminosity = this.scaleTo(0,100);
    thing.updateDataSource({'property':'luminosity', 'value':luminosity });
  });
});
