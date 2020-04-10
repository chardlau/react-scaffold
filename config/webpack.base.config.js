const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Use of mini-css-extract-plugin loader to extra css into files in production, otherwise use style-loader
const extraCssLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const plugins = [
  // Inject assets into index.html automatically
  new HtmlWebpackPlugin({ template: path.resolve(__dirname, '../template/index.html') }),
];
if (isProduction) {
  // Cleaning up the '/dist' folder if currently is production build
  plugins.unshift(new CleanWebpackPlugin());
  // Extract css into files
  plugins.push(new MiniCssExtractPlugin({
    filename: '[name].[hash:6].css',
    chunkFilename: '[name].[hash:6].css'
  }))
}

module.exports = {
  module: {
    rules: [
      {
        // js and jsx
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                'targets': '> 0.25%, not dead'
              }
            ],
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-hot-loader/babel'
          ]
        }
      },
      // module css
      {
        test: /\.m.css$/,
        use: [
          extraCssLoader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]-[local]-[hash:base64:6]'
              },
              sourceMap: true
            }
          }
        ]
      },
      // normal css
      {
        test: /\.css$/,
        exclude: /\.m.css$/,
        use: [
          extraCssLoader,
          'css-loader'
        ]
      },
      // module less
      {
        test: /\.m.less$/,
        use: [
          extraCssLoader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]-[local]-[hash:base64:6]'
              },
              sourceMap: true
            }
          },
          'less-loader'
        ]
      },
      // normal less
      {
        test: /\.less$/,
        exclude: /\.m.less$/,
        use: [
          extraCssLoader,
          'css-loader',
          'less-loader'
        ]
      },
      // images
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:6].[ext]'
        }
      },
      // font
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:6].[ext]'
        }
      },
      // other files
    ]
  },
  resolve: {
    alias: {
      // Replace react-dom for react-hot-loader. Check: [https://github.com/gaearon/react-hot-loader/issues/1227]
      'react-dom': '@hot-loader/react-dom',
      'src': path.resolve(__dirname, '../src')
    },
    extensions: ['*', '.js', '.jsx']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // Split react and react-dom into isolate chunk
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|@hot-loader|react-hot-loader)[\\/]/,
          name: 'react',
          chunks: 'all'
        }
      },
      // Others into common chunk
      name: 'other',
      chunks: 'all',
    },
  },
  entry: {
    main: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/',
    filename: isDevelopment ? '[name].js' : '[name].[hash:6].js',
    chunkFilename: isDevelopment ? '[name].js' : '[name].[hash:6].js',
  },
  plugins: plugins
};
