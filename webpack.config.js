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
        return this;
    },
    addOutputSection(options) {
        this.config.output = {};
        if (options.run === 'tests') {
            this.config.output = {
                filename: 'test.build.js',
                path: path.join(__dirname, 'tests'),
                publicPath: 'http://localhost:8001/tests'
            };
        }
        else {
            this.config.output = {
                path: path.join(__dirname, 'dist'),
                publicPath: '/dist/', 
                filename: 'bundle.js'
            };
        }
        return this;    
    },

    addPluginsSection(options) {
        this.config.plugins = [];
        this.config.plugins.push(new webpack.HotModuleReplacementPlugin());
        if (options.run === 'tests') {
            this.config.plugins.push(new HtmlWebpackPlugin({
                    cache: true,
                    filename: path.join(__dirname, "tests/index.html"),
                    showErrors: true,
                    template: "tests/support/index-template.html",
                    title: "Mocha browser test"
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

    return configFactory
        .addEntrySection(options)
        .addOutputSection(options)
        .addLoadersSection(options)
        .addPluginsSection(options)
        .addDevToolSection(options)
        .addDevServerSections(options)
        .config;
};

