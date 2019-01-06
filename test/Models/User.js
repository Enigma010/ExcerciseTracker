const _ = require('lodash');
const assert = require('assert');

const User = require('../../App/Models/User.js');

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

    describe('User', function () {
        it('Valid', function (done) {
            let user = new User();
            user.Name = "Name";
            assert.equal(validModel(user), true);
            done();
        });

        it('Missing Name', function (done) {
            let user = new User();
            assert.equal(validModel(user), false);
            done();
        });
    });
});