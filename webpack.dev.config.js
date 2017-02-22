var path = require("path");
var webpack = require("webpack");


var defaults = {
    target : "development",             // translates to --env.target { 'development' | 'production' }
    run : 'app'                         // translates to --env.run { 'app' | 'tests' }
}


module.exports = (options = defaults) => {

    return {
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/dist/', 
            filename: 'bundle.js'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            host: "localhost",
            port: 8000
        }
    };
};