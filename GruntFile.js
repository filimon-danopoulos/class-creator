module.exports = function(grunt) {
    /*
     * Load all NPM dependencies
     * */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-mocha-test');

    /*
     * Configure NPM dependencies for the project
     * */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /* grunt-contrib-concat configuration */
        concat: {
            /*
             * Concatenates all third party script into a file called lib.js.
             * This is so that the index.html file can be agnostic of what libraries are used.
             * */
            'thirdparty-js-dev': {
                src: [
                    // Have to specifiy angular separately since it is a dependency and has to be loaded first
                    'build/app/public/thirdparty/angular/angular.js',
                    'build/app/public/thirdparty/**/*.js'
                ],
                dest: 'build/app/public/thirdparty/vendor.js',
                options: {
                    sourceMap: true
                }
            },
            'app-js-dev': {
                src: [
                    'build/app/public/scripts/Main.js',
                    'build/app/public/scripts/**/*.js',
                    '!build/app/public/scripts/App.js',
                    'build/app/public/scripts/App.js'
                ],
                dest: 'build/app/public/scripts/bundle.js'
            }
        },
        /* grunt-contrib-copy configuration */
        copy: {
            /*
             * Copies all the public static client content for development
             * */
            'js-dev': {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*', '!**/*.ts'],
                    dest: 'build/'
                }]
            },
            /*
             * Copies all the thrird party libraries managed by bower.
             * */
            'client-bower-dev': {
                files: [{
                    expand: true,
                    cwd: 'bower_components/angular/',
                    src: ['angular.js'],
                    dest: 'build/app/public/thirdparty/angular/'
                }, {
                    expand: true,
                    cwd: 'bower_components/angular-route/',
                    src: ['angular-route.js'],
                    dest: 'build/app/public/thirdparty/angular/'
                }, {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: [
                        'css/bootstrap-theme.css',
                        'css/bootstrap-theme.css.map',
                        'css/bootstrap.css',
                        'css/bootstrap.css.map',
                        'fonts/*'],
                    dest: 'build/app/public/thirdparty/bootstrap/'
                }]
            }
        },
        /* grunt-mocha-test configuration */
        mochaTest: {
            /*
             * Runs all library tests and reports the result in a dot-matrix.
             * */
            'short-output': {
                options: {
                    reporter: 'dot',
                    clearRequireCache: true
                },
                src: ['build/test/**/*.js']
            },
            /*
             * Runs all library test and reports the result as a BDD spec.
             * */
            'long-output': {
                options: {
                    reporter: 'spec',
                    clearRequireCache: true
                },
                src: ['build/test/**/*.js']
            }
        },
        /* grunt-contrib-clean configuration */
        clean: {
            /*
             * Removes the build folder.
             * */
            build: {
                src: [ 'build/' ],
                force: true
            }
        },
        /* grunt-nodemon configuration */
        nodemon: {
            /*
             * Monitors the dev build server folder for javascript changes and restarts the node process.
             * */
            'serve-dev': {
                script: 'server.js',
                options: {
                    cwd: 'build/app/',
                    ignore: ['node_modules/**'],
                    delay: 500,
                    ext: 'js'
                }
            }
        }
    });

    /* Default task */
    grunt.registerTask('default', ['test-verbose']);

    /* Main tasks */
    grunt.registerTask('serve', ['build-dev', 'nodemon:serve-dev']);
    grunt.registerTask('test', ['test-verbose']);

    /* Test tasks */
    grunt.registerTask('test-verbose', ['build-dev', 'mochaTest:long-output']);
    grunt.registerTask('test-succint', ['build-dev', 'mochaTest:short-output']);

    /* Build tasks */
    grunt.registerTask('build-dev', [
        'clean:build',
        'copy-dev',
        'concat:thirdparty-js-dev',
        'concat:app-js-dev'
    ]);
    /* Copying tasks */
    grunt.registerTask('copy-dev', [
        'copy:js-dev',
        'copy:client-bower-dev'
    ]);

};
