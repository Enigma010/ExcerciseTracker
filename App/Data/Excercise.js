const sqlite = require('sqlite3');
const _ = require('lodash');

const GenericData = require('./Generic.js');

module.exports = class ExcerciseData extends GenericData{
    constructor(database){
        super(database, 
            {
                Create: "insert into Excercises (Id, Name, Description, NumberOfSets, TimeInSeconds) values ($Id, $Name, $Description, $NumberOfSets, $TimeInSeconds)",
                Read: "select * from Excercises where Id = $Id",
                Update: "update Excercises set Name = $Name, Description = $Description, NumberOfSets = $NumberOfSets, IsTimeBased = $IsTimeBased where Id = $Id",
                Delete: "delete from Excercises where Id = $Id",
                Setup: 'create table if not exists Excercises (Id text not null, Name text, Description text, NumberOfSets int, TimeInSeconds int, primary key (Id))'
            }
        );
    }
}