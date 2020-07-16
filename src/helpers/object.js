export const objectHelpers = {
    isEmpty,
    doesObjectInArrayExist,
    findObjectIndexInArray
};

function isEmpty(obj, key) {
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
            return isEmpty(array[index], property);
        }
    } else {
        return false;
    }
}

function findObjectIndexInArray(array, property) {
    if (array.length > 0) {
        for (let index in array) {
            return isEmpty(array[index], property);
        }
    } else {
        return false;
    }
}
