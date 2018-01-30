/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-01-18 14:07:49
 * @version $Id$
 */
const path = require('path'),
      glob = require('glob'),
      htmlWebpackPlugin = require('html-webpack-plugin'),
      cleanWebpackPlugin = require('clean-webpack-plugin'),
      extractTextWebpackPlugin = require('extract-text-webpack-plugin'),
      webpack = require('webpack'),

      //公共使用的第三方库，单独打包到一个文件里避免长效缓存失败
      vendors = ['jquery', 'lodash'],

      //文件路径
      fileDir = {

          //打包前的原始路径
          origin: {
            //入口文件的路径(正则表示)
            entryJs: './src/js/pages/',

            //页面模板路径(正则表示)
            tmpls: './src/view/pages/'
          } ,

          //打包后的路径
          build: {

              //打包后的html存放目录
              view: './view/',

          }
      };

let config = {

        /*entry: {
            //这里的路径是相对于配置文件的当前目录
            index: './src/js/page/index.js',

            //设置引用的第三方库合并后的文件名为vendor
            vendor: ['jquery', 'lodash'],

        },*/

        plugins: [

            new cleanWebpackPlugin(['dist']),

             //提取行内css样式到单独的文件
            new extractTextWebpackPlugin('css/[name].css?v=[chunkhash:8]'),

            //全局加载jq
            new webpack.ProvidePlugin({
                $: 'jquery'
            })

             //生成html页面
            /*new htmlWebpackPlugin({

                //网站图标
                favicon: './src/images/favicon.ico',

                //设置生成文件的路径以及文件名，地址是相对于打包后的根目录
                filename: './view/index.html',

                //自动生成的html页面所参考的模板
                template: './src/view/index.html',

                //js和css插入到页面的位置
                inject: 'body',

                //hash: true,

                //页面需要使用的chunk(打包后的文件)
                chunks: ['vendors', 'index', 'runtime'],

                //压缩html
                minify: {
                    removeComments: true,

                    collapseWhitespace: false

                }
            }),*/
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
                        {
                            test: /\.ejs$/,
                            use: [
                                'ejs-loader'
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
                        }

                ]
            },

        output: {

            //设置生成打包后的根目录
            path: path.resolve(__dirname, 'dist'),

            //生成后的bundle.js的访问目录
            //publicPath: '/dist/',

            filename: 'js/[name].bundle.js?v=[hash:8]', //这里的路径是相对于build的

            //未配置在entry中，但是在入口js文件中被引用的所有js文件被打包后的路径和文件名
            chunkFilename: 'js/[id].bundle.js?v=[hash:8]'

        }
};

 //根据给定的值删除数组对应的值
 function deleteByValue(ary, value, isDeleteAll){

            var i = 0,
                length = ary.length;

            for(; i < length; i++){

                if(value === ary[i]){
                    ary.splice(i,1);

                    //是否删除所有跟value一样的值,默认只删除最近的一个
                    if(!isDeleteAll){
                        break;
                    }
                }

            }

            return ary;
        };
//获取所有的入口地址
function getEntry(globPath) {

    //找到正则globPath匹配的文件名(包括完整的路径)
    let files = glob.sync(globPath),
        entries = {},
    entry, dirname, basename, pathname,extname;

    for (let i = 0; i < files.length; i++) {
         entry = files[i];

         //文件的路径
         dirname = path.dirname(entry);

         //文件名的后缀
         extname = path.extname(entry);

         //方法返回一个 path 的最后一部分
         basename = path.basename(entry, extname);
         pathname = path.join(dirname, basename);

         entries[basename] = entry;

    }
    entries['vendors'] = vendors;
    return entries;
}

/**
 * [配置webpack插件的选项]
 * @param  {[string]} tmplsDir [html模板路径]
 * @param  {[string]} ext      [模板的后缀名]
 * injectArray: 需要将js插入到head的页面数组
 * @return {[type]}          [description]
 */
function configHtmlWebpackOptions(tmplsDir, ext, injectArray) {

    let pages = Object.keys(entries);
    pages = deleteByValue(pages,'vendors');
    pages.forEach(function(pagename) {

       let htmlWebpackOption = {

          filename: fileDir.build.view + pagename + '.html',
          template: fileDir.origin.tmpls + pagename + '.' +ext,
          inject: injectArray && (injectArray.indexof(pagename) !== -1)&&'head'||'body',
          minify: {
              removeComments: true,
              collapseWhitespace: false
            }
        }

        if(pagename in config.entry) {
            htmlWebpackOption.favicon = './src/images/favicon.ico',
            htmlWebpackOption.chunks = ['vendors', 'runtime', pagename]
        }

        config.plugins.push(
            new htmlWebpackPlugin(htmlWebpackOption)
            );
    });
}

var entries = getEntry(fileDir.origin.entryJs + '**/*.js');
//console.log(entries);
config['entry'] = entries;
/*var chunks = [];
for(let prop in entries) {
    if(entries.hasOwnProperty(prop) && prop !== 'vendors') {
        chunks.push(entries[prop]);
    }
}*/

configHtmlWebpackOptions(fileDir.origin.tmpls + '**/*.html', 'html');

module.exports = config;

var plugins = config.plugins;
function consoleProps(obj) {

  for(var prop in obj){
      if(obj.hasOwnProperty(prop)) {
        console.log("属性名：" + prop + ";属性值：");
        console.log(obj[prop]);
      }
      if(typeof prop === 'object' && !(prop instanceof Array)) {
          consoleProps(prop);
      }
  }
};
consoleProps(plugins);
/*
    devServer.publicPath === output.publicPath

*/
