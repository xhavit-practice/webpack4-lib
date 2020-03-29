const path = require('path');
const merge = require('webpack-merge');
const { npmDir, baseConfig } = require('./webpack.config.base');

const buildDir = path.join(npmDir, 'umd');

const webpackConfig = {
    output: {
        path: buildDir,
        filename: '[name].js',
        library: 'webpack4Lib',
        libraryTarget: 'umd',
        // https://github.com/webpack/webpack/issues/6784
        // To make UMD build available on both browsers and Node.js, set output.globalObject option to 'this'.
        // or there will be an error: window is not defined
        globalObject: 'this',
    },
};

module.exports = merge(baseConfig, webpackConfig);
