if (process.env.NODE_ENV === 'production') {
    module.exports = require('./method4.production.js');
} else {
    module.exports = require('./method4.development.js');
}
