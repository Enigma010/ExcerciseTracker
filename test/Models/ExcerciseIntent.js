const _ = require('lodash');
const assert = require('assert');

const Excercise = require('../../App/Models/Excercise.js');
const ExcerciseIntent = require('../../App/Models/ExcerciseIntent.js');

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

    describe('ExcerciseIntent', function () {
        it('Valid', function (done) {
            let excerciseIntent = new ExcerciseIntent();
            excerciseIntent.Excercise = new Excercise();
            excerciseIntent.Excercise.Name = 'Name';
            excerciseIntent.Excercise.IsSetBased = true;
            excerciseIntent.IsSetBased = true;
            excerciseIntent.ProjectedReps = 10;
            assert.equal(validModel(excerciseIntent), true);
            done();
        });

        it('Missing Excercise', function (done) {
            let excerciseIntent = new ExcerciseIntent();
            assert.equal(validModel(excerciseIntent), false);
            done();
        });

        it('Set Based but Invalid Reps', function(done){
            let excerciseIntent = new ExcerciseIntent();
            excerciseIntent.Excercise = new Excercise();
            excerciseIntent.Excercise.Name = 'Name';
            excerciseIntent.Excercise.IsSetBased = true;
            excerciseIntent.ProjectedReps = -1;
            assert.equal(validModel(excerciseIntent), false);
            done();
        });

        it('Set Based but Valid Reps', function(done){
            let excerciseIntent = new ExcerciseIntent();
            excerciseIntent.Excercise = new Excercise();
            excerciseIntent.Excercise.Name = 'Name';
            excerciseIntent.Excercise.IsSetBased = true;
            excerciseIntent.ProjectedReps = 5;
            assert.equal(validModel(excerciseIntent), true);
            done();
        });

        it('Time Based but Invalid Time', function(done){
            let excerciseIntent = new ExcerciseIntent();
            excerciseIntent.Excercise = new Excercise();
            excerciseIntent.Excercise.Name = 'Name';
            excerciseIntent.Excercise.IsTimeBased = true;
            excerciseIntent.Excercise.IsSetBased = false;
            excerciseIntent.ProjectedTimeInSeconds = -1;
            assert.equal(validModel(excerciseIntent), false);
            done();
        });

        it('Time Based but Valid Time', function(done){
            let excerciseIntent = new ExcerciseIntent();
            excerciseIntent.Excercise = new Excercise();
            excerciseIntent.Excercise.Name = 'Name';
            excerciseIntent.Excercise.IsTimeBased = true;
            excerciseIntent.Excercise.IsSetBased = false;
            excerciseIntent.ProjectedTimeInSeconds = 30;
            assert.equal(validModel(excerciseIntent), true);
            done();
        });
    });
});