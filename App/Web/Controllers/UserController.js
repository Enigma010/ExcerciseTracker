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
        this.Database.Create(User.CreateFrom(request.body), this.SendResponseFunc(response));
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

    Setup(){
        this.SetupNounCreateHandleRequest('user', _.bind(this.Create, this));
        this.SetupNounReadHandleRequest('user', _.bind(this.Read, this));
        this.SetupNounUpdateHandleRequest('user', _.bind(this.Update, this));
        this.SetupNounDeleteHandleRequest('user', _.bind(this.Delete, this));
    }
}