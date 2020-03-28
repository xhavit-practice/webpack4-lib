if (process.env.NODE_ENV === 'production') {
    module.exports = require('./method3.production.js');
} else {
    module.exports = require('./method3.development.js');
}
