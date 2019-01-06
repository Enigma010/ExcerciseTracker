const express = require('express');
const _ = require('lodash');

const GenericController = require('./GenericController');
const Response = require('./../Response.js');

const Excercise = require('./../../Models/Excercise.js');
const ExcerciseDb = require('../../Data/Excercise.js');

module.exports = class ExcerciseController extends GenericController{
    
    constructor(server, database){
        super(server, new ExcerciseDb(database));
        this.Setup();
    }

    Create(request, response){
        this.Database.Create(Excercise.CreateFrom(request.body), this.SendResponseFunc(response));
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
        this.SetupNounCreateHandleRequest('excercise', _.bind(this.Create, this));
        this.SetupNounReadHandleRequest('excercise', _.bind(this.Read, this));
        this.SetupNounUpdateHandleRequest('excercise', _.bind(this.Update, this));
        this.SetupNounDeleteHandleRequest('excercise', _.bind(this.Delete, this));
    }
}