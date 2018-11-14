var    gulp         = require('gulp');
var    $            = require('gulp-load-plugins')();
var    runSq        = require('run-sequence');
var    browserSync  = require('browser-sync');
var    minimist     = require('minimist');

var    envOpt          = minimist(process.argv.slice(2));
console.log(envOpt.env);  //npm script params, product-env or test-env

var baseDir = {
  root: 'src',
  test: 'test',
  dist: 'dist',
  html: [
    'src/page/m/**/*.html',
    'src/page/pc/**/*.html',
  ],
  css: [
    'src/static/m/**/*.less',
    'src/static/pc/**/*.less',
  ],
  image: [
    'src/static/m/**/*.{png,jpg,gif,ico,svg}',
    'src/static/pc/**/*.{png,jpg,gif,ico,svg}',
  ],
  js: [
    'src/static/m/**/*.js',
    'src/static/pc/**/*.js',
  ],
  other: [
    'src/static/bower_components/**/*'
  ]
}

/*-----------------生产打包--------------*/
gulp.task('clean:dist', function () {
  return gulp.src(baseDir.dist)
    .pipe($.clean())
})
gulp.task('html:dist',['clean:dist'],function () {
  gulp.src([baseDir.root + '/**/*.html', '!'+baseDir.root+'/component/*.html' ])
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(baseDir.dist))
})
gulp.task('less:dist',function () {
  
})
gulp.task('js:dist',function () {
  
})
gulp.task('image:dist',function () {
  
})
gulp.task('other:dist',function () {
  
})
gulp.task('copy:dist',function () {
  runSq('clean:dist','html:dist','less:dist','js:dist','image:dist','other:dist')
})
gulp.task('default',['html:dist'])

/*---------------------本地开发测试--------------*/
gulp.task('html:test',function () {
  gulp.src([baseDir.root + '/**/*.html', '!'+baseDir.root+'/component/*.html', '!'+baseDir.root+'/static/**/*.html' ])
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        version:new Date().getTime()
      }
    }))
    .pipe(gulp.dest(baseDir.test))
})
gulp.task('less:test',function () {
  return gulp.src(baseDir.root + "/static/**/*.less")
    .pipe($.less())
    .pipe(gulp.dest(baseDir.test + "/static/"))
})
gulp.task('js:test',function () {
  return gulp.src(baseDir.js,{
    base:'src/'
  })
    .pipe(gulp.dest(baseDir.test))
})
gulp.task('image:test',function () {
  return gulp.src(baseDir.image,{
    base: 'src/'
  })
    .pipe(gulp.dest(baseDir.test))
})
gulp.task('other:test',function () {
  return gulp.src(baseDir.other,{
    base: 'src/'
  })
    .pipe(gulp.dest(baseDir.test))
})
gulp.task('copy:test',function () {
  runSq('html:test','less:test','js:test','image:test','other:test')
})
gulp.task('clean:test', function () {
  return gulp.src(baseDir.test)
    .pipe($.clean())
})
gulp.task('watch',function () {
  $.watch(baseDir.root + '/**/*.html',function() {
    runSq('html:test',function(){  
      browserSync.reload();
    })
  })
  $.watch(baseDir.root + '/static/**/*', function () {
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

gulp.task('test',['copy:test'], function () {
  runSq('browser-sync','watch')
})