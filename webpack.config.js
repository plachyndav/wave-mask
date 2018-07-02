var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var process = require('process');
var webpack = require('webpack');

var mode = process.env.NODE_ENV || 'development';
var isDev = mode === 'development';

var styleRules = [
    { loader: 'css-loader' },
    {
        loader: 'postcss-loader',
        options: {
            plugins: [
                autoprefixer('last 2 versions', 'ie 10')
            ]
        }
    },
    { loader: 'sass-loader' }
];

var plugins = [
    new HTMLWebpackPlugin({
        template: path.join(__dirname, 'src/index.html')
    })
];

module.exports = {
    mode: mode,
    entry: [path.join(__dirname, 'src/index.js'), path.join(__dirname, 'src/styles.scss')],
    output: {
        path: path.join(__dirname, 'dist')
    },
    devServer: {
        hot: true,
        inline: true,
        open: true,
        contentBase: path.join(__dirname, 'src'),
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: isDev ? [
                    { loader: 'style-loader' }
                ].concat(styleRules) : ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: styleRules
                })
            },
            {
                test: /\.((svg)|(ttf)|(woff)|(eot))$/,
                use: [
                    { loader: 'file-loader' }
                ]
            }
        ]
    },
    plugins: isDev ? plugins.concat(
        new webpack.HotModuleReplacementPlugin()
    ) : plugins.concat([
        new ExtractTextWebpackPlugin('styles.css')
    ])
}