const webpackMerge = require("webpack-merge");
const baseConfig = require('./webpack.base.config');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      // Minify js
      new TerserJSPlugin({
        cache: true,
      }),
      // Minify css
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  plugins: []
});
