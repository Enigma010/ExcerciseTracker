const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const Generic = require('./Generic.js');
const ExcerciseIntent  = require('./ExcerciseIntent.js');

module.exports = class Workout{
    constructor(id){
        Generic.AddGuidId(this, id);
        this.ExcerciseIntents = [];
    }

    AddSetBasedIntents(projectedNumberOfSets, projectedRepsPerSet, excercise){
        let intentInitFunc = function(intent){
            intent.ProjectedReps = projectedRepsPerSet;
        };
        this.AddIntents(projectedNumberOfSets, excercise, intentInitFunc);
    }

    AddTimeBasedIntents(projectedNumberOfSets, projectedTimeInSeconds, excercise){
        let intentInitFunc = function(intent){
            intent.ProjectedTimeInSeconds = projectedTimeInSeconds;
        };
        this.AddIntents(projectedNumberOfSets, excercise, intentInitFunc);
    }

    AddIntents(projectedNumberOfSets, excercise, intentInitFunc){
        if(projectedNumberOfSets <= 0){
            let error = "Projected sets should be greater than 0";
            throw error;
        }
        for(let setNumber = 0; setNumber < projectedNumberOfSets; setNumber++){
            let intent = new ExcerciseIntent();
            intentInitFunc(intent);
            intent.Excercise = excercise;
            this.ExcerciseIntents.push(intent);
        }
    }

    Validate(){
        if(!this.Name){
            let error = 'Name is required';
            throw error;
        }
    }

    static Copy(workout){
        let copy = new Workout(workout.Id);
        _.assignIn(copy, workout);
        copy.ExcerciseIntents = [];
        _.forEach(workout.ExcerciseIntents, function(excerciseIntent){
            copy.ExcerciseIntents.push(_.assignIn({}, excerciseIntent));
        });
        return copy;
    };

    static CopyChangeIds(workout){
        let copy = this.Copy(workout);
        Generic.ChangeId(copy);
        _.forEach(copy.ExcerciseIntents, function(excerciseIntent){
            Generic.ChangeId(excerciseIntent);
        });
        return copy;
    }
}