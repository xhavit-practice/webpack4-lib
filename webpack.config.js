const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const rootDir = path.resolve(__dirname, '.');
const srcDir = path.join(rootDir, 'src');
const umdDir = path.join(rootDir, './umd');

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

const webpackConfig = {
    entry: getEntryOptions(),
    mode: 'production',
    output: {
        path: umdDir,
        filename: '[name].js',
        library: 'webpack4Lib',
        libraryTarget: 'umd',
        // libraryExport: 'default',
        // https://github.com/webpack/webpack/issues/6784
        // To make UMD build available on both browsers and Node.js, set output.globalObject option to 'this'.
        // or there will be an error: window is not defined
        globalObject: 'this',
    },
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
    plugins: [
        new CleanWebpackPlugin(),
        // to是相对于output.path的
        // from是相对于项目根目录的
        new CopyPlugin([
            // 复制并修改环境判断的主js模块
            ...getCopyOptions(),
            //
            {
                to: umdDir,
                from: path.join(rootDir, 'package.json'),
            },
        ]),
    ],
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
 * 入口文件列表生成CopyPlugin参数
 */
function getCopyOptions() {
    return parsedFiles.map(({ relativePath }) => ({
        to: path.join(umdDir, relativePath),
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

module.exports = webpackConfig;
