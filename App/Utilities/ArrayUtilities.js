const uuidv4 = require('uuid/v4');
const _ = require('lodash');

module.exports = class ArrayUtilities{
    static ContentsEqual(leftArray, rightArray){
        var leftArrayUndefined = _.isUndefined(leftArray);
        var rightArrayUndefined = _.isUndefined(rightArray);
        if(leftArrayUndefined && rightArrayUndefined){
            return true;
        }
        if(leftArrayUndefined || rightArrayUndefined){
            return false;
        }
        if(leftArray.length != rightArray.length){
            return false;
        }
        if(leftArray.length == 0 && rightArray.length == 0){
            return true;
        }
        var found = false;
        _.forEach(leftArray, function(leftItem){
            found = false;
            _.forEach(rightArray, function(rightItem){
                if(leftItem == rightItem){
                    found = true;
                }
            });
            if(!found){
                return false;
            }
        });
        return found;
    }
};