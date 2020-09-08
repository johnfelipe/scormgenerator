export const stringHelpers = {
    ucfirst,
};

function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
