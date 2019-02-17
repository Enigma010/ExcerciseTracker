const sqlite = require('sqlite3');
const _ = require('lodash');

const ExcerciseIntentDb = require('../Data/ExcerciseIntent');
const ExcerciseDb = require('../../App/Data/Excercise.js');
const WorkoutMd = require('../../App/Models/Workout.js');
const Generic = require('./Generic.js');

module.exports = class Workout extends Generic{
    constructor(database){
        super(database, 
            {
                Create: 'insert into Workouts (Id, Name, Description, CreatedAt) values ($Id, $Name, $Description, $CreatedAt)',
                Read: 'select * from Workouts where Id = $Id',
                Update: 'update Workouts set Name = $Name, Description = $Description, CreatedAt = $CreatedAt where Id = $Id',
                Delete: 'delete from Workouts where Id = $Id',
                Setup: 'create table if not exists Workouts (Id text not null, Name text, Description text, CreatedAt text, primary key (Id))',
                LatestLimited: 'select * from Workouts order by CreatedAt desc limit $LimitNumber',
                LatestByDate: 'select * from Workouts where CreatedAt >= $CreatedAt order by CreatedAt desc'
            }
        );
        this.ExcerciseIntentDb = new ExcerciseIntentDb(this.Database); 
    }

    Create(data, callback){
        this.RunQueryUpsertExcercises(data, this.Statements.Create, callback);
    }

    Copy(data, callback){
        let copy = WorkoutMd.CopyChangeIds(data);
        this.Create(copy, callback);
    }

    Latest(data, callback){
        let query = this.Statements.LatestLimited;
        if(data.hasOwnProperty('LimitNumber')){
            query = this.Statements.LatestLimited
        }
        if(data.hasOwnProperty('CreatedAt')){
            query = this.Statements.LatestByDate
        }
        this.ReadByQuery(data, query, callback);
    }

    Read(data, callback){
        let self = this;
        let workout = {};

        super.Read(data, function(error, workoutRead){
            if(error){
                callback(error);
                return;
            }

            if(_.isUndefined(workoutRead) || workoutRead.length == 0){
                workoutRead = [];
                callback(error, workoutRead);
                return;
            }

            self.ExcerciseIntentDb.ReadByOwner(workoutRead[0].Id, function(error, excerciseIntentsRead){
                if(error){
                    callback(error);
                    return;
                }
                if(!_.isUndefined(excerciseIntentsRead) && !_.isNull(excerciseIntentsRead) && excerciseIntentsRead.length > 0){
                    workoutRead[0].ExcerciseIntents = excerciseIntentsRead;
                }
                else{
                    workoutRead[0].ExcerciseIntents = [];
                }
                callback(null, workoutRead);
            });
        });
    }

    Update(data, callback){
        this.RunQueryUpsertExcercises(data, this.Statements.Update, callback);
    }

    Delete(data, callback){
        let deleteWorkout = {};
        deleteWorkout.Id = data.Id;
        deleteWorkout.ExcerciseIntents = [];
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

            self.ExcerciseIntentDb.Upsert(data.ExcerciseIntents, data.Id, readFunc);
        });
    }
}