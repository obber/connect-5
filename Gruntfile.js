var path = require('path');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // env config
    stylesdir: 'src/client/scss',
    clientdist: 'dist/client',
    serverdist: 'dist/server',
    clientsrc: 'src/client',
    serversrc: 'src/server',
    specsrc: 'spec',

    // watch task, used in grunt watch
    watch: {
      styles: {
        files: ['<%= stylesdir %>/**/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['<%= clientsrc %>/**/*.html'],
        tasks: ['copy']
      },
      server: {
        files: ['<%= serversrc %>/**/*.js'],
        tasks: ['babel']
      }
    },

    // used to move src client html to dist
    copy: {
      clientHtml: {
        expand: true,
        cwd: '<%= clientsrc %>/',
        src: '**/*.html',
        dest: '<%= clientdist %>/',
        filter: 'isFile'
      }
    },

    // for sass
    sass: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: {
          '<%= clientdist %>/main.css': '<%= stylesdir %>/main.scss'
        }
      }
    },

    // for server-side es6
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= serversrc %>',
          src: ['**/*.js'],
          dest: '<%= serverdist %>'
        }]
      }
    },

    // linting
    eslint: {
      server: {
        options: {
          configFile: ".eslint/eslint.server.js"
        },
        files: {
          src: ["<%= serversrc %>/**/*.js"]
        }
      },
      client: {
        options: {
          configFile: ".eslint/eslint.client.js"
        },
        files: {
          src: ["<%= clientsrc %>/**/*.js"]
        }
      },
      spec: {
        options: {
          configFile: ".eslint/eslint.spec.js"
        },
        files: {
          src: ["<%= specsrc %>/**/*.js"]
        }
      }
    }
  });

  // webpack
  grunt.config('webpack', require("./webpack.config.js"));

  grunt.registerTask('default', ['copy', 'sass']);
  grunt.registerTask('build', ['eslint', 'copy', 'sass', 'babel', 'webpack:client']);
  grunt.registerTask('buildProd', ['eslint', 'copy', 'sass', 'babel', 'webpack:production']);

};
