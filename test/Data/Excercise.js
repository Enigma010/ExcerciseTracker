const _ = require('lodash');
const assert = require('assert');
const request = require('request');
const uuidv4 = require('uuid/v4');

const ExcerciseTrackerServerUtilities = require('../Utilities/ExcerciseTrackerServerUtilities.js');
const WebRequest = require('../../App/Web/Utilities/WebRequest.js');
const HttpCrudUtilities = require('../Utilities/HttpCrudUtilities.js');

describe('Data', function () {
    describe('Excercise', function () {
        var server;

        beforeEach(function () {
            server = ExcerciseTrackerServerUtilities.GetTestServer();
        });

        afterEach(function () {
            server.WebServer.Listener.close();
            ExcerciseTrackerServerUtilities.FinalizeTestServer(server);
        });

        it('Create', function (done) {
            let excercise = {};
            excercise.Name = uuidv4();
            let assertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 1);
                assert.equal(body.Data[0].Name, model.Name);
            };
            HttpCrudUtilities.CreateUnitTest(server, excercise, 'excercise', assertFunc, done);
        });

        it('Read', function (done) {
            var excercise = {};
            excercise.Name = uuidv4();

            var assertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 1);
                assert.equal(body.Data[0].Name, model.Name);
            };
            HttpCrudUtilities.ReadUnitTest(server, excercise, 'excercise', assertFunc, assertFunc, done);
        });

        it('Update', function(done){
            var excercise = {};
            excercise.Name = uuidv4();

            var assertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 1);
                assert.equal(body.Data[0].Name, model.Name);
            };

            var updateModelFunc = function(model){
                model.Name = require('uuid/v4')();
            };

            HttpCrudUtilities.UpdateUnitTest(server, excercise, 'excercise', assertFunc, updateModelFunc, assertFunc, done);
        });

        it('Delete', function (done) {
            var excercise = {};
            excercise.Name = uuidv4();
            var createAssertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 1);
                assert.equal(body.Data[0].Name, model.Name);
            };
            var readAssertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 0);
            };
            HttpCrudUtilities.DeleteUnitTest(server, excercise, 'excercise', createAssertFunc, readAssertFunc, done);
        });
    });
});