var path = require('path');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    stylesdir: 'client/scss',
    distdir: 'client/dist',
    clientdir: 'client/src',
    serverdir: 'server/es6',
    watch: {
      styles: {
        files: ['<%= stylesdir %>/**/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['client/index.html'],
        tasks: ['concat']
      },
      client: {
        files: ['<%= clientdir %>/**/*.js'],
        tasks: ['webpack']
      },
      server: {
        files: ['<%= serverdir %>/**/*.js'],
        tasks: ['babel']
      }
    },
    concat: {
      html: {
        src: ['client/index.html'],
        dest: '<%= distdir %>/index.html'
      }
    },
    sass: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: {
          '<%= distdir %>/main.css': '<%= stylesdir %>/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      server: {
        files: [{
          expand: true,
          cwd: 'server/es6/',
          src: ['**/*.js'],
          dest: 'server/es5'
        }]
      }
    },
    eslint: {
      server: {
        options: {
          configFile: ".grunt/.eslintrc.server.js"
        },
        files: {
          src: ["<%= serverdir %>/**/*.js"]
        }
      },
      client: {
        options: {
          configFile: ".grunt/.eslintrc.client.js"
        },
        files: {
          src: ["<%= clientdir %>/**/*.js"]
        }
      }
    }
  });

  grunt.config('webpack', require('./webpack.config.js'));

  grunt.registerTask('default', ['concat', 'sass']);
  grunt.registerTask('build', ['lint', 'concat', 'sass', 'babel', 'webpack']);

};
