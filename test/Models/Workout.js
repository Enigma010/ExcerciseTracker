const _ = require('lodash');
const assert = require('assert');

const Workout = require('../../App/Models/Workout.js');

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

        it('Missing Name', function (done) {
            let workout = new Workout();
            assert.equal(validModel(workout), false);
            done();
        });
    });
});