var gulp = require('gulp');
var inject = require('gulp-inject');
var watch = require('gulp-watch');

var config = {
  jsFiles: ['./browser/app.js', './browser/**/*.js'],
  indexFile: './browser/index.html',
  clientDir: './browser'
}

function _inject(){
  var target = gulp.src(config.indexFile);
  var sources = gulp.src(config.jsFiles);
  target.pipe(inject(sources))
    .pipe(gulp.dest(config.clientDir));
}
gulp.task('inject:js', function(){
  _inject();
});

gulp.task('watch:inject:js', ['inject:js'], function(){
  watch(config.jsFiles, function(){
    _inject();
  });

});
