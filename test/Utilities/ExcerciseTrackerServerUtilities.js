const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');

const ExcerciseTrackerServer = require('../../ExcerciseTrackerServer.js');
const Config = require('../../App/Config/Config.js');

module.exports = class ExcerciseTrackerServerUtilities{
    static GetTestServer(){
        let config = new Config(null, Config.DefaultUnitTestDataDirectory(), uuidv4() + '.sqlite');
        let server = new ExcerciseTrackerServer(config);
        return server;
    }

    static FinalizeTestServer(server){
        server.Database.Store.close();
        
        let exceptionEncountered = false;
        let attempts = 0;

        let deleteFilesFunc = function(){
            exceptionEncountered = false;
            attempts++;
            fs.readdir(server.Config.Database.Directory, function(err, fileNames){
                fileNames.forEach(function(fileName){
                    let filePath = path.join(server.Config.Database.Directory, fileName);
                    if(fs.existsSync(filePath)){
                        try{
                            fs.unlinkSync(filePath);
                        }
                        catch(exception){
                            exceptionEncountered = true;
                        }
                    }
                });
            });
        };

        do{
            deleteFilesFunc();
        }while(!exceptionEncountered && attempts < 3);
    }
}