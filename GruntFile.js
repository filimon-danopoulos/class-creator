module.exports = function(grunt) {
    /**
     * Load all NPM dependencies
     **/
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    /**
     * Configure NPM dependencies for the project
     **/
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /* grunt-contrib-copy configuration */
        copy: {
            /*
             * Copies all the thrird party libraries managed by bower.
             * */
            'thirdparty-misc-dev': {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist/',
                    src: [
                        'css/bootstrap-theme.css.map',
                        'css/bootstrap.css.map',
                        'fonts/*'
                    ],
                    dest: 'src/app/public/thirdparty/'
                }]
            }
        },
        /* grunt-contrib-concat configuration */
        concat: {
            /**
             * Concatenates all third party script into a file called lib.js.
             * This is so that the index.html file can be agnostic of what libraries are used.
             **/
            'thirdparty-js-dev': {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/toastr/toastr.js'
                ],
                dest: 'src/app/public/thirdparty/js/vendor.js'
            },
            'thirdparty-css-dev': {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'bower_components/bootstrap/dist/css/bootstrap-theme.css',
                    'bower_components/toastr/toastr.css'
                ],
                dest: 'src/app/public/thirdparty/css/vendor.css'
            },
            'app-js-dev': {
                src: [
                    'src/app/public/scripts/Main.js',
                    'src/app/public/scripts/**/*.js',
                    '!src/app/public/scripts/App.js',
                    '!src/app/public/scripts/bundle.js',
                    'src/app/public/scripts/App.js'
                ],
                dest: 'src/app/public/scripts/bundle.js',
                options: {
                    sourceMap: true
                }
            }
        },
        /* grunt-mocha-test configuration */
        mochaTest: {
            /**
             * Runs all library tests and reports the result in a dot-matrix.
             **/
            'short-output': {
                options: {
                    reporter: 'dot',
                    clearRequireCache: true
                },
                src: ['src/test/**/*.js']
            },
            /**
             * Runs all library test and reports the result as a BDD spec.
             **/
            'long-output': {
                options: {
                    reporter: 'spec',
                    clearRequireCache: true
                },
                src: ['src/test/**/*.js']
            }
        },
        /* grunt-nodemon configuration */
        nodemon: {
            /**
             * Monitors the dev build server folder for javascript changes and restarts the node process.
             **/
            'serve-dev': {
                script: 'server.js',
                options: {
                    cwd: 'src/app/',
                    ignore: ['node_modules/**', 'src/app/public/**'],
                    delay: 500,
                    ext: 'js'
                }
            }
        },
        /* grunt-contrib-watch configuration */
        watch: {
            /*
             * Watches for client typescript changes and runs the concat task
             * */
            'client-dev': {
                files: 'src/app/public/**/*.js',
                tasks: ['concat:app-js-dev'],
                options: {
                    spawn: false
                }
            }
        },
        /* grunt-concurent configuration*/
        concurrent: {
            /*
             * Runs the a watch task and nodemon in parallel
             * */
            'serve-dev': [
                'watch:client-dev',
                'nodemon:serve-dev'
            ],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    /* Default task */
    grunt.registerTask('default', ['test']);

    /* Main tasks */
    grunt.registerTask('serve', ['build-dev', 'concurrent:serve-dev']);

    /* Test tasks */
    grunt.registerTask('test', ['build-dev', 'mochaTest:long-output']);
    grunt.registerTask('test-succint', ['build-dev', 'mochaTest:short-output']);

    /* Build tasks */
    grunt.registerTask('build-dev', [
        'init-thirdparty',
        'concat:app-js-dev'
    ]);

    grunt.registerTask('init-thirdparty', [
        'concat:thirdparty-js-dev',
        'concat:thirdparty-css-dev',
        'copy:thirdparty-misc-dev'
    ]);
};
