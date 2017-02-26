const isDevBuild = process.argv.indexOf('--env.prod') < 0;
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    resolve: { 
        extensions: ['.js'],
        alias: {
            //see https://vuejs.org/v2/guide/installation.html#Standalone-vs-Runtime-only-Build
            'vue$':'vue/dist/vue.common.js' 
        }
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: require.resolve('json-loader') },
            {test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, loader: 'url-loader?limit=25000'}
        ]
    },
    entry: {
        vendor: [
            'vue'
            //'react',
            //'react-dom',
            //'react-router'
            //additional frameworks/libs here...=>
        ]
    },
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        library: '[name]_[hash]'
    },
    plugins: [
        new CleanWebpackPlugin(
            ['./wwwroot/dist']
        ),
        new webpack.NormalModuleReplacementPlugin(/\/iconvloader$/, require.resolve('node-noop')),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
        })
    ]
}

const extractCSS = new ExtractTextPlugin('vendor.css');
const clientBundleConfig = merge(config,
{
    output: { path: path.join(__dirname, 'wwwroot', 'dist') },
    module: {
        loaders: [
            { test: /\.css(\?|$)/, loader: extractCSS.extract(['css-loader']) }
        ]
    },
    plugins: [
        extractCSS,
        new webpack.DllPlugin({
            path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
            name: '[name]_[hash]'
        })
    ].concat(isDevBuild
        ? []
        : [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
        ])
});

module.exports = [clientBundleConfig];