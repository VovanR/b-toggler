# gruntjs.com

module.exports = (grunt) ->
    'use strict'

    require('load-grunt-tasks')(grunt)

    grunt.initConfig
        jshint:
            all:
                src: [
                    'static/js/**/*.js',
                    'static/test/**/*.js',
                ]
                options:
                    reporter: require('jshint-stylish')
                    curly: true
                    eqeqeq: true
                    freeze: true
                    latedef: true
                    newcap: true
                    nonbsp: true
                    nonew: true
                    plusplus: false
                    quotmark: 'single'
                    undef: true
                    browser: true
                    globals:
                        jQuery: true
                        define: true
                        console: true
                        require: true
                        requirejs: true
                        QUnit: true

        jscs:
            all:
                src: [
                    'static/js/**/*.js',
                    'static/test/**/*.js',
                ]

        # grunt qunit (run all tests)
        # grunt qunit --test foo (run `foo` test)
        qunit:
            all:
                src: [
                    'static/test/**/' + (grunt.option('test') or '*') + '-test.html',
                ]

        watch:
            jshint:
                files: [
                    'static/js/**/*.js',
                    'static/test/**/*.js',
                ]
                tasks: 'newer:jshint:all'

            jscs:
                files: [
                    'static/js/**/*.js',
                    'static/test/**/*.js',
                ]
                tasks: 'newer:jscs:all'

    grunt.registerTask 'lint', ['jshint', 'jscs']
    grunt.registerTask 'test', ['qunit']
    grunt.registerTask 'default', ['lint', 'watch']
