const _ = require('lodash');
const assert = require('assert');
const request = require('request');
const uuidv4 = require('uuid/v4');

const ExcerciseInstance = require('../../App/Models/ExcerciseInstance.js');
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

    describe('ExcerciseInstance', function () {
        it('Set based excercise', function (done) {
            let instance = new ExcerciseInstance();
            instance.SetNumber = 3;
            assert.equal(instance.SetNumber, 3);
            assert.equal(validModel(instance), true);
            done();
        });

        it('Time based excercise', function(done){
            let instance = new ExcerciseInstance();
            instance.TimeInSeconds = 60;
            assert.equal(instance.TimeInSeconds, 60);
            assert.equal(validModel(instance), true);
            done();
        });

        it('Set and time based excercise', function(done){
            let instance = new ExcerciseInstance();
            instance.SetNumber = 6;
            instance.TimeInSeconds = 30;
            assert.equal(instance.SetNumber, 6);
            assert.equal(instance.TimeInSeconds, 30);
            assert.equal(validModel(instance), true);
            done();
        });

        it('Neither set or time based excercise', function(done){
            let instance = new ExcerciseInstance();
            assert.equal(validModel(instance), false);
            done();
        });
    });
});