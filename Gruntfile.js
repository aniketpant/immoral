'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('immoral.jquery.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },
    qunit: {
      all: {
        options: {
          urls: ['1.6.4', '1.10.0'].map(function(version) {
            return 'http://localhost:<%= connect.server.options.port %>/test/immoral.html?jquery=' + version;
          })
        }
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    coffee: {
      compile: {
        files: {
          'src/jquery.immoral.js': 'src-coffee/jquery.immoral.coffee', // 1:1 compile
          'test/test.js': 'src-coffee/test/test.coffee', // 1:1 compile
        }
      },
      compileBare: {
        options: {
          bare: true
        },
        files: {
          'src/jquery.immoral.js': 'src-coffee/jquery.immoral.coffee', // 1:1 compile
          'test/test.js': 'src-coffee/test/test.coffee', // 1:1 compile
        }
      },
      compileJoined: {
        options: {
          join: true
        },
        files: {
          'src/jquery.immoral.js': 'src-coffee/jquery.immoral.coffee', // 1:1 compile
          'test/test.js': 'src-coffee/test/test.coffee', // 1:1 compile, identical output to join = false
        }
      },
      compileWithMaps: {
        options: {
          sourceMap: true
        },
        files: {
          'src/jquery.immoral.js': 'src-coffee/jquery.immoral.coffee', // 1:1 compile
        }
      },
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: 'src-coffee/',
        src: ['**/*.coffee'],
        dest: 'src/',
        ext: '.js'
      }
    },
    watch: {
      coffee: {
        files: ['src-coffee/**/*.coffee'],
        tasks: ['coffee:compile']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test']
      },
    },
    connect: {
      server: {
        options: {
          port: 8085 // This is a random port, feel free to change it.
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['connect', 'coffee:compile', 'jshint', 'qunit', 'clean', 'concat', 'uglify']);

  // Test task.
  grunt.registerTask('test', ['connect', 'jshint', 'qunit']);

};
