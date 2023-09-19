const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {

    entry: './app/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/basic_crud'
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './app/index.html'
        }),
        new BundleAnalyzerPlugin(),
        new CompressionPlugin(),        
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