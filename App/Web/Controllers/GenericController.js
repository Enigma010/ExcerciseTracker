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

    SendResponseFunc(response){
        return _.bind(function(error, data){
            let errorResponse = this.GetErrorResponse(error);
            if(_.isUndefined(data) || _.isNull(data)){
                data = [];
            }
            errorResponse.Data = data;
            response.json(errorResponse);
        }, this);
    }

    SendResponse(error, data){
        let errorResponse = this.GetErrorResponse(error);
        if(_.isUndefined(data) || _.isNull(data)){
            data = [];
        }
        errorResponse.Data = data;
        this.Response.json(errorResponse);
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