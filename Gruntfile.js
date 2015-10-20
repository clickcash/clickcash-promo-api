'use strict';

module.exports = function(grunt) { 
  grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            clean: ["dist/clickcashpromoapi"],
            browserify: {
              client: {
                src: ['index.js'],
                dest: 'dist/clickcashpromoapi/<%= pkg.version %>/clickcash-promo-api.js',
                options: {
                  banner: '/* <%= pkg.name %> <%= pkg.version %> Documentation: https://github.com/clickcash/clickcash-promo-api/ */\n',
                  browserifyOptions: {            
                    standalone: 'Clickcash.promo'
                  }
                }
              }
            },
            uglify: {
              options: {
                banner: '/* <%= pkg.name %> <%= pkg.version %> Documentation: https://github.com/clickcash/clickcash-promo-api/ */\n'
                    },
                build : {
                        files: {
                            'dist/clickcashpromoapi/<%= pkg.version %>/clickcash-promo-api.min.js' : ['dist/clickcashpromoapi/<%= pkg.version %>/clickcash-promo-api.js']
                        }
                    }
            },
            jshint: {
              options: {
                jshintrc: true
              },
              beforeconcat: ['lib/**/*.js']
           },
           template: {
                'process-html-template': {
                    'options': {
                            'data': {
                                'title': '<%= pkg.name %>',
                                'version': '<%= pkg.version %>'
                            }
                    },
                    'files': {
                    'examples/browser/index.html': ['lib/browser/example-templates/index.html.tpl'],
                    'README.md': ['lib/common/templates/README.md.tpl'],
                    }
                }
            },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'browserify', 'uglify', 'jshint','template']);

};