// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
    context: __dirname,
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 9000,
    },
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
        sourceMapFilename: "[name].js.map"
    },
    resolve: {
        fallback: { "https": false, "zlib": false, "http": false, "url": false },
        mainFiles: ['index', 'Cesium']
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ,'source-map-loader']
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'url-loader' ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
                { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
                { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
                { from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' },
                { from: path.join(".", 'public'), to: 'public' }
            ]
        }),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('')
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map"
        }),
    ],
    mode: 'development',
    devtool: 'source-map',
};
