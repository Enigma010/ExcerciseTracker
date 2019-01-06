const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const Generic = require('./Generic.js');

module.exports = class Workout{
    constructor(id){
        Generic.AddGuidId(this, id);
    }

    Validate(){
        if(!this.Name){
            let error = 'Name is required';
            throw error;
        }
    }

    static CreateFrom(model){
        let workout = new Workout(model.Id);
        delete model.Id;
        _.assignIn(workout, model);
        return workout;
    };
}