// register env variables
require('dotenv').config();
const path = require('path');
// writes outputted files to a json file to be read
const WebpackAssetsManifest = require('webpack-assets-manifest');

// due to webpack css hashing issue
const WebpackMd5Hash = require('webpack-md5-hash');

// similiar to extract text plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// environmental options provided by .env file
const PORT = process.env.PORT;
const SYNC_ENABLED = process.env.SYNC_ENABLED !== 'false';

// export as a function to pass context
module.exports = (env, argv) => {
    var prod = argv.mode === 'production';

    const webpackObject = {
        entry: { main: __dirname + '/webpack/wwwroot/js/site.js' },
        output: {
            path: path.resolve(__dirname + '/webpack/wwwroot', 'dist'),
            filename: prod ? '[name].[chunkhash].js' : 'main.js'
        },
        devtool: prod ? '' : 'cheap-module-eval-source-map',
        module: {
            rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: {
                    loader: 'vue-loader'
                }
            },
            ]
        },
        resolve: {
            alias: {
                vue: prod ? 'vue/dist/vue.min' : 'vue/dist/vue.js',
                $: "jquery",
                jquery: "jQuery",
                "window.jQuery": "jquery"
            },
            extensions: ['*', '.js', '.vue'],
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    'vendor': {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: "initial",
                    },
                    'main': {
                        test: __dirname + '/webpack/wwwroot/js/',
                        name: 'main',
                        chunks: "all",
                    }
                }
            }
        },
        plugins: [ 
        new MiniCssExtractPlugin({
            filename: prod ? 'style.[contenthash].css' : 'style.css',
        }),
        new WebpackMd5Hash(),

        ],
        performance: { hints: false },
    };

    if (!prod && SYNC_ENABLED) {
        webpackObject.plugins.push(new BrowserSyncPlugin({
            host: 'localhost',
            port: PORT,
            proxy: `http://localhost:${PORT}`
        }));

    }

    if (true) {
        webpackObject.plugins.push(new WebpackAssetsManifest({
            output: 'manifest.json',
            space: 2,
            writeToDisk: false,
            assets: {},
            replacer: require('./format'),
        }));
    }

    return webpackObject;
};