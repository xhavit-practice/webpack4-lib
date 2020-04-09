const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const buildDir = path.join(rootDir, 'dist');

const cjsConfig = {
    entry: {
        index: path.join(srcDir, 'index.js'),
    },
    output: {
        path: buildDir,
        filename: 'webpack4-lib.cjs.js',
        libraryTarget: 'commonjs2',
        libraryExport: 'default',
    },
};

module.exports = merge(baseConfig, cjsConfig);
