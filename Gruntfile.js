module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    // Default task(s).
    grunt.registerTask('default', ['uglify','sass']);

};