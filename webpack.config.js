/* eslint-disable quotes */
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/index.js", "./public/assest/styles/main.scss"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./public/dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader'

    },
    { test: /\.css$/, loader: 'style-loader!css-loader' },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
    { test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader", options: {
            limit: 100000,
            name: './images/[name].[ext]'
        }
    },
    {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
    }, {
        test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    publicPath: '/public/assets/',
                    name: '[name].[ext]'
                }
            }
        ]
    },
    {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
            publicPath: '/public/assets/',
            name: './fonts/[name].[hash].[ext]'
        }
    },
      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "babel-loader",
        options: {
          presets: ["react", "stage-0", "es2015"],
          plugins: ["transform-class-properties", "transform-decorators-legacy"]
        }
      }
    ]
  },
  devServer: {
    contentBase: "./public/",
    watchContentBase: true
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
