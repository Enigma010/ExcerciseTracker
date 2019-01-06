const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('./Controllers/UserController.js');
const WorkoutController = require('./Controllers/WorkoutController.js');
const ExcerciseController = require('./Controllers/ExcerciseController.js');
const WorkoutInstanceController = require('./Controllers/WorkoutInstanceController.js');

const WorkoutExcercise = require('../Data/WorkoutExcercise.js');
const ExcerciseInstance = require('../Data/ExcerciseInstance.js');

module.exports = class Server{
    constructor(listenOnPort, database){
        this.ListenOnPort = listenOnPort;
        this.Server = express();
        this.Server.use(bodyParser.json());
        this.Listener = this.Server.listen(this.ListenOnPort);
        this.Database = database;
        this.Controllers = [];
        this.DataModels = [];
        this.Setup();
    }

    Setup(){
        this.SetupControllers();
        this.SetupDataModels();
    }

    SetupControllers(){
        this.Controllers['UserController'] = new UserController(this, this.Database);
        this.Controllers['WorkoutController'] = new WorkoutController(this, this.Database);
        this.Controllers['ExcerciseController'] = new ExcerciseController(this, this.Database);
        this.Controllers['WorkoutInstanceController'] = new WorkoutInstanceController(this, this.Database);
    }

    SetupDataModels(){
        this.DataModels['WorkoutExcercise'] = new WorkoutExcercise(this.Database);
        this.DataModels['ExcerciseInstance'] = new ExcerciseInstance(this.Database);
    }
}