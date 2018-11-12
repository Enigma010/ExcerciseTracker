const express = require('express');
const _ = require('lodash');

const GenericController = require('./GenericController');
const Response = require('./../Response.js');

const WorkoutModel = require('./../../Models/Workout.js');
const WorkoutDb = require('./../../Data/Workout.js');

const GenericModel = require('../../Models/Generic.js');

module.exports = class WorkoutController{
    
    constructor(server, database){
        this.Server = server;
        this.Database = new WorkoutDb(database);
        this.Setup();
    }

    Create(request, response){
        let workout = new WorkoutModel();

        let workoutJson = request.body;
        delete workoutJson.Id;
        GenericModel.AddGuidId(workout);
        _.assignIn(workout, workoutJson);

        this.GenericController = new GenericController(response);
        this.Database.Create(workout, _.bind(this.GenericController.SendResponseAndData, this.GenericController));
    }

    Read(request, response){
        let workoutJson = request.body;
        this.GenericController = new GenericController(response);
        this.Database.Read(workoutJson.Id, _.bind(this.GenericController.SendResponseAndData, this.GenericController));
    }

    Update(request, response){
        let workoutJson = request.body;
        this.GenericController = new GenericController(response);
        this.Database.Update(workoutJson, _.bind(this.GenericController.SendResponse, this.GenericController));
    }

    Delete(request, response){
        let workoutJson = request.body;
        this.GenericController = new GenericController(response);
        this.Database.Delete(workoutJson, _.bind(this.GenericController.SendResponse, this.GenericController));
    }

    GetWorkoutFromJson(request){
        let workout = new WorkoutModel();
        let workoutJson = request.body;
        delete workoutJson.Id;
        _.assignIn(user, workoutJson);
        return workout;
    }

    Setup(){
        this.Server.Server.post('/workout/create', _.bind(this.Create, this));
        this.Server.Server.post('/workout/read', _.bind(this.Read, this));
        this.Server.Server.post('/workout/update', _.bind(this.Update, this));
        this.Server.Server.post('/workout/delete', _.bind(this.Delete, this));
    }
}