
module.exports = function (config) {
    config.set({
        basePath: './Client',
        browsers: ['Chrome', 'IE', 'Edge', 'Firefox'],
        singleRun: true, //switch to enable debug
        frameworks: ['jasmine'],
        reporters: ['progress', 'summary'],
        summaryReporter: {
            // 'failed', 'skipped' or 'all'
            show: 'all',
            // Limit the spec label to this length
            specLength: 50,
            overviewColumn: true
        },
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
            'karma-chrome-launcher',
            'karma-summary-reporter',
            'karma-ie-launcher',
            'karma-edge-launcher',
            'karma-firefox-launcher'//,
            //'karma-phantomjs-launcher'
        ],
        webpackMiddleware: {
            stats: 'errors-only'
        }
    });
};