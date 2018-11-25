const sqlite = require('sqlite3');
const _ = require('lodash');

const Generic = require('./Generic.js');

module.exports = class WorkoutExcercise extends Generic{
    constructor(database){
        super(database,
            {
                Create: "insert into WorkoutExcercises (WorkoutId, ExcerciseId, Position) values ($WorkoutId, $ExcerciseId, $Position)",
                Read: "select * from WorkoutExcercises where WorkoutId = $WorkoutId and ExcerciseId = $ExcerciseId",
                Update: "update WorkoutExcercises set Position = ?Position where $WorkoutId and ExcerciseId = $ExcerciseId",
                Delete: "delete from WorkoutExcercises where WorkoutId = $WorkoutId and ExcerciseId = $ExcerciseId",
                Setup: 'create table if not exists WorkoutExcercises (WorkoutId text not null, ExcerciseId text not null, Position int, primary key(WorkoutId, ExcerciseId))'
            }
        );
    }

    Upsert(excercises, workoutId, callback){
        if(excercises){
            let deleteQuery = "delete from WorkoutExcercises where WorkoutId = $WorkoutId";
            let self = this;
            let workoutExcercise = {
                WorkoutId: workoutId
            };

            this.RunQuery(workoutExcercise, deleteQuery, function(error){
                if(error || excercises.length == 0){
                    callback(error);
                }

                let workoutExcerciseCreated = 0;
                let position = 0;
            
                _.forEach(excercises, function(excercise){
                
                    let workoutExcercise = {};
                    workoutExcercise.WorkoutId = workoutId;
                    workoutExcercise.ExcerciseId = excercise.Id;
                    workoutExcercise.Position = position;
                    position++;
    
                    self.RunQuery(workoutExcercise, self.Statements.Create, function(error){
                        if(error){
                            callback(error);
                        }
                        workoutExcerciseCreated++;
                        if(workoutExcerciseCreated == excercises.length){
                            callback();
                        }
                    });
                });
            });
        }
        else{
            callback();
        }
    }
}