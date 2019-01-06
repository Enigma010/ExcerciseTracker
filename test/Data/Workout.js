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

        let assertFunc = function(body, workoutModel){
            assert.equal(Array.isArray(body.Data), true);
            assert.equal(body.Data.length, 1);
            let dbModel = body.Data[0];
            assert.equal(dbModel.Name, workoutModel.Name);
            assert.equal(dbModel.Description, workoutModel.Description);
            assert.equal(Boolean(dbModel.Excercises), Boolean(workoutModel.Excercises));
            if(workoutModel.Excercises && dbModel.Excercises){
                assert.equal(dbModel.Excercises.length, workoutModel.Excercises.length);
                let position = 0;
                _.forEach(workoutModel.Excercises, function(modelExcercise){
                    let dbExcercise = body.Data[0].Excercises[position];
                    assert.equal(dbExcercise.Id, modelExcercise.Id);
                    assert.equal(dbExcercise.Name, modelExcercise.Name);
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

        let workoutExcercisesFunc = function(){
            let workout = workoutFunc();
            workout.Excercises = excercisesFunc();
            return workout;
        }

        let createWorkoutExcercisesFunc = function (done, workout) {
            let excercisesCreatedCount = 0;
            _.forEach(workout.Excercises, function(excercise){
                HttpCrudUtilities.CreateUnitTest(server, excercise, 'excercise', function(excerciseBody, excerciseModel){
                    excerciseAssertFunc(excerciseBody, excerciseModel);
                    excercisesCreatedCount++;
                    if(excercisesCreatedCount == workout.Excercises.length){
                        HttpCrudUtilities.CreateUnitTest(server, workout, 'workout', assertFunc, done);
                    }
                });
            });
        };
        
        let createExcercisesFunc = function (done, workout) {
            let excercisesCreatedCount = 0;
            _.forEach(workout.Excercises, function(excercise){
                HttpCrudUtilities.CreateUnitTest(server, excercise, 'excercise', function(excerciseBody, excerciseModel){
                    excerciseAssertFunc(excerciseBody, excerciseModel);
                    excercisesCreatedCount++;
                    if(excercisesCreatedCount == workout.Excercises.length){
                        done();
                    }
                });
            });
        };

        it('Create', function (done) {
            let workout = workoutExcercisesFunc();
            createWorkoutExcercisesFunc(done, workout);
        });

        it('Read', function (done) {
            let workout = workoutExcercisesFunc();
            let readWorkoutFunc = function(){
                HttpCrudUtilities.ReadUnitTest(server, workout, 'workout', assertFunc, assertFunc, done);
            };
            createExcercisesFunc(readWorkoutFunc, workout);
        });

        // it('Update', function(done){
        //     let workout = workoutFunc();
        //     let updateWorkoutFunc = function(){
        //         let updateModelFunc = function(model){
        //             let uuid = require('uuid/v4')
        //             model.Name = uuid();
        //             model.Description = uuid();
        //         };
        //         HttpCrudUtilities.UpdateUnitTest(server, workout, 'workout', assertFunc, updateModelFunc, assertFunc, done);
        //     }
        //     createWorkoutExcercisesFunc(updateWorkoutFunc, workout);
        // });

        // it('Delete', function (done) {
        //     let workout = workoutFunc();
        //     let deleteWorkoutFunc = function(){
        //         let readAssertFunc = function(body, model){
        //             assert.equal(Array.isArray(body.Data), true);
        //             assert.equal(body.Data.length, 0);
        //         };
        //         HttpCrudUtilities.DeleteUnitTest(server, workout, 'workout', assertFunc, readAssertFunc, done);
        //     };
        //     createWorkoutExcercisesFunc(deleteWorkoutFunc, workout);
        // });
    });
});