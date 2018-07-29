const express = require('express');
const _ = require('lodash');

const GenericController = require('./GenericController');
const Response = require('./../Response.js');

const ExcerciseModel = require('./../../Models/Excercise.js');
const ExcerciseDb = require('../../Data/Excercise.js');

module.exports = class ExcerciseController{
    
    constructor(server, database){
        this.Server = server;
        this.Database = new ExcerciseDb(database);
        this.Setup();
    }

    Create(request, response){
        let excercise = new ExcerciseModel();

        let excerciseJson = request.body;
        delete excerciseJson.Id;
        _.assignIn(excercise, excerciseJson);

        this.GenericController = new GenericController(response);
        this.Database.Create(excercise, _.bind(this.GenericController.SendResponseAndData, this.GenericController));
    }

    Read(request, response){
        let excerciseJson = request.body;
        this.GenericController = new GenericController(response);
        this.Database.Read(excerciseJson.Id, _.bind(this.GenericController.SendResponseAndData, this.GenericController));
    }

    Update(request, response){
        let excerciseJson = request.body;
        this.GenericController = new GenericController(response);
        this.Database.Update(excerciseJson, _.bind(this.GenericController.SendResponse, this.GenericController));
    }

    Delete(request, response){
        let excerciseJson = request.body;
        this.GenericController = new GenericController(response);
        this.Database.Delete(excerciseJson.Id, _.bind(this.GenericController.SendResponse, this.GenericController));
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