
module.exports = function (config) {
    config.set({
        basePath: './Client',
        browsers: ['Chrome'],
        singleRun: true, //switch to enable debug
        frameworks: ['jasmine'],
        reporters: ['progress'],
        colors: true,
        autowatch: true,
        files: [
            { pattern: '__tests__/*-test.jsx', watched: false },
            { pattern: '__tests__/**/*-test.jsx', watched: false }
        ],

        preprocessors: {
            '__tests__/*-test.jsx': ['webpack'],
            '__tests__/**/*-test.jsx': ['webpack']
        },

        webpack: {
            resolve: { extensions: ['.js', '.jsx'] },
            module: {
                  loaders: [
                      { test: /\.jsx?$/, exclude: /node_modules/, include:/Client/, loader: 'babel-loader' }
                  ]
            },
            externals: {
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            }
        },
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-chrome-launcher'//,
            //'karma-phantomjs-launcher'
        ],
        webpackMiddleware: {
            stats: 'errors-only'
        }
    });
};