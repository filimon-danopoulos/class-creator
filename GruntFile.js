module.exports = function(grunt) {
    /*
     * Load all NPM dependencies
     * */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-typescript');
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
            'client-js-dev': {
                src: [ 
                    // Have to specifiy angular separately since it is a dependency and has to be loaded first
                    'build/app/public/thirdparty/angular/angular.js',
                    'build/app/public/thirdparty/**/*.js'
                ],
                dest: 'build/app/public/thirdparty/bundle.js',
                options: {
                    sourceMap: true
                }
            }
        },
        /* grunt-contrib-copy configuration */
        copy: {
            /*
             * Copies all the public static client content for development
             * */
            'client-dev': {
                files: [{
                    expand: true,
                    cwd: 'src/app/public/',
                    src: ['**/*', '!**/*.ts', '!**/*.swp'],
                    dest: 'build/app/public/'
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

        /* grunt-typescript configuration */
        typescript: {
            /*
             * Compiles all the typescript files that are used by the core library and all associated tests.
             * */
            'library-dev': {
                src: ['src/thirdparty/**/*.ts', 'src/lib/**/*.ts', 'src/test/**/*.ts'],
                dest: 'build/',
                options: {
                    module: 'commonjs', 
                    target: 'es5',
                    basePath: 'src/', 
                    sourceMap: false,
                    declaration: false
                }
            },
            /*
             * Compiles all the typescript files that are used by the server.
             * */
            'server-dev': {
                src: ['src/thirdparty/**/*.ts', 'src/app/routers/**/*.ts', 'src/app/server.ts'],
                dest: 'build/',
                options: {
                    module: 'commonjs',
                    target: 'es5', 
                    basePath: 'src/', 
                    sourceMap: false,
                    declaration: false
                }
            }, 
            /*
             * Compiles all client side typescript files into a bundle.
             * */
            'client-dev': {
                src: ['src/app/public/scripts/**/*.ts'],
                dest: 'build/app/public/scripts/app.js',
                options: {
                    target: 'es5',
                    basePath: 'src/app/public/scripts/',
                    sourceMap: true,
                    declaration: false,
                    references: [
                        "src/thirdarty/**/*.ts"
                    ]
                }
                    
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
        /* grunt-contrib-watch configuration */ 
        watch: {
            /*
             * Watches for typescript changes and runs the build-verbose task
             * */
            'typescript-test': {
                files: 'src/**/*.ts',
                tasks: ['test-verbose'],
                options: {
                    spawn: false    
                }
            },
            /*
             * Watches for client typescript changes and runs the compile task
             * */
            'typescript-client-dev': {
                 files: 'src/app/public/**/*.ts',
                 tasks: ['typescript:client-dev', 'modify-typescript-sourcemaps'],
                 options: {
                    spawn: false    
                 }
            },
            /*
             * Watches for server typescript changes and runs the compile task
             * */
            'typescript-server-dev': {
                 files: ['src/app/**/*.ts', '!src/app/public/**/*.ts'],
                 tasks: ['typescript:server-dev'],
                 options: {
                    spawn: false    
                 }
            },
            /*
             * Watches for libary typescript changes and runs the compile task
             * */
            'typescript-library-dev': {
                 files: ['src/lib/**/*.ts'],
                 tasks: ['typescript:library-dev'],
                 options: {
                    spawn: false    
                 }
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
                    ignore: ['node_modules/**', 'src/**', 'build/app/public/scripts/**'],
                    delay: 500,
                    ext: 'js'
                }
            }
        },
        /* grunt-concurent configuration*/
        concurrent: {
            /*
             * Runs the a watch task and nodemon in parallel 
             * */
            'serve-dev': [            
                'watch:typescript-library-dev',
                'watch:typescript-server-dev',
                'watch:typescript-client-dev',
                'nodemon:serve-dev'
            ],
            options: {
                logConcurrentOutput: true
            }
        }
    });
    
    /* Default task */
    grunt.registerTask('default', ['test-verbose']);

    /* Main tasks */
    grunt.registerTask('serve', ['build-dev', 'concurrent:serve-dev']);
    grunt.registerTask('test', ['test-verbose', 'watch:typescript-test']);

    /* Test tasks */
    grunt.registerTask('test-verbose', ['build-dev', 'mochaTest:long-output']);
    grunt.registerTask('test-succint', ['build-dev', 'mochaTest:short-output']);

    /* Build tasks */
    grunt.registerTask('build-dev', [
        'clean:build', 
        'copy-dev',
        'compile-dev',
        'concat:client-js-dev',
        'modify-typescript-sourcemaps'
    ]);
    
    /* Compilation tasks */
    grunt.registerTask('compile-dev', ['typescript-dev']);
    grunt.registerTask('typescript-dev', [
        'typescript:library-dev', 
        'typescript:server-dev', 
        'typescript:client-dev'
    ]);

    /* Copying tasks */
    grunt.registerTask('copy-dev', [
        'copy:client-dev', 
        'copy:client-bower-dev'
    ]);

    /* Manual tasks */    
    grunt.registerTask('modify-typescript-sourcemaps', 'Fixes typescript source maps so that they all look the same.', function() {
        /* This is a temporary solution untill I can build something a bit more stable */
        var fs = require('fs');
        var sourcemapPath = 'build/app/public/scripts/app.js.map';
        var sourcemap = JSON.parse(fs.readFileSync(sourcemapPath, 'utf8'));   
        sourcemap.sourcesContent = sourcemap.sources.map(function(x) {
            var filePath = 'src'+x.split('src')[1];
            return fs.readFileSync(filePath, 'utf8');
        });
        sourcemap.sources = sourcemap.sources.map(function(x) {return "src"+x.split("scripts")[1]; });
        delete sourcemap.sourceRoot;
        fs.writeFileSync(sourcemapPath, JSON.stringify(sourcemap), 'utf8');
    });
};
