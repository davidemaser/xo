module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'skeleton/js/<%= pkg.name %>.js',
                dest: 'skeleton/dist/js/<%= pkg.name %>.min.js'
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
                files: '**/*.js',
                tasks: ['jshint','uglify'],
                options: {
                    debounceDelay: 250
                }
            },
            css: {
                files: '**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-dev-update');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // Default task(s).
    grunt.registerTask('default', ['devUpdate','uglify','sass','htmlmin']);

};