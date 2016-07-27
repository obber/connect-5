module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['public/app/**/*.js'],
      options: {
        globals: {
          jQuery: true
        },
        esversion: 6
      }
    },
    watch: {
      styles: {
        files: ['scss/**/*.scss'],
        tasks: ['sass']
      }
    },
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
          'public/dist/main.css': 'scss/main.scss'
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
