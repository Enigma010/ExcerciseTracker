const express = require('express');
const _ = require('lodash');

const GenericController = require('./GenericController');
const Response = require('./../Response.js');

const User = require('./../../Models/User.js');
const UserDb = require('./../../Data/User.js');

module.exports = class UserController extends GenericController{
    
    constructor(server, database){
        super(server, new UserDb(database));
        this.Setup();
    }

    Create(request, response){
        let user = new User();

        let userJson = request.body;
        delete userJson.Id;
        _.assignIn(user, userJson);

        this.Response = response;
        this.Database.Create(user, _.bind(this.SendResponse, this));
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