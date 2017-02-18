const isDevBuild = process.argv.indexOf("--env.prod") < 0;
console.log("DEV BUILD: " + isDevBuild);
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const autoprefixer = require("autoprefixer");
const copyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = () => ({
    resolve: { extensions: ['.js', '.jsx'] },
    output: {
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: /Client/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
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
            './Client/index.jsx'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader',
                query: { limit: 25000 }
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, './Client/styles/sass')],
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader"
                })
            }
        ]
    },
    output: { path: path.join(__dirname, clientBundleOutputDir) },
    plugins: [
        new ExtractTextPlugin('site.min.css'),
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