const {resolve} = require('path');
const {merge} = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        filename: 'js/bundle.[contenthash].min.js',
        path: resolve(__dirname, '../../dist'),
        publicPath: '/',
    },
    devtool: 'source-map',
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
});
