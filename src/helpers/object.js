export const objectHelpers = {
    isEmpty,
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
