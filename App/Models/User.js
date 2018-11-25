const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const Generic = require('./Generic.js');

module.exports = class User{
    constructor(id){
        Generic.AddGuidId(this, id);
    }

    static CreateFrom(model){
        let user = new User();
        delete model.Id;
        _.assignIn(user, model);
        return user;
    };
}