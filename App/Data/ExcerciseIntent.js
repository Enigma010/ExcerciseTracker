const sqlite = require('sqlite3');
const _ = require('lodash');

const Generic = require('./Generic.js');
const ExcerciseIntentModel = require('../Models/ExcerciseIntent.js');
const ExcerciseDb = require('../Data/Excercise.js');

module.exports = class ExcerciseIntent extends Generic{
    constructor(database){
        super(database, 
            {
                Create: 'insert into ExcerciseIntents (Id, Position, OwnerId, IsSetBased, ProjectedReps, IsTimeBased, ProjectedTimeInSeconds, ExcerciseId) values ($Id, $Position, $OwnerId, $IsSetBased, $ProjectedReps, $IsTimeBased, $ProjectedTimeInSeconds, $ExcerciseId)',
                Read: 'select * from ExcerciseIntents where Id = $Id',
                Update: 'update ExcerciseIntents set Position = $Position, OwnerId = $OwnerId, IsSetBased = $IsSetBased, ProjectedReps = $ProjectedReps, IsTimeBased = $IsTimeBased, ProjectedTimeInSeconds = $ProjectedTimeInSeconds, ExcerciseId = $ExcerciseId  where Id = $Id',
                Delete: 'delete from ExcerciseIntents where Id = $Id',
                Setup: 'create table if not exists ExcerciseIntents (Id text not null, Position int not null, OwnerId text not null, IsSetBased int, ProjectedReps int, IsTimeBased int, ProjectedTimeInSeconds int, ExcerciseId text not null, primary key (Id))'
            }
        );
    }

    ReadByOwner(ownerId, callback){
        let excerciseDb = new ExcerciseDb(this.Database);

        let intentsQuery = "select * from ExcerciseIntents where OwnerId = $OwnerId order by Position";
        let intentsData = {};
        intentsData.OwnerId = ownerId;

        let intents = [];

        let owner = {
            OwnerId: ownerId
        };

        this.ReadByQuery(owner, intentsQuery, function(error, readIntents){
            if(error){
                callback(error);
            }
            let numberIntentsRead = 0;
            _.forEach(readIntents, function(readIntent){
                
                let readExcerciseDefinition = {};
                readExcerciseDefinition.Id = readIntent.ExcerciseId;
                
                excerciseDb.Read(readExcerciseDefinition, function(error, readExcercise){
                    if(error){
                        callback(error);
                    }
                    if(!_.isUndefined(readExcercise) && !_.isNull(readExcercise) && readExcercise.length > 0){
                        readIntent.Excercise = readExcercise[0];
                    }
                    intents[intents.length] = readIntent;
                    numberIntentsRead++;
                    if(numberIntentsRead == readIntents.length){
                        callback(null, intents);
                    }
                });
            });
        });
    }

    Upsert(excerciseIntents, ownerId, callback){
        let self = this;
        let errorOccurred = false;

        let deleteQuery = "delete from ExcerciseIntents where OwnerId = $OwnerId";
        let deleteExcerciseIntent = {
            OwnerId: ownerId
        };

        _.forEach(excerciseIntents, function(excerciseIntent){
            excerciseIntent.OwnerId = ownerId;
        });

        this.RunQuery(deleteExcerciseIntent, deleteQuery, function(error){
            if(error || !excerciseIntents || excerciseIntents.length == 0){
                callback(error);
            }

            let excerciseIntentsCreated = 0;
        
            _.forEach(excerciseIntents, function(excerciseIntent){
                excerciseIntent.Position = excerciseIntentsCreated;
                if(!excerciseIntent.ExcerciseId && excerciseIntent.Excercise){
                    excerciseIntent.ExcerciseId = excerciseIntent.Excercise.Id;
                }
                let createExcerciseIntent = ExcerciseIntentModel.Copy(excerciseIntent);
                self.RunQuery(createExcerciseIntent, self.Statements.Create, function(error){
                    if(error){
                        errorOccurred = true;
                        callback(error);
                    }
                    excerciseIntentsCreated++;
                    if(excerciseIntentsCreated == excerciseIntents.length){
                        callback();
                    }
                });
            });
        });
    }
}