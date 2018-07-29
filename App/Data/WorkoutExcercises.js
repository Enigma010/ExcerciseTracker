const sqlite = require('sqlite3');
const _ = require('lodash');

const GenericData = require('./Generic.js');

module.exports = class WorkoutData extends GenericData{
    constructor(database){
        super(database,
            {
                Create: "insert into WorkoutExcercises (WorkoutId, ExcerciseDefinitionId, Position) values ($WorkoutId, $ExcerciseDefinitionId, $Position)",
                Read: "select * from WorkoutExcercises where WorkoutId = $WorkoutId and ExcerciseDefinitionId = $ExcerciseDefinitionId",
                ReadByWorkout: "select * from WorkoutExcercises where WorkoutId = $WorkoutId",
                ReadByExcercise: "select * from WorkoutExcercises where ExcerciseDefinitionId = $ExcerciseDefinitionId",
                Update: "update WorkoutExcercises set Position = ?Position where $WorkoutId and ExcerciseDefinitionId = $ExcerciseDefinitionId",
                Delete: "delete from WorkoutExcercises where WorkoutId = $WorkoutId and ExcerciseDefinitionId = $ExcerciseDefinitionId",
                Setup: 'create table if not exists WorkoutExcercises (WorkoutId text not null, ExcerciseDefinitionId text not null, Position int, primary key(WorkoutId, ExcerciseDefinitionId))'
            }
        );
    }

    Read(request, callback){
        let hasWorkoutId = request.hasOwnProperty('WorkoutId');
        let hasExcerciseId = request.hasOwnProperty('ExcerciseDefinitionId');
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
            let error = "Read must have either an workout identifier (WorkoutId) or an excercise identifier (ExcerciseDefinitionId)"
            callback(error, null);
        }
    }
}