const _ = require('lodash');
const assert = require('assert');

const ArrayUtilities = require('../../App/Utilities/ArrayUtilities.js');

describe('Utilities', function() {
    describe('ArrayUtilities', function(){
        describe('ContentsEqual', function() {
            it('Left and Right Side Equal 1 element', function(done) {
                var left = ['$Id'];
                var right = ['$Id'];
                assert.equal(ArrayUtilities.ContentsEqual(left, right), true);
                done();
            });
            it('Left and Right Side Equals 2 elements not in order', function(done){
                var left = ['$Name', '$Id'];
                var right = ['$Id', '$Name'];
                assert.equal(ArrayUtilities.ContentsEqual(left, right), true);
                done();
            });
            it('Left and Right Side Not Equal 0 elements', function(done){
                var left = [];
                var right = [];
                assert.equal(ArrayUtilities.ContentsEqual(left, right), true);
                done();
            });
        });
    });
});