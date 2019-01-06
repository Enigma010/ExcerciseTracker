const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const ExcerciseInstance = require('./ExcerciseInstance.js');
const Generic = require('./Generic.js');

module.exports = class WorkoutInstance{
    constructor(id){
        Generic.AddGuidId(this, id);
        this.Name = '';
        this.Description = '';
        this.Workout = {};
        this.Excercises = [];
    }

    Validate(){
        if(!this.Name){
            let error = 'Name is required';
            throw error;
        }
    }
}