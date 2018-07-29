const express = require('express');
const _ = require('lodash');
const Response = require('./../Response.js');

module.exports = class GenericController{
    constructor(response){
        this.Response = response;
    }

    SendResponse(error){
        this.Response.json(this.GetErrorResponse(error));    
    }

    SendResponseAndData(error, data){
        let response = this.GetErrorResponse(error);
        if(data != null && Array.isArray(data)){
            response.Data = data[0];
        }
        else{
            response.Data = data;
        }
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