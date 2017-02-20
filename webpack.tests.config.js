var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './tests/index.js',
    output: {
        filename: 'test.build.js',
        path: path.join(__dirname, 'tests'),
        publicPath: 'http://localhost:8001/tests'
    },
    plugins: [
        new HtmlWebpackPlugin({
            cache: true,
            filename: path.join(__dirname, "tests/index.html"),
            showErrors: true,
            template: "tests/support/index-template.html",
            title: "Mocha browser test"
        })
    ],
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /(\.css|\.less)$/,
                loader: 'null-loader',
                exclude: [
                    /build/
                ]
            },
            {
                test: /(\.jpg|\.jpeg|\.png|\.gif)$/,
                loader: 'null-loader'
            }
        ]
    },
    devServer: {
        host: "localhost",
        port: 8001
    }
};