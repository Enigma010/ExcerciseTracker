const sqlite = require('sqlite3');
const _ = require('lodash');

const Generic = require('./Generic.js');

module.exports = class Excercise extends Generic{
    constructor(database){
        super(database, 
            {
                Create: 'insert into Excercises (Id, Name, Description, IsSetBased, IsTimeBased) values ($Id, $Name, $Description, $IsSetBased, $IsTimeBased)',
                Read: 'select * from Excercises where Id = $Id',
                Update: 'update Excercises set Name = $Name, Description = $Description, IsSetBased = $IsSetBased, IsTimeBased = $IsTimeBased where Id = $Id',
                Delete: 'delete from Excercises where Id = $Id',
                Setup: 'create table if not exists Excercises (Id text not null, Name text, Description text, IsSetBased int, IsTimeBased int, primary key (Id))'
            }
        );
    }
}