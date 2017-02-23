var WebPackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var configFunc = require("../webpack.config.js");

// We are using configuration functions, rather than objects since webpack natively supports this. 
// However, when hosted in a node process, we need to parse them ourselves ...
var yargs = require("yargs");
var config = configFunc(yargs.argv.env);
console.log(`The resulting config after applying the env options is ${JSON.stringify(config)}`);

var compiler = webpack(config);
var server = new WebPackDevServer(compiler, {
    hot: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats : { colors: true}
});
server.listen(config.devServer.port, config.devServer.host, function() {});
