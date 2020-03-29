const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const {
    parsedFiles,
    rootDir,
    npmDir,
    baseConfig,
    getFileEnvName,
} = require('./webpack.config.base');

const buildDir = path.join(npmDir, '.');

const webpackConfig = {
    output: {
        path: buildDir,
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    plugins: [
        // to是相对于output.path的
        // from是相对于项目根目录的
        new CopyPlugin([
            // 复制并修改环境判断的主js模块
            ...getCopyOptions(),
            //
            {
                to: buildDir,
                from: path.join(rootDir, 'package.json'),
            },
        ]),
    ],
};

/**
 * 入口文件列表生成CopyPlugin参数
 */
function getCopyOptions() {
    return parsedFiles.map(({ relativePath }) => ({
        to: path.join(buildDir, relativePath),
        from: path.join(rootDir, 'template/env.js'),
        transform: copyTemplateTransform,
    }));
}

/**
 * template content转换程序
 * @param {Buffer} content template content
 */
function copyTemplateTransform(content) {
    const toPath = `./${path.parse(this.to).base}`;
    const jsString = content
        .toString('utf8')
        .replace(/__PATH_PRODUCTION__/g, getFileEnvName(toPath, 'production'))
        .replace(
            /__PATH_DEVELOPMENT__/g,
            getFileEnvName(toPath, 'development')
        );

    return jsString;
}

module.exports = merge(baseConfig, webpackConfig);
