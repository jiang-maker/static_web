var    gulp         = require('gulp')
var    $            = require('gulp-load-plugins')();
var    runSq        = require('run-sequence');
var    browserSync  = require('browser-sync');
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

/*---------------------本地开发测试--------------*/
gulp.task('test',['include:test','copy:test'], function () {
  runSq('browser-sync','watch')
})
gulp.task('copy:test',function () {
  return gulp.src(config.root+"/static/**/*")
    .pipe(gulp.dest(config.test+"/static/"))
})
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
      browserSync.reload();
    })
  })
  $.watch(config.root + '/static/**/*', function () {
    runSq('copy:test',function () {
      browserSync.reload();
    })
  })
})
gulp.task('browser-sync', function () {
  browserSync.init({
      files:['**'],
      server:{
          baseDir:'./test',  // 设置服务器的根目录
          index:'index.html' // 指定默认打开的文件
      },
      port:8090  // 指定访问服务器的端口号
  });
});
