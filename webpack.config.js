var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name].css');
var path = require("path");

var plugins = [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    extractCSS,
    new HtmlWebpackPlugin({
        template: './src/html/index.html',
        filename: 'html/index.html',
        inject: 'body',
        hash: true, // index.js?hash
        cache: true, // if true (default) try to emit the file only if it was changed.
        showErrors: true, // if true (default) errors details will be written into the html page.
        chunks: ['index'] // filter chunks
    })
];

var loaders = [{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["es3ify", "babel"]
    }, {
        test: /\.css$/,
        loader: extractCSS.extract('style', 'css?sourceMap')
    }, {
        test: /\.(png|jpg)$/,
        loader: 'url'
    }, // Font Definitions
    {
        test: /\.svg$/,
        loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]'
    }, {
        test: /\.woff$/,
        loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]'
    }, {
        test: /\.woff2$/,
        loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]'
    }, {
        test: /\.[ot]tf$/,
        loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]'
    }, {
        test: /\.eot$/,
        loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]'
    }, {
        test: /\.modernizrrc$/,
        loader: "modernizr"
    }
];

module.exports = {
    devtool: 'source-map',
    entry: {
        'index': './src/js/index.js'
    },
    output: {
        path: './build',
        filename: '[name].js'
    },
    devServer: {
        progress: true,
        host: '0.0.0.0',
        port: 8080,
        colors: true,
        inline: true,
        hot: true,
        contentBase: './src',
        displayErrorDetails: true
    },
    module: {
        loaders: loaders
    },
    resolve: {
        extensions: ['', '.js', '.json', 'coffee'],
        alias: {
          modernizr$: path.resolve(__dirname, ".modernizrrc")
        }
    },
    plugins: plugins

}
