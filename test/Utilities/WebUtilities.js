module.exports = class WebUtilities{
    static IsHttpErrorResponse(response){
        var errorCodeHundreds = Math.floor(response / 100);
        return errorCodeHundreds == 4 || errorCodeHundreds == 5;
    }
}