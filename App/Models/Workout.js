const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const Generic = require('./Generic.js');

module.exports = class Workout{
    constructor(id){
        Generic.AddGuidId(this, id);
        this.Excercises = [];
    }

    static CreateFrom(model){
        let workout = new Workout();
        delete model.Id;
        _.assignIn(workout, model);
        return workout;
    };
}