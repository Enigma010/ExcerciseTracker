const _ = require('lodash');

const WebServer = require('./App/Web/Server.js');
const Config = require('./App/Config/Config.js');
const Database = require('./App/Data/Database.js');

module.exports = class ExcerciseTrackerServer{
    constructor(overrideConfig){
        var config = null;
        if(!_.isUndefined(overrideConfig)){
            this.Config = overrideConfig;
        }
        else{
            this.Config = Config;
        }
        this.Database = new Database(this.Config.Path());
        this.WebServer = new WebServer(this.Config.Web.ListenOnPort, this.Database);
    }
}