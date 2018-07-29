const express = require('express');
const _ = require('lodash');

const GenericController = require('./GenericController');
const Response = require('./../Response.js');

const User = require('./../../Models/User.js');
const UserDb = require('./../../Data/User.js');

module.exports = class UserController{
    
    constructor(server, database){
        this.Server = server;
        this.Database = new UserDb(database);
        this.Setup();
    }

    Create(request, response){
        let user = new User();

        let userJson = request.body;
        delete userJson.Id;
        _.assignIn(user, userJson);

        this.GenericController = new GenericController(response);
        this.Database.Create(user, _.bind(this.GenericController.SendResponseAndData, this.GenericController));
    }

    Read(request, response){
        let userJson = request.body;
        this.GenericController = new GenericController(response);
        this.Database.Read(userJson.Id, _.bind(this.GenericController.SendResponseAndData, this.GenericController));
    }

    Update(request, response){
        let userJson = request.body;
        this.GenericController = new GenericController(response);
        this.Database.Update(userJson, _.bind(this.GenericController.SendResponse, this.GenericController));
    }

    Delete(request, response){
        let userJson = request.body;
        this.GenericController = new GenericController(response);
        this.Database.Delete(userJson.Id, _.bind(this.GenericController.SendResponse, this.GenericController));
    }

    GetUserFromJson(request){
        let user = new User();
        let userJson = request.body;
        delete userJson.Id;
        _.assignIn(user, userJson);
        return user;
    }

    Setup(){
        this.Server.Server.post('/user/create', _.bind(this.Create, this));
        this.Server.Server.post('/user/read', _.bind(this.Read, this));
        this.Server.Server.post('/user/update', _.bind(this.Update, this));
        this.Server.Server.post('/user/delete', _.bind(this.Delete, this));
    }
}