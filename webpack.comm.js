/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-01-18 14:07:49
 * @version $Id$
 */
const path = require('path'),
      htmlWebpackPlugin = require('html-webpack-plugin'),
      cleanWebpackPlugin = require('clean-webpack-plugin'),
      extractTextWebpackPlugin = require('extract-text-webpack-plugin'),
      webpack = require('webpack');

let config = {

        entry: {
            //这里的路径是相对于配置文件的当前目录
            index: './src/js/page/index.js',

            //设置引用的第三方库合并后的文件名为vendor
            vendor: ['jquery', 'lodash']

        },

        plugins: [

            new cleanWebpackPlugin(['dist']),

             //提取行内css样式到单独的文件
            new extractTextWebpackPlugin('css/[name].css?v=[chunkhash:8]'),

            //全局加载jq
            new webpack.ProvidePlugin({
                $: 'jquery'
            }),

             //生成html页面
            new htmlWebpackPlugin({

                //网站图标
                favicon: './src/images/favicon.ico',

                //设置生成文件的路径以及文件名，地址是相对于打包后的根目录
                filename: './view/index.html',

                //自动生成的html页面所参考的模板
                template: './src/view/index.html',

                //js和css插入到页面的位置
                inject: true,

                //hash: true,

                //页面需要使用的chunk(打包后的文件)
                chunks: ['vendors', 'index', 'runtime'],

                //压缩html
                minify: {
                    removeComments: true,

                    collapseWhitespace: false

                }
            }),
        ],

        module: {

                rules: [

                        //抽离css样式
                        {
                            test: /\.css$/,
                            use: extractTextWebpackPlugin.extract({
                                fallback: 'style-loader',
                                use: 'css-loader'
                            })
                        },
                        /*
                        * 将图片混合到css中
                        * url-loader：与file-loader类似；如果文件小于限制的字节大小，它可以返回一个dataURL(base64格式的图片描述字符串，减少http请求)
                        *
                         *  */
                        {
                            test: /\.(png|jpg|gif|ico)$/,
                            use: [
                                {
                                    loader: 'url-loader',
                                    options: {
                                        name: 'images/[name].[ext]?v=[hash:8]',

                                        //将8KB以下的图片转换为base64的dataURL输出形式
                                        limit: 8192,

                                        publicPath: '../'
                                    }

                                }
                            ],
                        },

                        //html页面路径自动转换不正确
                        {
                            test: /\.html$/,
                            use: [
                                'html-loader'
                            ]
                        },

                        //加载字体
                        {
                            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                            use: [
                                {
                                    loader: 'file-loader',
                                    options: {
                                        name: 'fonts/[name].[ext]?v=[hash:8]',
                                        publicPath: '../'
                                    }
                                }
                            ]
                        },

                        //编译less
                        {
                            test: /\.less$/,
                            loader: extractTextWebpackPlugin.extract('css-loader!less-loader')
                        },
                        // 编译txt
                        {
                            test: /\.txt$/,
                            use: 'raw-loader',
                        }

                ]
            },

        output: {

            //设置生成打包后的根目录
            path: path.resolve(__dirname, 'dist'),

            //生成后的bundle.js的访问目录
            //publicPath: '/build/',

            filename: 'js/[name].bundle.js?v=[hash:8]', //这里的路径是相对于build的

            //未配置在入口文件中的js文件打包后的路径和文件名
            chunkFilename: 'js/[id].bundle.js?v=[hash:8]'

        }
};
module.exports = config;

/*
    devServer.publicPath === output.publicPath

*/
