const isDevBuild = process.argv.indexOf("--env.prod") < 0;
console.log("DEV BUILD: " + isDevBuild);
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const autoprefixer = require("autoprefixer");
const copyWebpackPlugin = require("copy-webpack-plugin");

const config = () => ({
    resolve: { 
        extensions: ['.js'],
        alias: {
            'vue$':'vue/dist/vue.common.js'
        }
    },
    output: {
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                include: /Client/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            }, 
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/ 
            }
        ]
    }
});

const clientBundleOutputDir = './wwwroot/dist';
const clientBundleConfig = merge(config(),
{
    entry: {
        'main-client': [
            //main client app entry point
            './Client/index.js'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader',
                query: { limit: 25000 }
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, './Client/styles/sass')],
                loaders: ['style-loader', 'css-loader', 'postcss', 'sass-loader']
            }
        ]
    },
    output: { path: path.join(__dirname, clientBundleOutputDir) },
    plugins: [
        //new ExtractTextPlugin('site.css'),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        }),
        copyWebpackPlugin([
            {
                from: 'Client/images',
                to: 'images'
            }
        ])
    ].concat(
        isDevBuild
            ? [
                new webpack.SourceMapDevToolPlugin({
                    filename: '[file].map',
                    moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]')
                })
            ]
            : [
                new webpack.optimize.OccurrenceOrderPlugin(),
                new webpack.optimize.UglifyJsPlugin({compress: { warnings: false}})
            ])
    });

module.exports = [clientBundleConfig];