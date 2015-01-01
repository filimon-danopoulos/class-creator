module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    typescript: {
        base: {
            src: ['src/**/*.ts'],
            dest: 'build/',
            options: {
                //watch: true,
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
            src: [ 'build' ]
        }
    } 
});

grunt.loadNpmTasks('grunt-typescript');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-contrib-clean');

// Default task(s).
grunt.registerTask('default', ['clean', 'typescript', 'mochaTest']);
grunt.registerTask('compile', ['clean', 'typescript']);
grunt.registerTask('test', ['mochaTest']);

};
