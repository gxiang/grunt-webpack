const webpackConfig = require('./webpack.config');

var config = {
  source: './app',
  destination: './dist',
  template: './src/templates'
};

module.exports = function(grunt) {
  // grunt.loadNpmTasks('grunt-load-options');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-assemble');

  grunt.initConfig({
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: true }, webpackConfig)
    },
    assemble: {
      options: {
        // assets: 'assets',
        plugins: ['permalinks'],
        partials: [config.template + '/includes/**/*.hbs'],
        layoutdir: config.template + '/layouts',
        // layouts: ['**/*.hbs'],
        data: [config.template + '/data/*.{json,yml}'],
        flatten: true,
        expand: true
      },
      pages: {
        files: [
          {
            expand: true,
            cwd: config.template + '/pages/',
            src: '**/*.hbs',
            dest: config.source,
            ext: '.html'
          }
        ]
      }
    },
    watch: {
      assemble: {
        files: ['./src/templates/**/*.hbs'],
        tasks: ['assemble']
      },
      webpack: {
        files: ['./app/**/*'],
        tasks: ['webpack']
      }
    }
  });

  grunt.registerTask('default', [
    'assemble',
    'webpack',
    'watch'
  ]);
};