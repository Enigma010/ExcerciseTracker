const uuidv4 = require('uuid/v4');

const Generic = require('./Generic.js');

module.exports = class User{
    constructor(id){
        Generic.AddGuidId(this, id);
    }
}