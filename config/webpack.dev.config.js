const path = require("path");
const webpack = require("webpack");
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = webpackMerge(baseConfig, {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    publicPath: "/",
    hotOnly: true,
    historyApiFallback: true,
    // proxy: {
    //   '/api': 'http://localhost:3000'
    // },
    after: function(app, server, compiler) {
      app.get('/api/user', function(req, res) {
        res.json({ id: 1, name: 'ChardLau', age: 16 });
      });
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
});
