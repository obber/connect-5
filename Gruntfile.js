module.exports = function(grunt) {

  grunt.initConfig({
    stylesdir: 'client/scss',
    distdir: 'client/dist',
    jshint: {
      files: ['client/app/**/*.js'],
      options: {
        globals: {
          jQuery: true
        },
        esversion: 6
      }
    },
    watch: {
      styles: {
        files: ['<%= stylesdir %>/**/*.scss'],
        tasks: ['sass']
      },
      html:  {
        files: ['client/index.html'],
        tasks: ['concat']
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['jshint', 'concat', 'sass']);

};
