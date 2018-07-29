const express = require('express');
const _ = require('lodash');

const GenericController = require('./GenericController');
const Response = require('./../Response.js');

const WorkoutInstanceDb = require('./../../Data/WorkoutInstance.js');

module.exports = class WorkoutController{
    
    constructor(server, database){
        this.Server = server;
        this.Database = new WorkoutInstanceDb(database);
        this.Setup();
    }

    Create(request, response){
        this.GenericController = new GenericController(response);
        this.Database.Create(request.body, _.bind(this.GenericController.SendResponseAndData, this.GenericController));
    }

    Setup(){
        this.Server.Server.post('/workoutinstance/create', _.bind(this.Create, this));
    }
}