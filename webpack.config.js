let path = require('path');
let webpack = require('webpack');

let isProd = process.env.NODE_ENV === 'production';

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HandlebarsPlugin = require('handlebars-webpack-plugin');

let bootstrapEntryPoints = require('./webpack.bootstrap.config');

// let bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;
let bootstrapConfig = bootstrapEntryPoints.prod;

let config = {
  source: './app',
  destination: './dist'
};

module.exports = {
  entry: {
    app: [ config.source + '/js/app.js' ]
    , css: [ bootstrapConfig, config.source + '/scss/main.scss' ]
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  // loaders: [
  //   {
  //     test: /\.(jpe?g|png|gif|svg)$/i,
  //     loaders: [
  //         'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
  //         'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
  //     ]
  //   }
  // ],

  module: {
    rules: [
      /*
      your other rules for JavaScript transpiling go in here
      */
      { // regular css files
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1',
        }),
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        // loaders: ['file-loader?name=[name].[ext]'],
        loaders: ['file-loader?name=[name].[ext]&outputPath=images/'],
        // loaders: ['file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/'],
      },
      { test: /\.html$/, loaders: ['html-loader'] },
      { test: /\.(woff2?)$/, loaders: ['url-loader?limit=10000&name=fonts/[name].[ext]'] },
      { test: /\.(ttf|eot)$/, loaders: ['file-loader?name=fonts/[name].[ext]'] },
      // Bootstrap 3w
      { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loaders: ['imports-loader?jQuery=jquery'] }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      // $: 'jquery',
      // jQuery: 'jquery'
    }),
    new ExtractTextPlugin({
      filename: 'css/main.bundle.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      xhtml: true
      , filename: 'index.html'
      , template: 'app/index.html'
    }),
    new HtmlWebpackPlugin({
      xhtml: true
      , filename: 'assemble.html'
      , template: 'app/assemble.html'
    }),
    new HtmlWebpackPlugin({
      xhtml: true
      , filename: 'bootstrap.html'
      , template: 'app/bootstrap.html'
    })
  ],

  cache: false,
  // watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    poll: true,
    poll: 500
  }
}