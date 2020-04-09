const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const buildDir = path.join(rootDir, 'dist');

const esConfig = {
    entry: {
        index: path.join(rootDir, 'script/umdHelp.js'),
        'index.min': path.join(rootDir, 'script/umdHelp.js'),
    },
    output: {
        path: buildDir,
        filename: (chunkData) => {
            return `${chunkData.chunk.name.replace(
                'index',
                'webpack4-lib.umd.help'
            )}.js`;
        },
        libraryTarget: 'var',
    },
};

module.exports = merge(baseConfig, esConfig);
