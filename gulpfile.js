// Gulp
var gulp = require('gulp');

// Tools

var bump = require('gulp-bump');

// Validation
var jshint = require('gulp-jshint');
var jshintOpts = {
	options : {
		strict : true
	}
};

var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');

// Testing
//var jasmine = require('gulp-jasmine');
var jasminePhantomJs = require('gulp-jasmine2-phantomjs');

// Target Files
var sources = ['gulpfile.js', './src/*.js', './test/specs/*.js'];
var pkg = './package.json';
var tests = './test/specs/*.js';

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
