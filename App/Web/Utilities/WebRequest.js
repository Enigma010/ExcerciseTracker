const _ = require('lodash');
const request = require('request');

module.exports = class WebRequest{
    static ModelRequest(server, model, urlSuffix){
        return new Promise(function(resolve, reject){
            request({
                url: 'http://localhost:' + server.WebServer.ListenOnPort + urlSuffix,
                method: 'POST',
                json: true,
                body: model
            },
            function (error, response, body) {
                if(!_.isNull(error)){
                    reject(error);
                    return;
                }
                if(WebRequest.IsHttpErrorResponse(response.statusCode)){
                    reject(response);
                    return;
                }
                resolve(body);
            });
        });
    }

    static ModelRequestAction(server, model, urlNoun, urlAction){
        return this.ModelRequest(server, model, '/' + urlNoun + '/' + urlAction);
    }

    static ModelRequestCreate(server, model, urlNoun){
        return this.ModelRequestAction(server, model, urlNoun, 'create');
    }

    static ModelRequestRead(server, model, urlNoun){
        return this.ModelRequestAction(server, model, urlNoun, 'read');
    }

    static ModelRequestUpdate(server, model, urlNoun){
        return this.ModelRequestAction(server, model, urlNoun, 'update');
    }

    static ModelRequestDelete(server, model, urlNoun){
        return this.ModelRequestAction(server, model, urlNoun, 'delete');
    }

    static IsHttpErrorResponse(response){
        var errorCodeHundreds = Math.floor(response / 100);
        return errorCodeHundreds == 4 || errorCodeHundreds == 5;
    }
}