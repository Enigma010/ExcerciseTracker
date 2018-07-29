const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const ExcerciseInstance = require('./ExcerciseInstance.js');

module.exports = class Excercise{
    constructor(id){
        if(_.isNull(id)){
            this.Id = uuidv4();
        }
        else{
            this.Id = id;
        }
    }

    GetInstances(){
        let excerciseInstances = [];
        if(this.NumberOfSets > 0){
            for(let setNumber = 0; setNumber < this.NumberOfSets; setNumber++){
                var excerciseInstance = new ExcerciseInstance();
                excerciseInstance.SetNumber = setNumber;
                excerciseInstance.ExcerciseId = this.Id;
                excerciseInstances[excerciseInstances.length] = excerciseInstance;
            }
        }
        else{
            var excerciseInstance = new ExcerciseInstance();
            excerciseInstance.TimeInSeconds = this.TimeInSeconds;
            excerciseInstance.ExcerciseId = this.Id;
            excerciseInstances[excerciseInstances.length] = excerciseInstance;
        }
        return excerciseInstances;
    }
}