/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-01-19 14:12:10
 * @version $Id$
 */
const merge = require('webpack-merge'),
      path = require('path'),
      webpack = require('webpack'),
      common = require('./webpack.comm.js');

module.exports = merge(common, {

    devtool: 'inline-source-map',

    devServer: {

        /*
        告诉服务器从哪里提供内容.只有在你想要提供静态文件时才需要。
        推荐使用绝对路径。
        */
        // contentBase: path.resolve(__dirname, 'dist'),

        //此路径下的打包文件可在浏览器中访问;确定从哪里提供bundle，并且此选项优先;(是一个虚拟目录，实际上引用的是内存中的文件)
        //publicPath: '/build/' //总是以斜杠开始和结尾

        //hot: true //热启动changeOrigin:true
        
        // 可以局域网访问
        // host: '0.0.0.0',



        contentBase: "./",
        quiet: false, //控制台中不输出打包的信息
        noInfo: false,
        hot: true, //开启热点
        inline: true, //开启页面自动刷新
        lazy: false, //不启动懒加载
        progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        port: '8088', //设置端口号
        proxy: {
            // 反向代理 /cfy 开头的都转发到后台
            '/cfy': {
                target: 'http://192.168.1.77:8080',
                secure: false,
                changeOrigin:true
            },
        }
    },

    plugins: [

        new webpack.NamedModulesPlugin(),

        //热加载
        new webpack.HotModuleReplacementPlugin()
    ]
});
