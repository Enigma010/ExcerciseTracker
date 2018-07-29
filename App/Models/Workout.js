const uuidv4 = require('uuid/v4');
const _ = require('lodash');

module.exports = class Workout{
    constructor(id){
        if(_.isNull(id)){
            this.Id = uuidv4();
        }
        else{
            this.Id = id;
        }
        this.Excercises = [];
    }
}