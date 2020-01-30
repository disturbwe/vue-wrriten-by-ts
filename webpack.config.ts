const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath('css/[name].css').replace('css/js', 'css');
    },
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    optimization: {//优化项
        minimizer: [
            new UglifyJsPlugin({
                cache: true,//缓冲
                parallel: true, //并发打包,一次打包多个
                sourceMap: true,//源码调试
            })
        ]
    },
    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/index.ts",
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].js',
        chunkFilename: "js/[name].[chunkhash].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '构建Vue',
            template: __dirname + '/index.html',
        }),
        extractSass,
        new webpack.optimize.AggressiveSplittingPlugin({
            minSize: 30000,
            maxSize: 50000
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // 在开发环境使用 style-loader
                    fallback: "style-loader"
                })
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        hot: true,
    }
}