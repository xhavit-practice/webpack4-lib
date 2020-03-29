const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const npmDir = path.join(rootDir, 'npm');

// 需要build的入口文件
const files = ['index.js', 'method3.js', 'foo/method4.js', 'bar.js'];
// 解析后的files对象
const parsedFiles = files.map(filePath => {
    const absolutePath = path.join(srcDir, filePath);

    return {
        ...path.parse(absolutePath),
        absolutePath,
        // 相对于src的路径
        relativePath: filePath,
    };
});

const baseConfig = {
    entry: getEntryOptions(),
    mode: 'production',
    externals: [
        // external mockjs
        'mockjs',
        // external lodash
        /^lodash\/.+$/,
    ],
    module: {
        rules: [
            // js
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.production\.js$/,
            }),
        ],
    },
    plugins: [new CleanWebpackPlugin()],
};

// 根据入口文件列表生成最终的entry object
function getEntryOptions() {
    return parsedFiles.reduce((entry, file) => {
        let { relativePath, absolutePath, ext } = file;
        relativePath = relativePath.replace(ext, '');

        return {
            ...entry,
            [getFileEnvName(relativePath, 'development')]: absolutePath,
            [getFileEnvName(relativePath, 'production')]: absolutePath,
        };
    }, {});
}

/**
 * 将filePath转换成带production或者development后缀的路径名
 * @param {String} filePath
 * @param {String} nodeEnv <production | development>
 */
function getFileEnvName(filePath, nodeEnv) {
    const res = path.parse(filePath);
    const env = nodeEnv === 'production' ? 'production' : 'development';

    return filePath.replace(res.base, `${res.name}.${env}${res.ext}`);
}

module.exports = {
    files,
    parsedFiles,
    rootDir,
    srcDir,
    npmDir,
    baseConfig,
    getFileEnvName,
};
