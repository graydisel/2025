const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    target: 'web',
    devtool: !isProd ? 'source-map' : false,
    devServer: {
        port: 5800,
        hot: false
    },
    entry: {
        main: './index.js',
        stat: './statistics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProd ? '[name].bundle.[contenthash].js' : '[name].js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            title: 'Book Store',
            chunks: ['main', 'stat']
        }),
        new HTMLWebpackPlugin({
            filename: 'about.html',
            template: path.resolve(__dirname, 'src/about.html'),
            title: 'About!',
            chunks: ['main', 'stat']
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/images/favicon.svg'),
                    to: path.resolve(__dirname, 'dist'),
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: isProd ? '[name].[contenthash].min.css' : '[name].min.css',
        }),
        new EslintWebpackPlugin({
            extensions: ['js, jsx'],
            fix: false,
            configType: 'eslintrc'
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.jsx?$/, //
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }

        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
            new TerserPlugin()
        ]
    }
};