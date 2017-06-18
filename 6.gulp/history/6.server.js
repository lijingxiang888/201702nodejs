let gulp = require('gulp');
let $ = require('gulp-load-plugins')();
/**
 启动一个HTTP服务器去预览我们的项目，并且当源码修改后自动刷新浏览器
 **/
gulp.task('serve',function(){//注意是 serve
  $.connect.server({
      port:8080, //端口号
      root:'./build',//静态文件根目录
      //当源码发生修改后会自动刷新浏览器
      livereload:true
  });
});
gulp.task('html',function(){
   gulp.src('./src/*.html')
       .pipe(gulp.dest('./build'))
       //通知浏览器重启
       .pipe($.connect.reload())
});
gulp.task('watch',function(){
  gulp.watch('./src/*.html',['html']);
})
//组合任务 此数组是此依赖的任务，只有当依赖的任务全部执行完毕之后才会执行default任务，因为default可省略， 那么命令行直接键入 gulp 就可以阅览了。
gulp.task('default',['serve','watch']);

//然后当index.html代码改变，记住要ctrl+S保存一下，然后命令行会自动刷新、浏览器自己也会自动刷新