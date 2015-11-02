'use strict';
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /*watch - watch the files for modification and trigger the build*/
    watch: {
      options: {
        livereload: true,
      },
      src: {
        files: [
        'src/**/*.*',
        ],
        tasks: ['build']
      },

      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

  /*connect - open server at localhost and liveupdate contents*/
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
      },
      livereload: {
        options: {
          open: true,
          base: 'deploy'
        }
      }
    },

  /*copy - copy index.html to deploy folder*/
    copy: {
      build: {
        cwd: 'src',
        src: [ 'index.html' ],
        dest: 'deploy/',
        expand: true
      }
    },

    /*clean - clean the deploy directory*/
    clean: {
      build: {
        src: [ 'deploy' ]
      },
    },

    /*concat - concat all js/css files into single file*/
    concat: {
      options: {
        separator: ';'
      },
      appjs: {
        src: ['src/**/*.js'],
        dest: 'deploy/js/app.js'
      },
      appcss: {
        src: ['src/**/*.css'],
        dest: 'deploy/css/app.css'
      },

      bowercss: {
        src: ['bower_components/**/*.css'],
        dest: 'deploy/css/bower.css'
      },
    },

    /*bower_concat - concat all js files inside bower_components directory*/
    bower_concat: {
      all: {
        dest: 'deploy/js/bower.js',
      }
    },

    /*ngtemplates - put all html files into templateCache and generate as single js file*/
    ngtemplates: {
      options: {
        base: "deploy",
        module: "demoapp",
      },
      app:        {
        src:      'src/**/*.html',
        dest:     'deploy/js/templates.js'
      }
    }

  });

grunt.registerTask('build', [
  'clean',
  'concat',
  'bower_concat',
  'ngtemplates',
  'copy'
  ]);

grunt.registerTask('default', [
  'build',
  'connect',
  'watch'
  ]);

};