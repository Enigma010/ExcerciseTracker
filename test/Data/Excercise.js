const _ = require('lodash');
const assert = require('assert');
const request = require('request');
const uuidv4 = require('uuid/v4');

const ExcerciseTrackerServer = require('../../ExcerciseTrackerServer.js');
const ExcerciseTrackerServerUtilities = require('../Utilities/ExcerciseTrackerServerUtilities.js');
const WebUtilities = require('../Utilities/WebUtilities.js');

class ExcerciseUnitTest{
    static Create(server, excercise){
        return new Promise(function(resolve, reject){
            request({
                url: 'http://localhost:' + server.WebServer.ListenOnPort + '/excercise/create1',
                method: 'POST',
                json: true,
                body: excercise
            },
            function (error, response, body) {
                if(!_.isNull(error)){
                    reject(error);
                }
                if(WebUtilities.IsHttpErrorResponse(response.statusCode)){
                    reject(response);
                }
                resolve(body);
            });
        });
    }
}

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
            var excercise = {};
            excercise.Name = uuidv4();
            var promise = ExcerciseUnitTest.Create(server, excercise);
            promise.then(function(body){
                assert.equal(Array.isArray(body.Data), true);
                assert.equal(body.Data.length, 1);
                assert.equal(body.Data[0].Name, excercise.Name);
                done();
            }).catch(function(response){
                done(new Error(response));
            });

            // request({
            //     url: 'http://localhost:' + server.WebServer.ListenOnPort + '/excercise/create',
            //     method: 'POST',
            //     json: true,
            //     body: excercise
            // },
            //     function (error, response, body) {
            //         assert.equal(_.isNull(error), true);
            //         assert.equal(Array.isArray(body.Data), true);
            //         assert.equal(body.Data.length, 1);
            //         assert.equal(body.Data[0].Name, excercise.Name);
            //         done();
            //     }
            // );
        });

        // it('Read', function (done) {
        //     var id = '3c535ab6-85d7-4ba4-9dc7-6f1ff1f1906a';
        //     request({
        //         url: 'http://localhost:' + server.WebServer.ListenOnPort + '/excercise/read',
        //         method: 'POST',
        //         json: true,
        //         body: { Id: id }
        //     },
        //         function (error, response, body) {
        //             assert.equal(_.isNull(error), true);
        //             assert.equal(Array.isArray(body.Data), true);
        //             assert.equal(body.Data.length, 1);
        //             assert.equal(body.Data[0].Id, id);
        //             done();
        //         }
        //     );
        // });
    });
});