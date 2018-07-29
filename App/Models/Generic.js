const uuidv4 = require('uuid/v4');
const _ = require('lodash');

module.exports = class Generic{
    static AddGuidId(model){
        if(!model.hasOwnProperty('Id') || _.isNull(model.Id) || _.isUndefined(model.Id)){
            model.Id = uuidv4();
        }
    }
}