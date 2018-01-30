/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-01-19 14:12:39
 * @version $Id$
 */
/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-01-19 14:12:10
 * @version $Id$
 */
const merge = require('webpack-merge'),
      webpack = require('webpack'),
      htmlWebpackPlugin = require('html-webpack-plugin'),
      uglifyJsPlugin = require('uglifyjs-webpack-plugin'),
      common = require('./webpack.comm.js');

module.exports = merge(common, {

    devtool: 'source-map',

    plugins: [

        //压缩js代码
        new uglifyJsPlugin({
            sourceMap: true
        }),

        //将很少修改的第三方库单独存合并在一个js文件里
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors'
        }),

        //合并公共的文件(包含js和css)
        new webpack.optimize.CommonsChunkPlugin({

            name: 'runtime'

            /*chunks: ['index', 'say', 'message', 'about']*/

        }),

        //添加新的依赖后，保证hash不会乱修改使长缓存失效
        new webpack.HashedModuleIdsPlugin(),
    ]
});

