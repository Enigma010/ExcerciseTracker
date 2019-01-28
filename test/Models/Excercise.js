const _ = require('lodash');
const assert = require('assert');

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

    describe('Excercise', function () {
        it('Valid', function (done) {
            let excercise = new Excercise();
            excercise.Name = "Name";
            excercise.IsSetBased = true;
            assert.equal(validModel(excercise), true);
            done();
        });

        it('Missing Name', function (done) {
            let excercise = new Excercise();
            assert.equal(validModel(excercise), false);
            done();
        });

        it('Not Set or Time Based', function(done){
            let excercise = new Excercise();
            excercise.Name = "Name";
            excercise.IsSetBased = false;
            excercise.IsTimeBased = false;
            assert.equal(validModel(excercise), false);
            done();
        });
    });
});