const WebServer = require('./App/Web/Server.js');
const Config = require('./App/Config/Config.js');
const Database = require('./App/Data/Database.js');

let database = new Database(Config.Config.Database.Path);
let webServer = new WebServer(Config.Config.Web.ListenOnPort, database);