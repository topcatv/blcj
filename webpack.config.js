var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
        // Copy directory contents to {output}/
        {
            from: 'src/images',
            to: 'images'
        }
    ])
];

plugins.push(
    new HtmlWebpackPlugin({
        template: './src/html/index.html',
        filename: 'html/index.html',
        inject: 'body',
        hash: true, // index.js?hash
        cache: true, // if true (default) try to emit the file only if it was changed.
        showErrors: true, // if true (default) errors details will be written into the html page.
        chunks: ['js/index'] // filter chunks
    })
);

var loaders = [{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader"
}, {
    test: /\.css$/,
    loader: "style-loader!css-loader"
}, {
    test: /\.(png|jpg)$/,
    loader: 'url-loader'
}];

module.exports = {
    entry: {
        'js/index': './src/js/index.js'
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
        extensions: ['', '.js', '.json', 'coffee']
    },
    plugins: plugins

}
