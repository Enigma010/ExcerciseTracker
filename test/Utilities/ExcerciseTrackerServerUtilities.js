const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

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
        for(let retryCount = 0; retryCount < 10; retryCount++){
            try{
                if(fs.existsSync(server.Database.Store.filename)){
                    fs.unlinkSync(server.Database.Store.filename);
                    break;
                }
            }catch(error){
            }
        }
    }
}