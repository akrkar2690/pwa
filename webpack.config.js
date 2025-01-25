const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.jsx?$/, // Transpile JSX and JavaScript files
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // Handle .css files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/, // Handle .scss files
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true, // Enable hot module replacement if you want it
    compress: false, // Enable gzip compression
    historyApiFallback: true, // Useful for single-page apps (SPA)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true, // Claim clients immediately after service worker activation
      skipWaiting: true, // Skip waiting and activate the new worker immediately
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 10,
            },
          },
        },
        {
          urlPattern: /\/$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages',
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './manifest.json', // Copy your manifest file to the dist folder
          to: 'manifest.json',
        },
        {
            from: './src/assets', // Copy your manifest file to the dist folder
            to: 'src/assets',
          },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
};
