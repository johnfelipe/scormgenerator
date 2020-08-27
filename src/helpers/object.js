export const objectHelpers = {
    isEmpty,
    checkIfPropertyExist,
    doesObjectInArrayExist,
    findObjectIndexInArray
};

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function checkIfPropertyExist(obj, key) {
    if (obj !== 'undefined') {
        if(obj.hasOwnProperty(key)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function doesObjectInArrayExist(array, property) {
    if (array.length > 0) {
        for (let index in array) {
            let result = isEmpty(array[index], property);

            if (result) {
                return result;
            }
        }

        return false;
    } else {
        return false;
    }
}

function findObjectIndexInArray(array, property) {
    if (array.length > 0) {
        for (let index in array) {
            let result = isEmpty(array[index], property);

            if (result) {
                return index;
            }
        }

        return false;
    } else {
        return false;
    }
}
