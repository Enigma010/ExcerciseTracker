const uuidv4 = require('uuid/v4');
const _ = require('lodash');

module.exports = class Workout{
    constructor(id, workout){
        if(!_.isNull(workout)){
            _.extend(this, workout);
            this.WorkoutId = workout.Id;
        }
        delete this.Id;
        if(_.isNull(id)){
            this.Id = uuidv4();
        }
        else{
            this.Id = id;
        }
        this.CreationDate = Date.now();
    }
}