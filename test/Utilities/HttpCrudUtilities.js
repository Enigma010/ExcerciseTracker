const _ = require('lodash');
const uuidv4 = require('uuid/v4');

const WebRequest = require('../../App/Web/Utilities/WebRequest.js');

module.exports = class HttpCrudUtilities{
    static CreateUnitTest(server, model, modelNoun, assertFunc, doneFunc){
        var promise = WebRequest.ModelRequestCreate(server, model, modelNoun);
        promise.then(function(body){
            assertFunc(body, model);
            doneFunc();
        }).catch(function(response){
            doneFunc(new Error(response));
        });
    }

    static ReadUnitTest(server, model, modelNoun, createAssertFunc, readAssertFunc, doneFunc){
        var createPromise = WebRequest.ModelRequestCreate(server, model, modelNoun);
        createPromise.then(function(body){
            createAssertFunc(body, model);
            var readPromise = WebRequest.ModelRequestRead(server, {Id: body.Data[0].Id }, modelNoun);
            readPromise.then(function(body){
                readAssertFunc(body, model);
                doneFunc();
            }).catch(function(response){
                doneFunc(new Error(response));
            });
        }).catch(function(response){
            doneFunc(new Error(response));
        });
    }

    static UpdateUnitTest(server, model, modelNoun, createAssertFunc, updateModelFunc, readAssertFunc, doneFunc){
        var createPromise = WebRequest.ModelRequestCreate(server, model, modelNoun);
        createPromise.then(function(body){
            createAssertFunc(body, model);
            model = body.Data[0];
            updateModelFunc(model);
            var updatePromise = WebRequest.ModelRequestUpdate(server, model, modelNoun);
            updatePromise.then(function(body){
                var readPromise = WebRequest.ModelRequestRead(server, model, modelNoun);
                readPromise.then(function(body){
                    readAssertFunc(body, model);
                    doneFunc();
                }).catch(function(response){
                    doneFunc(new Error(response));
                });
            }).catch(function(response){
                doneFunc(new Error(response));
            });
        }).catch(function(response){
            doneFunc(new Error(response));
        });
    }

    static DeleteUnitTest(server, model, modelNoun, createAssertFunc, readAssertFunc, doneFunc){
        var createPromise = WebRequest.ModelRequestCreate(server, model, modelNoun);
        createPromise.then(function(body){
            createAssertFunc(body, model);
            model = body.Data[0];
            var deletePromise = WebRequest.ModelRequestDelete(server, model, modelNoun);
            deletePromise.then(function(body){
                var readPromise = WebRequest.ModelRequestRead(server, model, modelNoun);
                readPromise.then(function(body){
                    readAssertFunc(body, model);
                    doneFunc();
                }).catch(function(response){
                    doneFunc(new Error(response));
                });
            }).catch(function(response){
                doneFunc(new Error(response));
            });
        }).catch(function(response){
            doneFunc(new Error(response));
        });
    }
}