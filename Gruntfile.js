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
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json','Gruntfile.js'],
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
                    updateType: 'report', //just report outdated packages 
                    reportUpdated: false, //don't report up-to-date packages 
                    semver: true, //stay within semver when updating 
                    packages: {
                        devDependencies: true, //only check for devDependencies 
                        dependencies: false
                    },
                    packageJson: null, //use matchdep default findup to locate package.json 
                    reportOnlyPkgs: [] //use updateType action on all packages 
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
        jsbeautifier : {
            files : ["skeleton/js/*.js"],
            options : {
            }
        },
        sass: {
            options: {
                outputStyle: 'compressed',
                sourceMap: false
            },
            dist: {
                files: {
                    'skeleton/dist/css/<%= pkg.name %>.min.css': 'skeleton/sass/<%= pkg.name %>.scss'
                }
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'skeleton/examples/dist/index.html': 'skeleton/examples/index.html'
                }
            },
            dev: {                                       // Another target
                files: {
                    'skeleton/examples/dist/index.html': 'skeleton/examples/index.html'
                }
            }
        },
        watch: {
            scripts: {
                files: 'skeleton/js/*.js',
                tasks: ['jshint','uglify'],
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
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-dev-update');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // Default task(s).
    grunt.registerTask('default', ['devUpdate','jshint','uglify','jsbeautifier','sass','htmlmin','watch']);
    grunt.registerTask( 'build', ['devUpdate','jshint','uglify','jsbeautifier','sass','htmlmin','bump','watch']);

};