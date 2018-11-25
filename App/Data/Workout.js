const sqlite = require('sqlite3');
const _ = require('lodash');

const WorkoutExcerciseDb = require('../Data/WorkoutExcercise.js');
const ExcerciseDb = require('../../App/Data/Excercise.js');
const Generic = require('./Generic.js');

module.exports = class Workout extends Generic{
    constructor(database){
        super(database, 
            {
                Create: "insert into Workouts (Id, Name, Description) values ($Id, $Name, $Description)",
                Read: "select * from Workouts where Id = $Id",
                Update: "update Workouts set Name = $Name, Description = $Description where Id = $Id",
                Delete: "delete from Workouts where Id = $Id",
                Setup: 'create table if not exists Workouts (Id text not null, Name text, Description text, primary key (Id))'
            }
        );
        this.WorkoutExcerciseDb = new WorkoutExcerciseDb(this.Database); 
    }

    Create(data, callback){
        this.RunQueryUpsertExcercises(data, this.Statements.Create, callback);
    }

    Read(data, callback){
        var self = this;
        super.Read(data, function(error, results){
            if(error){
                callback(error);
            }
            if(_.isUndefined(results) || results.length == 0){
                callback(error, results)
            }
            let excerciseDb = new ExcerciseDb(self.Database);
            let workoutExcerciseQuery = "select * from WorkoutExcercises where WorkoutId = $Id";
            let workoutData = {};
            workoutData.WorkoutId = data.Id;
            self.ReadByQuery(data, workoutExcerciseQuery, function(error, workoutExcercises){
                if(error){
                    callback(error);
                }
                let workoutExcercisesRead = 0;
                _.forEach(workoutExcercises, function(workoutExcercise){
                    let readExcercise = {};
                    readExcercise.Id = workoutExcercise.ExcerciseId;
                    excerciseDb.Read(readExcercise, function(error, excerciseResult){
                        if(!_.isUndefined(excerciseResult) && !_.isNull(excerciseResult) && excerciseResult.length > 0){
                            if(_.isUndefined(results[0].Excercises)){
                                results[0].Excercises = [];
                            }
                            results[0].Excercises[workoutExcercise.Position] = excerciseResult[0];
                        }
                        workoutExcercisesRead++;
                        if(workoutExcercisesRead == workoutExcercises.length){
                            callback(null, results);
                        }
                    });
                });
            });
        });
    }

    Update(data, callback){
        this.RunQueryUpsertExcercises(data, this.Statements.Update, callback);
    }

    Delete(data, callback){
        let deleteWorkout = {};
        deleteWorkout.Id = data.Id;
        deleteWorkout.Excercises = [];
        this.RunQueryUpsertExcercises(deleteWorkout, this.Statements.Delete, callback);
    }

    RunQueryUpsertExcercises(data, query, callback){
        var self = this;

        super.RunQuery(data, query, function(error, results){
            if(error){
                callback(error);
            }

            let readFunc = function(error){
                if(error){
                    callback(error);
                }
                self.Read(data, callback);
            };

            self.WorkoutExcerciseDb.Upsert(data.Excercises, data.Id, readFunc);
        });
    }
}