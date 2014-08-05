// Gulp
var gulp = require('gulp');


// Tools
var karma = require('karma').server;
var bump = require('gulp-bump');

// Validation
var jshint = require('gulp-jshint');

var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');

// Testing
var karmaConf = {
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      {pattern: 'http://code.jquery.com/jquery-1.11.1.js', included: true},
      'src/*.js',
      'test/specs/*.js'
    ],
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS', 'Firefox'],
};

// Target Files
var sources = ['gulpfile.js', './src/*.js', './test/specs/*.js'];
var pkg = './package.json';

// Tasks
gulp.task('bump:patch', function () {
	'use strict';

	gulp.src('./package.json')
		.pipe(bump())
		.pipe(gulp.dest('./'));
});

gulp.task('bump:minor', function () {
	'use strict';

	gulp.src(pkg)
		.pipe(bump({type : 'minor'}))
		.pipe(gulp.dest('./'));
});

gulp.task('bump:major', function () {
	'use strict';

	gulp.src(pkg)
		.pipe(bump({type : 'major'}))
		.pipe(gulp.dest('./'));
});

gulp.task('format', function () {
	'use strict';

	gulp.src(sources)
		.pipe(jscs());
});

gulp.task('lint', function () {
	'use strict';

	gulp.src(sources)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('test', function(done){
	'use strict';
	console.log(karmaConf);
	karma.start(karmaConf, done);
});