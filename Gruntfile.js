module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['public/app/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      styles: {
        files: ['scss/**/*.scss'],
        tasks: ['sass']
      },
      frontend: {
        files: ['public/app/**/*.js'],
        tasks: ['jshint', 'concat']
      }
    }
    concat: {
      dist: {
        src: [
          'public/app/app.js'
        ],
        dest: 'public/dist/built.js'
      }
    },
    sass: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: {
          'public/css/main.css': 'scss/main.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['jshint', 'concat', 'sass']);

};
