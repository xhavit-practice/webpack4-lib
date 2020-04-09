const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    externals: [
        {
            // mockjs
            mockjs: {
                commonjs: 'mockjs',
                commonjs2: 'mockjs',
                amd: 'mockjs',
                root: 'Mock',
            },
        },
        // lodash
        // 排除lodash/join、lodash/template这样的引用
        // 这里处理了umd中，root类型的情况，否则root下的依赖会变成factory(root["lodash/join"], root["Mock"]);
        // 这个函数把root下的情况处理为了：factory(root["lodash"]["join"], root["Mock"]);
        function externalizeLodash(context, request, callback) {
            console.log(context);
            if (!/^lodash\/.+$/.test(request)) return callback();

            const lodashAlias = '_';
            const rootRequest = request.split('/');
            rootRequest[0] = lodashAlias;

            callback(null, {
                commonjs: request,
                commonjs2: request,
                amd: request,
                root: rootRequest,
            });
        },
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
                test: /\.min\.js$/i,
                sourceMap: true,
            }),
        ],
    },
};
