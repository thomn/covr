const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {getAliases} = require('./utils');

const ROOT = resolve(__dirname, '..');
const ALIASES = getAliases(ROOT);

module.exports = {
    entry: './packages/frontend/index.tsx',
    resolve: {
        alias: {
            ...ALIASES,
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    context: resolve(__dirname, '..', '..', '..'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'covr',
        }),
    ],
};
