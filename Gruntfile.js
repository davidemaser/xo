/*
don't know how to setup grunt ?
1. make sure node is installed
2. make sure npm is installed and up to date $npm update -g npm
3. install grunt cli $npm install -g grunt-cli
4. Install the project dependencies using $npm install
5. run grunt $grunt

You can extend this gruntfile by adding more grunt plugins
as needed.

Run grunt bump to update the version and push projects to git
 */

(function() {
  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      bump: {
        options: {
          files: ['package.json'],
          updateConfigs: [],
          commit: true,
          commitMessage: 'Release v%VERSION%',
          commitFiles: ['package.json', 'Gruntfile.js'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'https://github.com/davidemaser/xo.git',
          gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
          globalReplace: false,
          prereleaseName: false,
          metadata: '',
          regExp: false
        }
      },
      devUpdate: {
        main: {
          options: {
            updateType: 'report',
            reportUpdated: false,
            semver: true,
            packages: {
              devDependencies: true,
              dependencies: false
            },
            packageJson: null,
            reportOnlyPkgs: []
          }
        }
      },
      jshint: {
        all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> last updated <%= grunt.template.today("yyyy-mm-dd") %> by <%= pkg.author %> */\n'
        },
        build: {
          src: 'skeleton/js/<%= pkg.name %>.js',
          dest: 'skeleton/dist/js/<%= pkg.name %>.min.js'
        }
      },
      jsbeautifier: {
        files: ['skeleton/js/*.js'],
        options: {}
      },
      sass: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false
        },
        dist: {
          files: {
            'skeleton/dist/css/<%= pkg.name %>.min.css': 'skeleton/scss/<%= pkg.name %>.scss'
          }
        }
      },
      htmlmin: {
        dist: {
          options: {
            removeComments: true,
            collapseWhitespace: true
          },
          files: {
            'skeleton/examples/dist/index.html': 'skeleton/examples/index.html'
          }
        },
        dev: {
          files: {
            'skeleton/examples/dist/index.html': 'skeleton/examples/index.html'
          }
        }
      },
      watch: {
        scripts: {
          files: 'skeleton/js/*.js',
          tasks: ['jshint', 'uglify'],
          options: {
            debounceDelay: 250
          }
        },
        css: {
          files: 'skeleton/sass/*.scss',
          tasks: ['sass'],
          options: {
            livereload: true
          }
        }
      }
    });
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-dev-update');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.registerTask('default', ['devUpdate', 'jshint', 'uglify', 'jsbeautifier', 'sass', 'htmlmin', 'watch']);
    grunt.registerTask('build', ['devUpdate', 'jshint', 'uglify', 'jsbeautifier', 'sass', 'htmlmin', 'bump', 'watch']);
  };

}).call(this);

//# sourceMappingURL=Gruntfile.js.map
