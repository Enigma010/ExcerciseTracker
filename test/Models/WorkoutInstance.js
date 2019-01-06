const _ = require('lodash');
const assert = require('assert');
const request = require('request');
const uuidv4 = require('uuid/v4');

const WorkoutInstance = require('../../App/Models/WorkoutInstance.js');
const ExcerciseInstance = require('../../App/Models/ExcerciseInstance.js');

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

    describe('WorkoutInstance', function () {
        it('Basic instance', function (done) {
            let instance = new WorkoutInstance();
            instance.Name = uuidv4();
            assert.equal(validModel(instance), true);
            done();
        });
    });
});