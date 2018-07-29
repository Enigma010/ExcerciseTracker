const sqlite = require('sqlite3');
const _ = require('lodash');

const GenericModel = require('./Generic.js');
const ExcerciseModel = require('../Models/Excercise.js');
const WorkoutInstanceModel = require('../Models/WorkoutInstance.js');
const ExcerciseInstanceModel = require('../Models/ExcerciseInstance.js');

const WorkoutDb = require('./Workout.js');
const WorkoutExcercisesDb = require('./WorkoutExcercises.js');
const ExcerciseDb = require('./Excercise');
const ExcerciseInstanceDb = require('./Excercise')

module.exports = class WorkoutInstance{
    constructor(database){
        this.Database = database;
        this.Statements = {
            Create: "insert into WorkoutInstances (Id, Name, Description, WorkoutId) values ($Id, $Name, $Description, $WorkoutId)",
            Read: "select * from WorkoutInstances where Id = $Id",
            Update: "update WorkoutInstances set Name = $Name, Description = $Description, WorkoutId = $WorkoutId where Id = $Id",
            Delete: "delete from WorkoutInstances where Id = $Id",
            Setup: 'create table if not exists WorkoutInstances (Id text not null, Name text, Description text, WorkoutId text not null, primary key (Id))'
        };
        this.GenericModel = new GenericModel(this.Database, this.Statements);
    }

    Create(data, callback){
        let workoutDb = new WorkoutDb(this.Database);
        let workoutExcerciseDb = new WorkoutExcercisesDb(this.Database);
        let excerciseDb = new ExcerciseDb(this.Database);
        let excerciseInstanceDb = new ExcerciseInstanceDb(this.Database);

        let self = this;
        
        workoutDb.Read(data, function(error, results){
            if(!_.isNull(error) || _.isUndefined(error)){
                callback(error);
                return;
            }
            if(results.length == 0){
                callback(null, results);
                return;
            }
            let workoutInstance = new WorkoutInstanceModel(null, results[0]);
            self.GenericModel.Create(workoutInstance, function(error, results){
                if(!_.isNull(error) || _.isUndefined(error)){
                    callback(error);
                    return;
                } 
                workoutInstance = results[0];

                let workoutExcerciseRequest = {};
                workoutExcerciseRequest.WorkoutId = workoutInstance.WorkoutId;
                
                workoutExcerciseDb.Read(workoutExcerciseRequest, function(error, results){
                    if(!_.isNull(error) || _.isUndefined(error)){
                        callback(error);
                        return;
                    }
                    _.forEach(results, function(workoutExcercise){
                        var excerciseRead = {};
                        excerciseRead.Id = workoutExcercise.ExcerciseId;
                        excerciseDb.Read(excerciseRead, function(error, results){
                            if(!_.isNull(error) || _.isUndefined(error)){
                                callback(error);
                                return;
                            }
                            var excercise = results[0];
                            var excerciseInstances = ExcerciseInstanceModel.CreateFromExcercise(excercise);
                            excerciseInstanceDb.Create(excerciseInstances, function(error, results){
                                if(!_.isNull(error) || _.isUndefined(error)){
                                    callback(error);
                                    return;
                                }
                            });
                        });
                    });
                    workoutInstance.Excercise = results;
                    callback(null, workoutInstance);
                });
            });
        });
    }
}