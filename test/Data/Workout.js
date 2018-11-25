const _ = require('lodash');
const assert = require('assert');
const uuidv4 = require('uuid/v4');

const Excercise = require('../../App/Models/Excercise.js');
const Workout = require('../../App/Models/Workout.js');

const ExcerciseTrackerServerUtilities = require('../Utilities/ExcerciseTrackerServerUtilities.js');
const HttpCrudUtilities = require('../Utilities/HttpCrudUtilities.js');

describe('Data', function () {
    describe('Workout', function () {
        let server;

        beforeEach(function () {
            server = ExcerciseTrackerServerUtilities.GetTestServer();
        });

        afterEach(function () {
            server.WebServer.Listener.close();
            ExcerciseTrackerServerUtilities.FinalizeTestServer(server);
        });

        let assertFunc = function(body, model){
            assert.equal(Array.isArray(body.Data), true);
            assert.equal(body.Data.length, 1);
            let bodyModel = body.Data[0];
            assert.equal(bodyModel.Name, model.Name);
            assert.equal(bodyModel.Description, model.Description);
            assert.equal(Boolean(bodyModel.Excercises), Boolean(model.Excercises));
            if(model.Excercises && bodyModel.Excercises){
                assert.equal(bodyModel.Excercises.length, model.Excercises.length);
                let position = 0;
                _.forEach(model.Excercises, function(modelExcercise){
                    let bodyExcercise = body.Data[0].Excercises[position];
                    assert.equal(bodyExcercise.Id, modelExcercise.Id);
                    assert.equal(bodyExcercise.Name, modelExcercise.Name);
                    position++;
                });
            }
        };

        let excerciseAssertFunc = function(body, model){
            assert.equal(Array.isArray(body.Data), true);
            assert.equal(body.Data.length, 1);
            assert.equal(body.Data[0].Name, model.Name);
        };

        let workoutFunc = function(){
            let workout = new Workout();
            workout.Name = uuidv4();
            workout.Description = uuidv4();
            return workout;            
        }

        let excercisesFunc = function(){
            let excercises = [];
            for(let number = 0; number < 2; number++){
                let excercise = new Excercise();
                excercise.Name = uuidv4();
                excercises.push(excercise);
            }
            return excercises;
        }

        let createWorkoutFunc = function (done, workout) {
            let excercises = excercisesFunc();

            let appendExcerciseAssertFunc = function(body, model){
                excerciseAssertFunc(body, model);
                workout.Excercises.push(body.Data[0]);
                if(workout.Excercises.length === excercises.length){
                    workoutCreateFunc();
                }
            }

            let workoutCreateFunc = function(error){
                HttpCrudUtilities.CreateUnitTest(server, workout, 'workout', assertFunc, done);
            };

            _.forEach(excercises, function(excercise){
                HttpCrudUtilities.CreateUnitTest(server, excercise, 'excercise', appendExcerciseAssertFunc);    
            });
        };

        it('Create', function (done) {
            let workout = workoutFunc();
            createWorkoutFunc(done, workout);
        });

        it('Read', function (done) {
            let workout = workoutFunc();
            let readWorkoutFunc = function(){
                HttpCrudUtilities.ReadUnitTest(server, workout, 'workout', assertFunc, assertFunc, done);
            };
            createWorkoutFunc(readWorkoutFunc, workout);
        });

        it('Update', function(done){
            let workout = workoutFunc();
            let updateWorkoutFunc = function(){
                let updateModelFunc = function(model){
                    let uuid = require('uuid/v4')
                    model.Name = uuid();
                    model.Description = uuid();
                };
                HttpCrudUtilities.UpdateUnitTest(server, workout, 'workout', assertFunc, updateModelFunc, assertFunc, done);
            }
            createWorkoutFunc(updateWorkoutFunc, workout);
        });

        it('Delete', function (done) {
            let workout = workoutFunc();
            let deleteWorkoutFunc = function(){
                let readAssertFunc = function(body, model){
                    assert.equal(Array.isArray(body.Data), true);
                    assert.equal(body.Data.length, 0);
                };
                HttpCrudUtilities.DeleteUnitTest(server, workout, 'workout', assertFunc, readAssertFunc, done);
            };
            createWorkoutFunc(deleteWorkoutFunc, workout);
        });
    });
});