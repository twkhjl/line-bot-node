const strHelper = {
    // displayName => display_name
    camelToSnakeCase: function (str) {
        return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/^_/, '');
    }
}

module.exports = strHelper;