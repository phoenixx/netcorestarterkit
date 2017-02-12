call npm install
del "wwwroot/dist/*.*"
node node_modules/webpack/bin/webpack.js --config webpack.config.vendor.js --env.prod
node node_modules/webpack/bin/webpack.js --env.prod