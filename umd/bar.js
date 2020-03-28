if (process.env.NODE_ENV === 'production') {
    module.exports = require('./bar.production.js');
} else {
    module.exports = require('./bar.development.js');
}
