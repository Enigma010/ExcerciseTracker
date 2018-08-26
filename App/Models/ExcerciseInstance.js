const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const Generic = require('./Generic.js');

module.exports = class ExcerciseInstance{
    constructor(id, setNumber, timeInSeconds){
        Generic.AddGuidId(this, id);
        if(!_.isNull(setNumber)){
            this.SetNumber = setNumber;
        }
        else if(!_.isNull(timeInSeconds)){
            this.TimeInSeconds = timeInSeconds;
        }
        else{
            let error = "An instance of an excercise needs either a set number or time duration";
            throw error;
        }
    }

    static CreateFromExcercise(excercise){
        var instances = [];
        if(excercise.NumberOfSets){
            for(var setNumber = 0; excercise.NumberOfSets < setNumber; setNumber++){
                instances[instances.length] = new ExcerciseInstance(null, setNumber, 0);
            }
        }
        else if(excercise.TimeInSeconds){
            instances[instances.length] = new ExcerciseInstance(null, 0, excercise.TimeInSeconds);
        }
        else{
            instances[instances.length] = new ExcerciseInstance(null, 0, 0);
        }
        return instances;
    }
}