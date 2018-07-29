
module.exports = class Response{
    constructor(errorCode, message){
        this.ErrorCode = errorCode;
        this.Message = message;
    }

    get IsError(){
        return this.ErrorCode === 0;
    }
}