var path = require("path");
var webpack = require("webpack");
var webpackConfig = require("../webpack.dev.config.js");
var WebpackDevServer = require("webpack-dev-server");

var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {
    hot: true,
    filename: webpackConfig.output.filename,
    publicPath: webpackConfig.output.publicPath,
    stats: { color: true}
});

server.listen(8000, ()=> {});