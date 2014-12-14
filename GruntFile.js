module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    typescript: {
        base: {
            src: ['src/**/*.ts'],
            dest: 'app/',
            options: {
                //watch: true,
                module: 'AMD', 
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
                quiet: false, // Optionally suppress output to standard out (defaults to false)
                clearRequireCache: true // Optionally clear the require cache before running tests (defaults to false)
            },
            src: ['test/**/*.js']
        }
    }
});

grunt.loadNpmTasks('grunt-typescript');
grunt.loadNpmTasks('grunt-mocha-test');

// Default task(s).
grunt.registerTask('default', ['typescript', 'mochaTest']);
grunt.registerTask('compile', ['typescript']);
grunt.registerTask('test', ['mochaTest']);

};
