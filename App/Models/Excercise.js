const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const ExcerciseInstance = require('./ExcerciseInstance.js');
const Generic = require('./Generic.js');

module.exports = class Excercise{
    constructor(id){
        Generic.AddGuidId(this, id);
        this.Name = '';
        this.Description = '';
        this.IsSetBased = true;
        this.IsTimeBased = false;
    }

    Validate(){
        if(!this.Name){
            let error = "Name is required";
            throw error;
        }
        if(!this.IsSetBased && !this.IsTimeBased){
            let error = 'The excercise is neither set based or time based';
            throw error;            
        }
    }

    static CreateFrom(model){
        let excercise = new Excercise(model.Id);
        delete model.Id;
        _.assignIn(excercise, model);
        return excercise;
    }
}