module.exports = function(grunt) {
    /*
     * Load all NPM dependencies
     * */
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	/*
     * Configure NPM dependencies for the project
     * */
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

        /* grun-contrib-copy configuration */
        copy: {
            /*
             * Copies all the public static client content for development
             * */
            'client-dev': {
                files: [{
                    expand: true,
                    cwd: 'src/app/public/',
                    src: '**',
                    dest: 'build/app/public/'
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
             * Watches for typescript changes and runs the build task
             * */
            'typescript-serve': {
                 files: 'src/**/*.ts',
                 tasks: ['build-dev'],
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
			serve: {
				script: 'server.js',
				options: {
					cwd: 'build/app/',
					ignore: ['node_modules/**', 'src/**'],
					delay: 500
				}
			}
		},
        /* grunt-concurent configuration*/
		concurrent: {
            /*
             * Runs the a watch task and nodemon in parallel 
             * */
			'serve-dev': [            
				'watch:typescript-serve',
				'nodemon:serve'
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

    /* Build tasks, clean does not work properly in windows. */
    grunt.registerTask('build-dev', [/*'clean:build', */'compile-dev', 'copy:client-dev']);
    
    /* Compilation tasks */
	grunt.registerTask('compile-dev', ['typescript-dev']);
    grunt.registerTask('typescript-dev', ['typescript:library-dev', 'typescript:server-dev']);

};
