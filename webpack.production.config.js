var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('[name].css');

var plugins = [
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
        }, {
            from: 'src/fonts',
            to: 'fonts'
        }
    ]),
    new HtmlWebpackPlugin({
        template: './src/html/index.html',
        filename: 'html/index.html',
        inject: 'body',
        hash: true, // index.js?hash
        cache: true, // if true (default) try to emit the file only if it was changed.
        showErrors: true, // if true (default) errors details will be written into the html page.
        chunks: ['js/index'] // filter chunks
    })
];

var loaders = [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
    }, {
        test: /\.css$/,
        loader: extractCSS.extract('style', 'css')
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
    }
];

module.exports = {
    entry: {
        'js/index': './src/js/index.js'
    },
    output: {
        path: __dirname + "/build",
        filename: "[name].js"
    },
    module: {
        loaders: loaders
    },
    resolve: {
        extensions: ['', '.js', '.json', 'coffee']
    },
    plugins: plugins

}
