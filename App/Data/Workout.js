const sqlite = require('sqlite3');
const _ = require('lodash');

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
    }

    Create(request, callback){
        super.Create(request, function(request, callback){
            if(request.hasOwnProperty('Excercises')){
                var promises = [];
                _.forEach(request.Excercises, function(excercise){
                    var promise = new Promise()
                });
            }
        });
    }
}