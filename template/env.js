if (process.env.NODE_ENV === 'production') {
    module.exports = require('__PATH_PRODUCTION__');
} else {
    module.exports = require('__PATH_DEVELOPMENT__');
}
