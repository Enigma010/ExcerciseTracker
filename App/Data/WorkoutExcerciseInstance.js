const sqlite = require('sqlite3');
const _ = require('lodash');

const Generic = require('./Generic.js');

module.exports = class WorkoutExcerciseInstance extends Generic{
    constructor(database){
        super(database, 
            {
                Create: "insert into WorkoutExcerciseInstances (WorkoutId, ExcerciseId, Position) values ($WorkoutId, $ExcerciseId, $Position)",
                Read: "select * from WorkoutExcerciseInstances where WorkoutId = $WorkoutId and ExcerciseId = $ExcerciseId",
                ReadByWorkout: "select * from WorkoutExcerciseInstances where WorkoutId = $WorkoutId",
                ReadByExcercise: "select * from WorkoutExcerciseInstances where ExcerciseId = $ExcerciseId",
                Update: "update WorkoutExcerciseInstances set Position = ?Position where $WorkoutId and ExcerciseId = $ExcerciseId",
                Delete: "delete from WorkoutExcerciseInstances where WorkoutId = $WorkoutId and ExcerciseId = $ExcerciseId",
                Setup: 'create table if not exists WorkoutExcerciseInstances (WorkoutId text not null, ExcerciseId text not null, Position int, primary key(WorkoutId, ExcerciseId))'
            }
        );
    }

    Read(request, callback){
        let hasWorkoutId = request.hasOwnProperty('WorkoutId');
        let hasExcerciseId = request.hasOwnProperty('ExcerciseId');
        if(hasWorkoutId && hasExcerciseId){
            this.ReadByQuery(request, this.Statements.Read, callback);
        }
        else if(hasWorkoutId){
            this.ReadByQuery(request, this.Statements.ReadByWorkout, callback);
        }
        else if(hasExcerciseId){
            this.ReadByQuery(request, this.Statements.ReadByExcercise, callback);
        }
        else{
            let error = "Read must have either an workout identifier (WorkoutId) or an excercise identifier (ExcerciseId)"
            callback(error, null);
        }
    }
}