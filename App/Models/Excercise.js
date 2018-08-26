const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const ExcerciseInstance = require('./ExcerciseInstance.js');
const Generic = require('./Generic.js');

module.exports = class Excercise{
    constructor(id){
        Generic.AddGuidId(this, id);
    }

    static GetInstances(){
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