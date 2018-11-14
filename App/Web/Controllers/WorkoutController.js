const express = require('express');
const _ = require('lodash');

const GenericController = require('./GenericController');
const Response = require('./../Response.js');

const WorkoutModel = require('./../../Models/Workout.js');
const WorkoutDb = require('./../../Data/Workout.js');

const GenericModel = require('../../Models/Generic.js');

module.exports = class WorkoutController extends GenericController{
    
    constructor(server, database){
        super(server, new WorkoutDb(database));
        this.Setup();
    }

    Create(request, response){
        let workout = new WorkoutModel();

        let workoutJson = request.body;
        delete workoutJson.Id;
        GenericModel.AddGuidId(workout);
        _.assignIn(workout, workoutJson);
        this.Response = response;
        this.Database.Create(workout, _.bind(this.SendResponse, this));
    }

    Read(request, response){
        this.Response = response;
        this.Database.Read(request.body, _.bind(this.SendResponse, this));
    }

    Update(request, response){
        this.Response = response;
        this.Database.Update(request.body, _.bind(this.SendResponse, this));
    }

    Delete(request, response){
        this.Response = response;
        this.Database.Delete(request.body, _.bind(this.SendResponse, this));
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