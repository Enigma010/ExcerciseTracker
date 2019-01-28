const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const Excercise = require('./Excercise.js');
const Generic = require('./Generic.js');

module.exports = class ExcerciseIntent{
    constructor(id){
        Generic.AddGuidId(this, id);
    }

    static Copy(copyFrom){
        if(!copyFrom){
            return undefined;
        }
        var copy = new ExcerciseIntent();
        _.assignIn(copy, copyFrom);
        copy.Id = copyFrom.Id;
        copy.Excercise = Excercise.Copy(copyFrom.Excercise);
        return copy;
    }

    Validate(){
        if(_.isNull(this.Excercise)){
            let error = 'The excercise is required';
            throw error;
        }
        this.Excercise.Validate();
        if(this.Excercise.IsSetBased && this.ProjectedReps <= 0){
            let error = 'The excercise is set based but the projected reps is invalid: ' + this.ProjectedReps;
            throw error;
        }
        if(this.Excercise.IsTimeBased && this.ProjectedTimeInSeconds <= 0){
            let error = 'The excercise is time based but the projected time is invalid: ' + this.ProjectedTimeInSeconds;
            throw error;
        }
    }
};