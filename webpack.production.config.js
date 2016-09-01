var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");

var extractCSS = new ExtractTextPlugin('[name].css');

var plugins = [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    extractCSS,
    new CopyWebpackPlugin([
        // Copy directory contents to {output}/
        {
            from: 'src/images',
            to: 'images'
        }
    ]),
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
        loader: extractCSS.extract('style', 'css')
    }, {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=1&name=images/[name].[ext]'
    }, // Font Definitions
    {
        test: /\.svg$/,
        loader: 'url?limit=1&mimetype=image/svg+xml&name=fonts/[name].[ext]'
    }, {
        test: /\.woff$/,
        loader: 'url?limit=1&mimetype=application/font-woff&name=fonts/[name].[ext]'
    }, {
        test: /\.woff2$/,
        loader: 'url?limit=1&mimetype=application/font-woff2&name=fonts/[name].[ext]'
    }, {
        test: /\.[ot]tf$/,
        loader: 'url?limit=1&mimetype=application/octet-stream&name=fonts/[name].[ext]'
    }, {
        test: /\.eot$/,
        loader: 'url?limit=1&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]'
    }, {
        test: /\.modernizrrc$/,
        loader: "modernizr"
    }
];

module.exports = {
    entry: {
        'index': './src/js/index.js'
    },
    output: {
        path: __dirname + "/build",
        filename: "[name].js"
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
