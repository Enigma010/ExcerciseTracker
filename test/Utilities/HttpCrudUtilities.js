const _ = require('lodash');
const uuidv4 = require('uuid/v4');

const WebRequest = require('../../App/Web/Utilities/WebRequest.js');

module.exports = class HttpCrudUtilities{
    static CreateUnitTest(server, model, modelNoun, assertFunc, doneFunc){
        let promise = WebRequest.ModelRequestCreate(server, model, modelNoun);
        promise.then(function(body){
            assertFunc(body, model);
            if(doneFunc){
                doneFunc();
            }
        }).catch(function(response){
            if(doneFunc){
                doneFunc(new Error(response));
            }
        });
    }

    static ReadUnitTest(server, model, modelNoun, createAssertFunc, readAssertFunc, doneFunc){
        let createPromise = WebRequest.ModelRequestCreate(server, model, modelNoun);
        createPromise.then(function(body){
            createAssertFunc(body, model);
            let readPromise = WebRequest.ModelRequestRead(server, { Id: body.Data[0].Id }, modelNoun);
            readPromise.then(function(body){
                readAssertFunc(body, model);
                if(doneFunc){
                    doneFunc();
                }
            }).catch(function(response){
                if(doneFunc){
                    doneFunc(new Error(response));
                }
            });
        }).catch(function(response){
            if(doneFunc){
                doneFunc(new Error(response));
            }
        });
    }

    static UpdateUnitTest(server, model, modelNoun, createAssertFunc, updateModelFunc, readAssertFunc, doneFunc){
        let createPromise = WebRequest.ModelRequestCreate(server, model, modelNoun);
        createPromise.then(function(body){
            createAssertFunc(body, model);
            model = body.Data[0];
            updateModelFunc(model);
            let updatePromise = WebRequest.ModelRequestUpdate(server, model, modelNoun);
            updatePromise.then(function(body){
                let readPromise = WebRequest.ModelRequestRead(server, model, modelNoun);
                readPromise.then(function(body){
                    readAssertFunc(body, model);
                    if(doneFunc){
                        doneFunc();
                    }
                }).catch(function(response){
                    if(doneFunc){
                        doneFunc(new Error(response));
                    }
                });
            }).catch(function(response){
                if(doneFunc){
                    doneFunc(new Error(response));
                }
            });
        }).catch(function(response){
            if(doneFunc){
                doneFunc(new Error(response));
            }
        });
    }

    static DeleteUnitTest(server, model, modelNoun, createAssertFunc, readAssertFunc, doneFunc){
        let createPromise = WebRequest.ModelRequestCreate(server, model, modelNoun);
        createPromise.then(function(body){
            createAssertFunc(body, model);
            model = body.Data[0];
            let deletePromise = WebRequest.ModelRequestDelete(server, model, modelNoun);
            deletePromise.then(function(body){
                let readPromise = WebRequest.ModelRequestRead(server, model, modelNoun);
                readPromise.then(function(body){
                    readAssertFunc(body, model);
                    if(doneFunc){
                        doneFunc();
                    }
                }).catch(function(response){
                    if(doneFunc){
                        doneFunc(new Error(response));
                    }
                });
            }).catch(function(response){
                if(doneFunc){
                    doneFunc(new Error(response));
                }
            });
        }).catch(function(response){
            if(doneFunc){
                doneFunc(new Error(response));
            }
        });
    }
}