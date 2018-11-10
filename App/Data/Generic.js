const sqlite = require('sqlite3');
const _ = require('lodash');

module.exports = class Generic{

    //https://github.com/mapbox/node-sqlite3/wiki
    constructor(database, statements){
        this.Database = database;
        this.Statements = statements;
        this.Setup();
    }

    RunQuery(data, query, callback){
        let statement = this.Database.Store.prepare(query);
        let parameters = this.QueryDataParameters(query, data);
        statement.run(parameters, function(error){
            statement.finalize();
            callback(error);
        });
    }

    RunQueryP(data, query){
        var promise = new Promise(function(resolve, reject){
            let statement = this.Database.Store.prepare(query);
            let parameters = this.QueryDataParameters(query, data);
            statement.run(parameters, function(error){
                statement.finalize();
                if(error !== null){
                    resolve();
                }
                else{
                    reject(error);
                }
            });            
        });
        return promise;
    }

    Create(data, callback, readRequest, readQuery){
        let self = this;
        this.RunQuery(data, this.Statements.Create, function(error){
            if(error !== null){
                callback(error);
            }
            else{
                if(!_.isNull(readRequest) && !_.isUndefined(readRequest) && !_.isNull(readQuery) && !_.isUndefined(readQuery)){
                    self.ReadByQuery(readRequest, readQuery, function(error, dataRunQuery){
                        callback(error, dataRunQuery);
                    });
                }
                else{
                    var id = null;
                    if(data.hasOwnProperty("Id")){
                        id = data.Id;
                    }
                    else{
                        id = data;
                    }
                    self.Read(id, callback);
                }
            }
        });
    }

    CreateP(data, resolve, reject, readRequest, readQuery){
        let self = this;
        var promise = new Promise(
            function(data){
                RunQueryP(data, this.Statements.Create).then(function(data){
                    if(!_.isNull(readRequest) && !_.isUndefined(readRequest) && !_.isNull(readQuery) && !_.isUndefined(readQuery)){
                    }
                    resolve(data);
                },
                function(error){
                    reject(error);
                });
            },
            function(error){
                reject(error);
            });
        return promise;
    }

    Read(id, callback){
        this.ReadByQuery({Id: id}, this.Statements.Read, callback);
    }

    ReadByQuery(request, query, callback){
        let statement = this.Database.Store.prepare(query);
        let parameters = this.QueryDataParameters(query, request);

        let results = [];
        let callbackCalled = false;

        statement.each(parameters
            , function(error, data){
                statement.finalize();
                if(!_.isNull(error) || _.isUndefined(error)){
                    callback(error);
                }
                else{
                    results[results.length] = data;
                }
            }
            , function(error){
                if(!_.isNull(error) || _.isUndefined(error)){
                    callback(error);
                }
                else{
                    callback(error, results);
                }
            }
        );
    }

    ReadByQueryP(request, query, callback){
        let statement = this.Database.Store.prepare(query);
        let parameters = this.QueryDataParameters(query, request);

        let results = [];
        let callbackCalled = false;

        statement.each(parameters
            , function(error, data){
                statement.finalize();
                if(!_.isNull(error) || _.isUndefined(error)){
                    callback(error);
                }
                else{
                    results[results.length] = data;
                }
            }
            , function(error){
                if(!_.isNull(error) || _.isUndefined(error)){
                    callback(error);
                }
                else{
                    callback(error, results);
                }
            }
        );
    }

    Update(data, callback){
        let statement = this.Database.Store.prepare(this.Statements.Update);
        let parameters = this.QueryDataParameters(this.Statements.Update, data);
        statement.run(parameters, function(error){
            statement.finalize();
            callback(error);
        });
    }

    Delete(id, callback){
        let statement = this.Database.Store.prepare(this.Statements.Delete);
        statement.run(id, function(error){
            statement.finalize();
            callback(error);
        });
    }

    Setup(){
        if(this.Statements !== null && this.Statements !== undefined && this.Statements.Setup){
            var self = this;
            this.Database.Store.serialize(function(){
                self.Database.Store.run(self.Statements.Setup);
            }); 
        }
    }

    QueryDataParameters(query, data){
        let queryParameters = this.QueryParameters(query);
        let dataParameters = this.DataParameters(data);
        _.forEach(Object.keys(dataParameters), function(dataParameter){
            let found = false;
            _.forEach(queryParameters, function(queryParameter){
                if(dataParameter ==  queryParameter){
                    found = true;
                }
            });
            if(!found){
                delete dataParameters[dataParameter];
            }
        });
        return dataParameters;
    }

    QueryParameters(query){
        var parameters = [];
        var parameterRegex = /(\$.\w*)\b/g;
        var match = parameterRegex.exec(query);
        while(match != null){
            parameters.push(match[0]);
            match = parameterRegex.exec(query);
        }
        return parameters;
    }

    DataParameters(data){
        var parameters = {};
        _.forEach(Object.keys(data), function(key){
            if (data.hasOwnProperty(key)) {
                parameters["$" + key] = data[key];
            }
        });
        return parameters;
    }
}