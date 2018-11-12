const express = require('express');
const _ = require('lodash');

const GenericController = require('./GenericController');
const Response = require('./../Response.js');

const WorkoutExcerciseDb = require('./../../Data/WorkoutExcercises.js');

module.exports = class WorkoutExcerciseController{
    
    constructor(server, database){
        this.Server = server;
        this.Database = new WorkoutExcerciseDb(database);
        this.Setup();
    }

    Create(request, response){
        this.GenericController = new GenericController(response);
        this.Database.Create(request.body, _.bind(this.GenericController.SendResponseAndData, this.GenericController));
    }

    Read(request, response){
        this.GenericController = new GenericController(response);
        this.Database.Read(request.body, _.bind(this.GenericController.SendResponseAndData, this.GenericController));
    }

    Update(request, response){
        let workoutJson = request.body;
        this.GenericController = new GenericController(response);
        this.Database.Update(request.body, _.bind(this.GenericController.SendResponse, this.GenericController));
    }

    Delete(request, response){
        this.GenericController = new GenericController(response);
        this.Database.Delete(request.body, _.bind(this.GenericController.SendResponse, this.GenericController));
    }

    Setup(){
        this.Server.Server.post('/workoutexcercise/create', _.bind(this.Create, this));
        this.Server.Server.post('/workoutexcercise/read', _.bind(this.Read, this));
        this.Server.Server.post('/workoutexcercise/update', _.bind(this.Update, this));
        this.Server.Server.post('/workoutexcercise/delete', _.bind(this.Delete, this));
    }
}