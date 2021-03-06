const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const buildDir = path.join(rootDir, 'dist');

const umdConfig = {
    entry: {
        index: path.join(srcDir, 'index.js'),
        'index.min': path.join(srcDir, 'index.js'),
    },
    devtool: 'source-map',
    output: {
        path: buildDir,
        filename: (chunkData) => {
            return `${chunkData.chunk.name.replace(
                'index',
                'webpack4-lib.umd'
            )}.js`;
        },
        library: 'webpack4Lib',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: 'this',
    },
    plugins: [new CleanWebpackPlugin()],
};

module.exports = merge(baseConfig, umdConfig);
