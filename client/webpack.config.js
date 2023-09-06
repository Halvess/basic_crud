const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack = require('webpack')
const dotenv = require('dotenv')

const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {

    entry: './app/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './app/index.html'
        }),
        new webpack.DefinePlugin(envKeys),
        new BundleAnalyzerPlugin(),
    ],

    devServer:{
        port: 3000,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}]]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: 'file-loader'
            }
        ]
    }

}