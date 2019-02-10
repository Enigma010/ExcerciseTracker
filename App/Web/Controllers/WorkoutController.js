const express = require('express');
const _ = require('lodash');

const GenericController = require('./GenericController');
const Response = require('./../Response.js');

const Workout = require('./../../Models/Workout.js');
const WorkoutDb = require('./../../Data/Workout.js');

const GenericModel = require('../../Models/Generic.js');

module.exports = class WorkoutController extends GenericController{
    
    constructor(server, database){
        super(server, new WorkoutDb(database));
        this.Setup();
    }

    Create(request, response){
        this.Database.Create(Workout.Copy(request.body), this.SendResponseFunc(response));
    }

    Read(request, response){
        this.Database.Read(request.body, this.SendResponseFunc(response));
    }

    Update(request, response){
        this.Database.Update(request.body, this.SendResponseFunc(response));
    }

    Delete(request, response){
        this.Database.Delete(request.body, this.SendResponseFunc(response));
    }

    Copy(request, response){
        request.body = Workout.CopyChangeIds(request.body);
        this.Create(request, response);
    }

    Setup(){
        this.SetupNounCreateHandleRequest('workout', _.bind(this.Create, this));
        this.SetupNounReadHandleRequest('workout', _.bind(this.Read, this));
        this.SetupNounUpdateHandleRequest('workout', _.bind(this.Update, this));
        this.SetupNounDeleteHandleRequest('workout', _.bind(this.Delete, this));
        this.SetupNounVerbHandleRequest('workout', 'copy', _.bind(this.Copy, this));
    }
}