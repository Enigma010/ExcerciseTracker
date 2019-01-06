const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const Generic = require('./Generic.js');

module.exports = class ExcerciseInstance{
    constructor(id){
        Generic.AddGuidId(this, id);
        this.SetNumber = null;
        this.TimeInSeconds = null;
    }

    Validate(){
        if(_.isNull(this.SetNumber) && _.isNull(this.TimeInSeconds)){
            let error = "An instance of an excercise needs either a set number or time duration";
            throw error;
        }
    }
}