module.exports = function(grunt) {
    /**
     * Load all NPM dependencies
     **/
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-copy');

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
                    // Have to specifiy angular separately since it is a dependency and has to be loaded first
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js'
                ],
                dest: 'src/app/public/thirdparty/js/vendor.js'
            },
            'thirdparty-css-dev': {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'bower_components/bootstrap/dist/css/bootstrap-theme.css'
                ],
                dest: 'src/app/public/thirdparty/css/vendor.css'
            },
            'app-js-dev': {
                src: [
                    'src/app/public/scripts/Main.js',
                    'src/app/public/scripts/**/*.js',
                    '!src/app/public/scripts/App.js',
                    'src/app/public/scripts/App.js'
                ],
                dest: 'src/app/public/scripts/bundle.js'
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
                    ignore: ['node_modules/**'],
                    delay: 500,
                    ext: 'js'
                }
            }
        }
    });

    /* Default task */
    grunt.registerTask('default', ['test']);

    /* Main tasks */
    grunt.registerTask('serve', ['concat:app-js-dev', 'nodemon:serve-dev']);

    /* Test tasks */
    grunt.registerTask('test', ['concat:app-js-dev', 'mochaTest:long-output']);
    grunt.registerTask('test-succint', ['concat:app-js-dev', 'mochaTest:short-output']);

    grunt.registerTask('init-thirdparty', [
        'concat:thirdparty-js-dev',
        'concat:thirdparty-css-dev',
        'copy:thirdparty-misc-dev'
    ]);

    /* Build tasks */
    grunt.registerTask('build-dev', [
        'concat:thirdparty-js-dev',
        'concat:thirdparty-css-dev',
        'copy:thirdparty-misc-dev',
        'concat:app-js-dev'
    ]);
};
