const _ = require('lodash');
const assert = require('assert');
const request = require('request');
const uuidv4 = require('uuid/v4');

const ExcerciseTrackerServerUtilities = require('../Utilities/ExcerciseTrackerServerUtilities.js');
const Excercise = require('../../App/Models/Excercise.js');
const WebRequest = require('../../App/Web/Utilities/WebRequest.js');
const HttpCrudUtilities = require('../Utilities/HttpCrudUtilities.js');

describe('Data', function () {
    describe('Excercise', function () {
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
        };

        var excerciseCreateFunc = function(){
            let excercise = new Excercise();
            excercise.Name = uuidv4();
            return excercise;
        }

        it('Create', function (done) {
            let excercise = excerciseCreateFunc();
            HttpCrudUtilities.CreateUnitTest(server, excercise, 'excercise', assertFunc, done);
        });

        it('Read', function (done) {
            let excercise = excerciseCreateFunc();
            HttpCrudUtilities.ReadUnitTest(server, excercise, 'excercise', assertFunc, assertFunc, done);
        });

        it('Update', function(done){
            let excercise = excerciseCreateFunc();
            let updateModelFunc = function(model){
                model.Name = require('uuid/v4')();
            };
            HttpCrudUtilities.UpdateUnitTest(server, excercise, 'excercise', assertFunc, updateModelFunc, assertFunc, done);
        });

        it('Delete', function (done) {
            let excercise = excerciseCreateFunc();
            let readAssertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 0);
            };
            HttpCrudUtilities.DeleteUnitTest(server, excercise, 'excercise', assertFunc, readAssertFunc, done);
        });
    });
});