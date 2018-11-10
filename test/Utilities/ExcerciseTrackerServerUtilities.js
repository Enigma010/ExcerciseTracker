const _ = require('lodash');
const uuidv4 = require('uuid/v4');
var fs = require('fs');

const ExcerciseTrackerServer = require('../../ExcerciseTrackerServer.js');
const Config = require('../../App/Config/Config.js');

module.exports = class ExcerciseTrackerServerUtilities{
    static GetTestServer(){
        var config = new Config(null, Config.DefaultUnitTestDataDirectory(), uuidv4() + '.sqlite');
        var server = new ExcerciseTrackerServer(config);
        return server;
    }

    static FinalizeTestServer(server){
        server.Database.Store.close();
        if(fs.existsSync(server.Database.Store.filename)){
            fs.unlinkSync(server.Database.Store.filename);
        }
    }
}