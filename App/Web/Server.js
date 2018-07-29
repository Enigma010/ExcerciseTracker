const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('./Controllers/UserController.js');
const WorkoutController = require('./Controllers/WorkoutController.js');
const ExcerciseController = require('./Controllers/ExcerciseController.js');
const WorkoutExcerciseController = require('./Controllers/WorkoutExcerciseController');
const WorkoutInstanceController = require('./Controllers/WorkoutInstanceController.js');
const ExcerciseInstanceController = require('./Controllers/ExcerciseInstanceController.js');

module.exports = class Server{
    constructor(listenOnPort, database){
        this.ListenOnPort = listenOnPort;
        this.Server = express();
        this.Server.use(bodyParser.json());
        this.Server.listen(this.ListenOnPort);
        this.Database = database;
        this.SetupControllers();
    }

    SetupControllers(){
        let userController = new UserController(this, this.Database);
        let workutController = new WorkoutController(this, this.Database);
        let excerciseController = new ExcerciseController(this, this.Database);
        let workoutExcerciseController = new WorkoutExcerciseController(this, this.Database);
        let workoutInstanceController = new WorkoutInstanceController(this, this.Database);
        let excerciseInstanceController = new ExcerciseInstanceController(this, this.Database);
    }
}