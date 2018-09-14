var    gulp      = require('gulp')
var    $         = require('gulp-load-plugins')();
var    open      = require('open');
var    runSq     = require('run-sequence');
var config = {
root: 'src',
test: 'test',
dist: 'dist'
}
/*-----------------生产--------------*/
gulp.task('default',['include:dist'])
gulp.task('clean:dist', function () {
  return gulp.src(config.dist)
    .pipe($.clean())
})
gulp.task('include:dist',['clean:dist'],function () {
  gulp.src([config.root + '/**/*.html', '!'+config.root+'/component/*.html' ])
      .pipe($.fileInclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest(config.dist))
})
/*----------------------测试--------------*/
gulp.task('test',['include:test','copy:test'], function () {
  runSq('open','watch')
})
gulp.task('copy:test',function () {
  return gulp.src(config.root+"/static/**/*")
    .pipe(gulp.dest(config.test+"/static/"))
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
  return gulp.src(config.test)
    .pipe($.clean())
})
gulp.task('include:test',function () {
  gulp.src([config.root + '/**/*.html', '!'+config.root+'/component/*.html', '!'+config.root+'/static/**/*.html' ])
      .pipe($.fileInclude({
        prefix: '@@',
        basepath: '@file',
        context: {
          version:new Date().getTime()
        }
      }))
      .pipe(gulp.dest(config.test))
})
gulp.task('watch',function () {
  $.watch(config.root + '/**/*.html',function() {
    runSq('include:test',function(){  
      $.connect.reload()
    })
  })
  $.watch(config.root + '/static/**/*', function () {
    runSq('copy:test',function () {
      $.connect.reload()
    })
  })
})
