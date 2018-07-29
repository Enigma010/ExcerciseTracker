const sqlite3 = require('sqlite3').verbose();
const Config = require('./../Config/Config.js');

module.exports = class DatabaseData{
    constructor(fileName){
        this.Store = new sqlite3.Database(fileName);
    }
}

