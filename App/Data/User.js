const sqlite = require('sqlite3');
const _ = require('lodash');

const Generic = require('./Generic.js');

module.exports = class User extends Generic{
    constructor(database){
        super(database, 
            {
                Create: 'insert into Users (Id, Name) values ($Id, $Name)',
                Read: 'select * from Users where Id = $Id',
                Update: 'update Users set Name = $Name where Id = $Id',
                Delete: 'delete from Users where Id = $Id',
                Setup: 'create table if not exists Users (Id text not null, Name text, primary key (Id))'
            }
        );
    }
}