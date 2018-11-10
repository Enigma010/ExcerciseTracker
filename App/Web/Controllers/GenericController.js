const express = require('express');
const _ = require('lodash');
const Response = require('./../Response.js');

module.exports = class GenericController{
    constructor(server, database){
        this.Server = server;
        this.Database = database;
    }

    Create(request, model){
        let json = request.body;
        delete json.Id;
        _.assignIn(model, json);
        this.Database.Create(model, _.bind(this.GenericController.SendResponse, this.GenericController));
    }

    SendResponse(error, data){
        let response = this.GetErrorResponse(error);
        response.Data = data;
        this.Response.json(response);
    }

    GetErrorResponse(error){        
        let response = null;
        if(error === null){
            response = new Response();
        }
        else{
            response = new Response(1, error);
        }
        return response;
    }
}