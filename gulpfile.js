var    gulp      = require('gulp');
var    uglify    = require('gulp-uglify');
var    $         = require('gulp-load-plugins')();
var    open      = require('open');
var    runSq     = require('run-sequence');
var    watch     = require('gulp-watch');
var    include   = require('gulp-file-include');
var    clean     = require('gulp-clean');
var config = {
root: 'src',
test: 'test',
dist: 'dist'
}
/*-----------------生产--------------*/
gulp.task('default')
gulp.task('clean:dist', function () {
  return gulp.src(config.dist)
    .pipe(clean())
})
gulp.task('include:dist',['clean:dist'],function () {
  gulp.src([config.root + '/**/*.html', '!'+config.root+'/component/*.html' ])
      .pipe(include({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest(config.dist))
})
/*----------------------测试--------------*/
gulp.task('test',['include:test'], function () {
  runSq('open','watch')
})
gulp.task('start:server', function() {
  $.connect.server({
      root: config.test,
      livereload: true,
      port: 3000,
  });
});
gulp.task("open",['start:server'],function(){
  open('http://localhost:3000')
});
gulp.task('clean:test', function () {
  console.log($);
  return gulp.src(config.test)
    .pipe(clean())
})
gulp.task('include:test',['clean:test'],function () {
  gulp.src([config.root + '/**/*.html', '!'+config.root+'/component/*.html' ])
      .pipe(include({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest(config.test))
})
gulp.task('watch',function () {
  watch([config.root+'/static/**/*', config.root + '/**/*.html'],function() {
    runSq('include:test',function(){  
      $.connect.reload()
    })
  })
})
