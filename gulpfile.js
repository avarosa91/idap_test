const gulp = require('gulp'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    csso = require('gulp-csso'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel');

gulp.task('js', function() {
    gulp.src(['src/js/index.js'])
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('dist/javascript/'))
});

gulp.task('sass', function () {
    gulp.src('src/scss/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('img', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'))

});

gulp.task('fonts', function () {
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'))
});

gulp.task('build', ['sass', 'js', 'img', 'fonts']);

gulp.task('watch', function () {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/img/*', ['img']);
    gulp.watch('src/fonts/*', ['fonts']);
});
