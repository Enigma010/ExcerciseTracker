const uuidv4 = require('uuid/v4');
const _ = require('lodash');
var path = require('path');
var fs = require('fs-extra');

module.exports = class Config{

    constructor(webListenOnPort, databaseDirectory, databaseFile){
        if(_.isUndefined(webListenOnPort) || _.isNull(webListenOnPort)){
            webListenOnPort = 3000;
        }
        if(_.isUndefined(databaseDirectory) || _.isNull(databaseDirectory)){
            databaseDirectory = DefaultDataDirectory();
        }
        if(_.isUndefined(databaseFile) || _.isNull(databaseFile)){
            databaseFile = DefaultFileName();
        }
        fs.ensureDirSync(databaseDirectory);
        this.Web = {
            ListenOnPort: webListenOnPort
        }
        this.Database = {
            Directory: databaseDirectory,
            File: databaseFile
        }
    }

    static DefaultDataDirectory(){
        return '../Data/ExcerciseTracker/App/';
    }

    static DefaultUnitTestDataDirectory(){
        return '../Data/ExcerciseTracker/UnitTest/';
    }

    static DefaultFileName(){
        return 'ExcerciseTracker.sqlite';
    }

    Path(){
        return path.join(this.Database.Directory, this.Database.File);
    }
}