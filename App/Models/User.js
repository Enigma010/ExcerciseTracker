const uuidv4 = require('uuid/v4');

module.exports = class User{
    constructor(id){
        if(_.isNull(id)){
            this.Id = uuidv4();
        }
        else{
            this.Id = id;
        }
    }
}