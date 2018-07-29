const sqlite = require('sqlite3');
const _ = require('lodash');

const GenericData = require('./Generic.js');

module.exports = class ExcerciseInstanceData extends GenericData{
    constructor(database){
        super(database, 
            {
                Create: "insert into ExcerciseInstances (Id, ExcerciseId, SetNumber, ProjectedReps, Reps, ProjectedTimeInSeconds, TimeInSeconds) values ($Id, $ExcerciseId, $SetNumber, $ProjectedReps, $Reps, $ProjectedTimeInSeconds, $TimeInSeconds)",
                Read: "select * from ExcerciseInstances where Id = $Id",
                ReadByExcerciseId: "select * from ExcerciseInstances where ExcerciseId = $ExcerciseId",
                Update: "update ExcerciseInstances set SetNumber = $SetNumber, ExcerciseId = $ExcerciseId, SetNumber = $SetNumber, Reps = $Reps, ProjectedTimeInSeconds = $ProjectedTimeInSeconds, TimeInSeconds = $TimeInSeconds where Id = $Id",
                Delete: "delete from ExcerciseInstances where Id = $Id",
                Setup: 'create table if not exists ExcerciseInstances (Id text not null, ExcerciseId text not null, SetNumber number, ProjectedReps number, Reps number, ProjectedTimeInSeconds number, TimeInSeconds number, primary key (Id))'
            }
        );
    }

    Read(id, callback){
        let hasId = request.hasOwnProperty('Id');
        let hasExcerciseId = request.hasOwnProperty('ExcerciseId');
        if(hasId){
            this.GenericModel.Read(id, callback);
        }
        else if(hasExcerciseId){
            this.GenericModel.ReadByQuery(request, this.Statements.ReadByExcerciseId, callback);
        }
    }
}