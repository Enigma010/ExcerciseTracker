const _ = require('lodash');
const assert = require('assert');

const Generic = require('../App/Data/Generic.js');
const ArrayUtilities = require('../App/Utilities/ArrayUtilities.js');


describe('Data', function() {
  describe('GenericTests', function(){
    describe('QueryParameters', function() {
      it('Should find a single parameter $Id', function(done) {
        let generic = new Generic();
        let query = 'select * from Table where Id = $Id';
        let parameters = generic.QueryParameters(query)
        assert.equal(ArrayUtilities.ContentsEqual(parameters, ['$Id']), true);
        done();
      });
      it('Should find two paramters $Id and $Name', function(done){
        let generic = new Generic();
        let query = 'insert into Users (Id, Name) values ($Id, $Name)';
        let parameters = generic.QueryParameters(query);
        assert.equal(ArrayUtilities.ContentsEqual(parameters, ['$Id', '$Name']), true);
        done();
      });
    });
  });
});