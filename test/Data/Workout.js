const _ = require('lodash');
const assert = require('assert');
const uuidv4 = require('uuid/v4');

const Excercise = require('../../App/Models/Excercise.js');
const ExcerciseIntent = require('../../App/Models/ExcerciseIntent.js');
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
            assert.equal(Boolean(dbModel.ExcerciseIntents), Boolean(workoutModel.ExcerciseIntents));
            if(workoutModel.ExcerciseIntents && dbModel.ExcerciseIntents){
                assert.equal(dbModel.ExcerciseIntents.length, workoutModel.ExcerciseIntents.length);
                let position = 0;
                _.forEach(workoutModel.ExcerciseIntents, function(modelExcerciseIntent){
                    let dbExcerciseIntent = body.Data[0].ExcerciseIntents[position];
                    assert.equal(dbExcerciseIntent.Id, modelExcerciseIntent.Id);
                    assert.equal(dbExcerciseIntent.Name, modelExcerciseIntent.Name);
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

        let excerciseIntentsFunc = function(){
            let excerciseIntents = [];
            for(let number = 0; number < 2; number++){
                let excerciseIntent = new ExcerciseIntent();
                
                if(number == 0){
                    excerciseIntent.IsSetBased = true;
                    excerciseIntent.ProjectedReps = 10;
                }
                else{
                    excerciseIntent.IsTimeBased = true;
                    excerciseIntent.ProjectedTimeInSeconds = 60;
                }

                let excercise = new Excercise();
                excercise.Name = uuidv4();

                excerciseIntent.Excercise = excercise;

                excerciseIntents.push(excerciseIntent);
            }
            return excerciseIntents;
        }

        let workoutExcerciseIntentsFunc = function(){
            let workout = workoutFunc();
            workout.ExcerciseIntents = excerciseIntentsFunc();
            return workout;
        }

        let createWorkoutExcerciseIntentsFunc = function (done, workout) {
            let excercisesCreatedCount = 0;
            _.forEach(workout.ExcerciseIntents, function(excerciseIntent){
                HttpCrudUtilities.CreateUnitTest(server, excerciseIntent.Excercise, 'excercise', function(excerciseBody, excerciseModel){
                    excerciseAssertFunc(excerciseBody, excerciseModel);
                    excercisesCreatedCount++;
                    if(excercisesCreatedCount == workout.ExcerciseIntents.length){
                        HttpCrudUtilities.CreateUnitTest(server, workout, 'workout', assertFunc, done);
                    }
                });
            });
        };

        it('Create', function (done) {
            let workout = workoutExcerciseIntentsFunc();
            createWorkoutExcerciseIntentsFunc(done, workout);
        });

        it('Read', function (done) {
            let workout = workoutExcerciseIntentsFunc();
            HttpCrudUtilities.ReadUnitTest(server, workout, 'workout', assertFunc, assertFunc, done);
        });

        it('Update', function(done){
            let workout = workoutExcerciseIntentsFunc();

            let updateFunc = function(){
                workout.Name = uuidv4();
                workout.Description = uuidv4();
                workout.ExcerciseIntents.pop();
            };

            HttpCrudUtilities.UpdateUnitTest(server, workout, 'workout', assertFunc, updateFunc, assertFunc, done);
        });

        it('Delete', function (done) {
            let workout = workoutExcerciseIntentsFunc();
            HttpCrudUtilities.DeleteUnitTest(server, workout, 'workout', assertFunc, assertFunc, done);
        });
    });
});