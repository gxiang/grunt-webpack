var path = require('path');
var webpack = require('webpack');

var isProd = process.env.NODE_ENV === 'production';
 
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HandlebarsPlugin = require('handlebars-webpack-plugin');

var bootstrapEntryPoints = require('./webpack.bootstrap.config');

var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;
var bootstrapConfig = bootstrapEntryPoints.prod;


var config = {
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
      {
        test: /\.html$/,
        loaders: ['html-loader']
      },
      { test: /\.(woff2?)$/, use: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
      { test: /\.(ttf|eot)$/, use: 'file-loader?name=fonts/[name].[ext]' },
      // Bootstrap 3
      { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, use: 'imports-loader?jQuery=jquery' }
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
    // new webpack.LoaderOptionsPlugin({
    //   // Options...
    //   minimize: true
    // })
    // new HandlebarsPlugin({
    //   // path to hbs entry file(s)
    //   entry: path.join(process.cwd(), "src", "templates", "pages", "*.hbs"),
    //   // output path and filename(s)
    //   // if ommited, the input filepath stripped of its extension will be used
    //   output: path.join(process.cwd(), "dist", "[name].html"),
    //   // data passed to main hbs template: `main-template(data)`
    //   data: require("./src/templates/data/project.json"),

    //   // globbed path to partials, where folder/filename is unique
    //   partials: [
    //       path.join(process.cwd(), "src", "templates", "includes", "*", "*.hbs")
    //   ],

    //   // register custom helpers. May be either a function or a glob-pattern
    //   // helpers: {
    //   //     nameOfHbsHelper: Function.prototype,
    //   //     projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
    //   // },

    //   // hooks
    //   onBeforeSetup: function (Handlebars) {},
    //   onBeforeAddPartials: function (Handlebars, partialsMap) {},
    //   onBeforeCompile: function (Handlebars, templateContent) {},
    //   onBeforeRender: function (Handlebars, data) {},
    //   onBeforeSave: function (Handlebars, resultHtml, filename) {},
    //   onDone: function (Handlebars, filename) {}
    // })
  ],

  cache: false,
  // watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    poll: true,
    poll: 500
  }
};