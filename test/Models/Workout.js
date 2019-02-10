const _ = require('lodash');
const assert = require('assert');

const Workout = require('../../App/Models/Workout.js');
const ExcerciseIntent = require('../../App/Models/ExcerciseIntent.js');
const Excercise = require('../../App/Models/Excercise.js');

describe('Model', function () {

    function validModel(model){
        let error = null;
        try{
            model.Validate();
        }
        catch(validateError){
            error = validateError;
        }
        return _.isNull(error);      
    };

    describe('Workout', function () {
        it('Valid', function (done) {
            let workout = new Workout();
            workout.Name = "Name";
            assert.equal(validModel(workout), true);
            done();
        });

        it('Copy Rep Based Excercise', function(done){
            let workout = new Workout();
            let excercise = new Excercise();
            workout.AddSetBasedIntents(3, 10, excercise);

            let workoutCopy = Workout.Copy(workout);
            assert.equal(workout.Id, workoutCopy.Id);
            assert.equal(workout.ExcerciseIntents.length, workoutCopy.ExcerciseIntents.length);
            assert.equal(workout.ExcerciseIntents[0].Id, workoutCopy.ExcerciseIntents[0].Id);
            assert.equal(workout.ExcerciseIntents[0].Excercise.Id, workoutCopy.ExcerciseIntents[0].Excercise.Id);
            assert.equal(10, workoutCopy.ExcerciseIntents[0].ProjectedReps);
            done();
        });

        it('Copy Time Based Excercise', function(done){
            let workout = new Workout();
            let excercise = new Excercise();
            workout.AddTimeBasedIntents(2, 60, excercise);

            let workoutCopy = Workout.Copy(workout);
            assert.equal(workout.Id, workoutCopy.Id);
            assert.equal(workout.ExcerciseIntents.length, workoutCopy.ExcerciseIntents.length);
            assert.equal(workout.ExcerciseIntents[0].Id, workoutCopy.ExcerciseIntents[0].Id);
            assert.equal(workout.ExcerciseIntents[0].Excercise.Id, workoutCopy.ExcerciseIntents[0].Excercise.Id);
            assert.equal(60, workoutCopy.ExcerciseIntents[0].ProjectedTimeInSeconds);
            done();
        });

        it('Copy Change Ids', function(done){
            let workout = new Workout();
            let excercise = new Excercise();
            workout.AddTimeBasedIntents(2, 60, excercise);

            let workoutCopy = Workout.CopyChangeIds(workout);
            assert.notEqual(workout.Id, workoutCopy.Id);
            assert.equal(workout.ExcerciseIntents.length, workoutCopy.ExcerciseIntents.length);
            assert.notEqual(workout.ExcerciseIntents[0].Id, workoutCopy.ExcerciseIntents[0].Id);
            assert.equal(workout.ExcerciseIntents[0].Excercise.Id, workoutCopy.ExcerciseIntents[0].Excercise.Id);
            assert.equal(60, workoutCopy.ExcerciseIntents[0].ProjectedTimeInSeconds);
            done();
        });

        it('Missing Name', function (done) {
            let workout = new Workout();
            assert.equal(validModel(workout), false);
            done();
        });
    });
});