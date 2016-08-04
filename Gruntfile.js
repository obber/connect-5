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
        files: ['client/index.html'],
        tasks: ['concat']
      },
      client: {
        files: ['<%= clientsrc %>/**/*.js'],
        tasks: ['webpack']
      },
      server: {
        files: ['<%= serversrc %>/**/*.js'],
        tasks: ['babel']
      }
    },

    // only used to move src client html to dist
    concat: {
      html: {
        src: ['<%= clientsrc %>/index.html'],
        dest: '<%= clientdist %>/index.html'
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

    // for babel
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

    // webpack
    webpack: {
      client: {
        entry: [
          "./<%= clientsrc %>/js/app.js"
        ],
        output: {
          path: "<%= clientdist %>",
          filename: "bundle.js"
        },
        resolve: {
          extensions: ['', '.js', '.jsx']
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel',
              query: {
                presets: ['es2015', 'stage-0', 'react']
              }
            }
          ]
        },
        exclude: '/node_modules/'
      }
    },

    // linting
    eslint: {
      server: {
        options: {
          configFile: ".grunt/eslint.server.js"
        },
        files: {
          src: ["<%= serversrc %>/**/*.js"]
        }
      },
      client: {
        options: {
          configFile: ".grunt/eslint.client.js"
        },
        files: {
          src: ["<%= clientsrc %>/**/*.js"]
        }
      },
      spec: {
        options: {
          configFile: ".grunt/eslint.spec.js"
        },
        files: {
          src: ["<%= specsrc %>/**/*.js"]
        }
      }
    }
  });

  grunt.registerTask('default', ['concat', 'sass']);
  grunt.registerTask('build', ['eslint', 'concat', 'sass', 'babel', 'webpack']);

};
