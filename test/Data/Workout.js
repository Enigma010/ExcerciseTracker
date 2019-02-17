const _ = require('lodash');
const assert = require('assert');
const uuidv4 = require('uuid/v4');

const Excercise = require('../../App/Models/Excercise.js');
const ExcerciseIntent = require('../../App/Models/ExcerciseIntent.js');
const Workout = require('../../App/Models/Workout.js');
const WebRequest = require('../../App/Web/Utilities/WebRequest.js');

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

        let latestTestFunc = function(done, latest, assertFunc){
            let workouts = [];
            for(let index = 0; index < 5; index++){
                workouts.push(workoutExcerciseIntentsFunc());
            }
            workouts[0].Name = "First";
            workouts[1].Name = "Second";
            workouts[2].Name = "Third";
            workouts[3].Name = "Fourth";
            workouts[4].Name = "Fifth";

            workouts[0].CreatedAt = new Date('1970-01-01 01:00:00');
            workouts[1].CreatedAt = new Date('1970-01-02 01:00:00');
            workouts[2].CreatedAt = new Date('1970-01-03 01:00:00');
            workouts[3].CreatedAt = new Date('1970-01-04 01:00:00');
            workouts[4].CreatedAt = new Date('1970-01-05 01:00:00');

            let workoutPromises = [];
            _.forEach(workouts, function(workout){
                workoutPromises.push(WebRequest.ModelRequestAction(server, workout, 'workout', 'create'));
            });

            Promise.all(workoutPromises).then(function(){
                let latestPromise = WebRequest.ModelRequestAction(server, latest, 'workout', 'latest');
                latestPromise.then(function(response){
                    if(WebRequest.IsHttpErrorResponse(response.statusCode)){
                        done(new Error(response));
                    }
                    assertFunc(response.Data);
                    done();
                }).catch(function(reject){
                    done(new Error('Error finding latest workouts'));
                });
            }).catch(function(reject){
                done(new Error('Error creating workouts'));
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

            let readAssertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 0);
            };

            HttpCrudUtilities.DeleteUnitTest(server, workout, 'workout', assertFunc, readAssertFunc, done);
        });

        it('Copy', function (done) {
            let workout = workoutExcerciseIntentsFunc();
            var copyPromise = WebRequest.ModelRequestAction(server, workout, 'workout', 'copy');
            copyPromise.then(function(response){
                if(WebRequest.IsHttpErrorResponse(response.statusCode)){
                    done(new Error(response));
                }
                assert.equal(Array.isArray(response.Data), true);
                assert.equal(1, response.Data.length);
                let dbWorkout = response.Data[0];
                assert.notEqual(dbWorkout.Id, workout.Id);
                assert.equal(dbWorkout.ExcerciseIntents.length, dbWorkout.ExcerciseIntents.length);
                assert.notEqual(dbWorkout.ExcerciseIntents[0].Id, workout.ExcerciseIntents[0].Id);
                done();
            }).catch(function(response){
                done(new Error(response));
            });
        });

        it('Latest Limited', function(done){
            let latest = {
                LimitNumber: 2
            };
            
            let assertFunc = function(workouts){
                assert.equal(Array.isArray(workouts), true);
                assert.equal(2, workouts.length);
                assert.equal(workouts[0].Name, 'Fifth');
                assert.equal(workouts[1].Name, 'Fourth');
            };

            latestTestFunc(done, latest, assertFunc);
        });

        it('Latest CreatedAt', function(done){
            let latest = {
                CreatedAt: new Date('1970-01-03 01:00:00')
            };
            
            let assertFunc = function(workouts){
                assert.equal(Array.isArray(workouts), true);
                assert.equal(3, workouts.length);
                assert.equal(workouts[0].Name, 'Fifth');
                assert.equal(workouts[1].Name, 'Fourth');
                assert.equal(workouts[2].Name, 'Third');
            };

            latestTestFunc(done, latest, assertFunc);
        });
    });
});