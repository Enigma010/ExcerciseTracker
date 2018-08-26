const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const Generic = require('./Generic.js');

module.exports = class Workout{
    constructor(id, workout){
        if(!_.isNull(workout)){
            _.extend(this, workout);
            this.WorkoutId = workout.Id;
        }
        else{
            Generic.AddGuidId(this, id);
            this.CreationDate = Date.now();
        }
    }
}