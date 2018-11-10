const express = require('express');
const _ = require('lodash');

const GenericController = require('./GenericController');
const Response = require('./../Response.js');

const ExcerciseModel = require('./../../Models/Excercise.js');
const ExcerciseDb = require('../../Data/Excercise.js');

module.exports = class ExcerciseController extends GenericController{
    
    constructor(server, database){
        super(server, new ExcerciseDb(database));
        this.Setup();
    }

    Create(request, response){
        let excercise = new ExcerciseModel();

        let excerciseJson = request.body;
        delete excerciseJson.Id;
        _.assignIn(excercise, excerciseJson);

        this.Response = response;
        this.Database.Create(excercise, _.bind(this.SendResponse, this));
    }

    Read(request, response){
        let excerciseJson = request.body;
        this.Response = response;
        this.Database.Read(excerciseJson.Id, _.bind(this.SendResponse, this));
    }

    Update(request, response){
        let excerciseJson = request.body;
        this.Response = response;
        this.Database.Update(excerciseJson, _.bind(this.SendResponse, this));
    }

    Delete(request, response){
        let excerciseJson = request.body;
        this.Response = response;
        this.Database.Delete(excerciseJson.Id, _.bind(this.SendResponse, this));
    }

    GetWorkoutFromJson(request){
        let excercise = new Workout();
        let excerciseJson = request.body;
        delete excerciseJson.Id;
        _.assignIn(user, excerciseJson);
        return excercise;
    }

    Setup(){
        this.Server.Server.post('/excercise/create', _.bind(this.Create, this));
        this.Server.Server.post('/excercise/read', _.bind(this.Read, this));
        this.Server.Server.post('/excercise/update', _.bind(this.Update, this));
        this.Server.Server.post('/excercise/delete', _.bind(this.Delete, this));
    }
}