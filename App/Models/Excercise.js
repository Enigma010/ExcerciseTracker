const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const Generic = require('./Generic.js');

module.exports = class Excercise{
    constructor(id){
        Generic.AddGuidId(this, id);
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

    static Copy(copyFrom){
        if(!copyFrom){
            return undefined;
        }
        let copy = new Excercise();
        _.assignIn(copy, copyFrom);
        copy.Id = copyFrom.Id;
        return copy;
    }
}