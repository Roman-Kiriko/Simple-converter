const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const cssLoader = function(loader) {
   const loaders = [
    MiniCSSExtractPlugin.loader,
    'css-loader'
]
    if (loader) {
        loaders.push(loader);
    }
    return loaders;
}

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            vue$ : path.resolve(__dirname, 'node_modules/vue/dist/vue.js'),
        }
    },
    devServer: {
        port: 3000,

    },
    plugins: [new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCSSExtractPlugin()
    ],
    module: {
        rules: [{
            test: /\.s[ac]ss$/,
            use: cssLoader('sass-loader')
        },
        {
            test: /\.css$/,
            use: cssLoader()
        },
        {
            test: /\.(jpg|png|svg|gif|jpeg)$/,
            use: 'file-loader',
        }
    ]
    }
};