module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    typescript: {
        base: {
            src: ['src/**/*.ts'],
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
    mochaTest: {
        test: {
            options: {
                reporter: 'spec',
                clearRequireCache: true // Optionally clear the require cache before running tests (defaults to false)
            },
            src: ['build/test/**/*.js']
        }
    },
    clean: {
        build: {
            src: [ 'build' ],
            force: true
        }
    },
    watch: {
        typescript: {
            files: 'src/**/*.ts',
            tasks: ['build'],
            options: {
                spawn: false    
            }
        }
    },
    nodemon: {
        dev: {
            script: 'server.js',
            options: {
                cwd: 'build/app/server/',
                ignore: ['node_modules/**', 'src/**'],
                delay: 100
            }
        }
    },
    concurrent: {
        dev: [            
            'watch:typescript',
            'nodemon'
        ],
        options: {
            logConcurrentOutput: true
        }
    }
});

grunt.loadNpmTasks('grunt-typescript');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-nodemon');
grunt.loadNpmTasks('grunt-concurrent');

// Default task(s).
grunt.registerTask('default', ['build']);
grunt.registerTask('run', ['build', 'concurrent']);
grunt.registerTask('dev', ['build', 'watch']);

grunt.registerTask('build', ['compile', 'mochaTest']);
grunt.registerTask('compile', [/* 'clean', DOES NOT WORK ON WINDOWS */ 'typescript']);

};
