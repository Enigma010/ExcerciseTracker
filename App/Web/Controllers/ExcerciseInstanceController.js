const express = require('express');
const _ = require('lodash');

const GenericController = require('./GenericController');
const Response = require('./../Response.js');

const ExcerciseInstance = require('./../../Models/ExcerciseInstance');
const ExcerciseInstanceDb = require('./../../Data/ExcerciseInstance.js');

module.exports = class ExcerciseInstanceController{
    
    constructor(server, database){
        this.Server = server;
        this.Database = new ExcerciseInstanceDb(database);
        this.Setup();
    }

    Create(request, response){
        this.GenericController = new GenericController(response);
        this.Database.Create(request.body, _.bind(this.GenericController.SendResponse, this.GenericController));
    }

    Read(request, response){
        this.GenericController = new GenericController(response);
        this.Database.Read(request.body.Id, _.bind(this.GenericController.SendResponse, this.GenericController));
    }

    Update(request, response){
        this.GenericController = new GenericController(response);
        this.Database.Update(request.body, _.bind(this.GenericController.SendResponse, this.GenericController));
    }

    Delete(request, response){
        this.GenericController = new GenericController(response);
        this.Database.Delete(request.body, _.bind(this.GenericController.SendResponse, this.GenericController));
    }

    Setup(){
        this.Server.Server.post('/user/create', _.bind(this.Create, this));
        this.Server.Server.post('/user/read', _.bind(this.Read, this));
        this.Server.Server.post('/user/update', _.bind(this.Update, this));
        this.Server.Server.post('/user/delete', _.bind(this.Delete, this));
    }
}