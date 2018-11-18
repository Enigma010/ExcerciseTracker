const _ = require('lodash');
const assert = require('assert');
const request = require('request');
const uuidv4 = require('uuid/v4');

const ExcerciseTrackerServerUtilities = require('../Utilities/ExcerciseTrackerServerUtilities.js');
const WebRequest = require('../../App/Web/Utilities/WebRequest.js');
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
            assert.equal(body.Data[0].Name, model.Name);
            assert.equal(body.Data[0].Description, model.Description);
        };

        it('Create', function (done) {
            let workout = {};
            workout.Name = uuidv4();
            workout.Description = uuidv4();
            HttpCrudUtilities.CreateUnitTest(server, workout, 'workout', assertFunc, done);
        });

        it('Read', function (done) {
            let workout = {};
            workout.Name = uuidv4();
            workout.Description = uuidv4();  
            HttpCrudUtilities.ReadUnitTest(server, workout, 'workout', assertFunc, assertFunc, done);
        });

        it('Update', function(done){
            let workout = {};
            workout.Name = uuidv4();
            workout.Description = uuidv4();
            let updateModelFunc = function(model){
                let uuid = require('uuid/v4')
                model.Name = uuid();
                model.Description = uuid();
            };
            HttpCrudUtilities.UpdateUnitTest(server, workout, 'workout', assertFunc, updateModelFunc, assertFunc, done);
        });

        it('Delete', function (done) {
            let workout = {};
            workout.Name = uuidv4();
            workout.Description = uuidv4();
            let readAssertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 0);
            };
            HttpCrudUtilities.DeleteUnitTest(server, workout, 'workout', assertFunc, readAssertFunc, done);
        });
    });
});