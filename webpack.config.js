var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const configFactory = {
    config: {},

    addEntrySection(options) {
        this.config.entry = [];
        if (options.run === 'tests') {
            this.config.entry.push('./tests/index.js');
        }
        else {
            this.config.entry.push('./src/index.js');
        }
        if (options.target !== "production") {
            this.config.entry.push('webpack-hot-middleware/client');
        }
        return this;
    },

    addOutputSection(options) {
        this.config.output = {};
        if (options.run === 'tests') {
            this.config.output = {
                filename: 'test.build.js',
                path: path.join(__dirname, 'tests')
            };
        }
        else {
            this.config.output = {
                path: path.join(__dirname, 'dist'),
                filename: 'bundle.js'
            };
        }
        return this;    
    },

    addPluginsSection(options) {
        this.config.plugins = [];
        if (options.target === "development") {
            this.config.plugins.push(new webpack.HotModuleReplacementPlugin());
        }
        else {
            this.config.plugins.push(new webpack.optimize.UglifyJsPlugin({
                sourceMap: true // option is required to combine uglification and source maps
            }));
        }
        if (options.run === 'tests') {
            this.config.plugins.push(new HtmlWebpackPlugin({
                    cache: true,
                    filename: "index.html",
                    showErrors: true,
                    template: "tests/support/index-template.html",
                    title: "Mocha browser test"
                }));
        } else {
            this.config.plugins.push(new HtmlWebpackPlugin({
                template : "./src/index-template.html",
                filename: "index.html",
                showErrors: true
            }));
        }
        return this;    
    },

    addDevToolSection(options) {
         this.config.devtool = "source-map";
         return this;
    },

    addDevServerSections(options) {
         if (options.run === 'tests') {
            this.config.devServer = {
                host: "localhost",
                port: 8001
            };
        }
        else {
            this.config.devServer = {
                host: "localhost",
                port: 8000
            }
        }
        return this;
    },

    addLoadersSection(options) {
        this.config.module = {};
        this.config.module.loaders = [];
        this.config.module.loaders.push({
                        test: /\.js$/,
                        loaders: ['babel-loader'],
                        exclude: /node_modules/
                    });
        if (options.run === 'tests') {
            this.config.module.loaders.push({
                        test: /(\.css|\.less)$/,
                        loader: 'null-loader',
                        exclude: [
                            /build/
                        ]
                    });
        }
        return this;
    }
};

const optionsDefaults = {
    target : 'development',
    run: 'app'
}

module.exports = function (options = optionsDefaults) {

    if (options.target === "production")
        process.env.NODE_ENV = "production";

    return configFactory
        .addEntrySection(options)
        .addOutputSection(options)
        .addLoadersSection(options)
        .addPluginsSection(options)
        .addDevToolSection(options)
        .addDevServerSections(options)
        .config;
};


