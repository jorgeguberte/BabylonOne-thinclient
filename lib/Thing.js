'use strict';

module.exports = {
  /* Thing */
  Thing: class Thing{
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
      console.log(this.dataSources);
    }

    addTelemetryEvent(eventData){
      var telemetryEvent= {'timestamp': eventData.timestamp, 'value':eventData.value}
      this.dataSources[eventData.property].telemetry.push(telemetryEvent);
    }

    relayTelemetry(){
    }

  }
}
