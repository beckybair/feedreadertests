var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	eslint = require('gulp-eslint'),
	watch = require('gulp-watch');

gulp.task('default', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	watch('index.html', function() {
		browserSync.reload();
	});
	watch('sass/**/*.scss', function() {
		gulp.start('styles');
	});
	watch('js/**/*.js', function () {
		gulp.start('lint');
	});
});

gulp.task('styles', function() {
	return gulp
		.src('sass/**/*.scss')
		.pipe(sass())
		.pipe(
			autoprefixer({
				browsers: ['last 2 versions']
			})
		)
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());
});

gulp.task('lint', () => {
	return src(['scripts/*.js'])
		// eslint() attaches the lint output to the "eslint" property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError());
});