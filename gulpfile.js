var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    htmlimport = require('gulp-html-import')

gulp.task('default',function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
})
gulp.task('import',function () {
  gulp.src('./src/**/*.html')
    .pipe(htmlimport('./src/component/'))
    .pipe(gulp.dest('dist'))
})