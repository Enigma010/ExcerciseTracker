const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const ExcerciseInstance = require('./ExcerciseInstance.js');
const Generic = require('./Generic.js');

module.exports = class Excercise{
    constructor(id){
        Generic.AddGuidId(this, id);
    }
}