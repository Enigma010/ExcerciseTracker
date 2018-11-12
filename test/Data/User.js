const _ = require('lodash');
const assert = require('assert');
const request = require('request');
const uuidv4 = require('uuid/v4');

const ExcerciseTrackerServerUtilities = require('../Utilities/ExcerciseTrackerServerUtilities.js');
const WebRequest = require('../../App/Web/Utilities/WebRequest.js');
const HttpCrudUtilities = require('../Utilities/HttpCrudUtilities.js');

describe('Data', function () {
    describe('User', function () {
        var server;

        beforeEach(function () {
            server = ExcerciseTrackerServerUtilities.GetTestServer();
        });

        afterEach(function () {
            server.WebServer.Listener.close();
            ExcerciseTrackerServerUtilities.FinalizeTestServer(server);
        });

        it('Create', function (done) {
            let user = {};
            user.Name = uuidv4();
            let assertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 1);
                assert.equal(body.Data[0].Name, model.Name);
            };
            HttpCrudUtilities.CreateUnitTest(server, user, 'user', assertFunc, done);
        });

        it('Read', function (done) {
            var user = {};
            user.Name = uuidv4();

            var assertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 1);
                assert.equal(body.Data[0].Name, model.Name);
            };
            HttpCrudUtilities.ReadUnitTest(server, user, 'user', assertFunc, assertFunc, done);
        });

        it('Update', function(done){
            var user = {};
            user.Name = uuidv4();

            var assertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 1);
                assert.equal(body.Data[0].Name, model.Name);
            };

            var updateModelFunc = function(model){
                model.Name = require('uuid/v4')();
            };

            HttpCrudUtilities.UpdateUnitTest(server, user, 'user', assertFunc, updateModelFunc, assertFunc, done);
        });

        it('Delete', function (done) {
            var user = {};
            user.Name = uuidv4();
            var createAssertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 1);
                assert.equal(body.Data[0].Name, model.Name);
            };
            var readAssertFunc = function(body, model){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 0);
            };
            HttpCrudUtilities.DeleteUnitTest(server, user, 'user', createAssertFunc, readAssertFunc, done);
        });
    });
});