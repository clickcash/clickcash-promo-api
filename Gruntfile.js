'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      client: {
        src: ['index.js'],
        dest: 'dist/clickcash-promo-api.js',
        options: {
          browserifyOptions: {
            standalone: 'Clickcash.promo'
          }
        }
      }
    },
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <%= pkg.version %> */\n'
            },
      my_target : {
                files: {
                    'dist/<%= pkg.name %>.min.js' : ['dist/clickcash-promo-api.js'],
                    '<%= pkg.name %>.min.js' : ['dist/clickcash-promo-api.js'],
                }
            }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      beforeconcat: ['lib/**/*.js']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['browserify', 'uglify', 'jshint']);

};