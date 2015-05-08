var gulp   = require('gulp'),
    stylus = require('gulp-stylus'),
    axis   = require('axis'),
    nmon   = require('gulp-nodemon');

gulp.task('stylus', function () {
  gulp.src('./app/public/stylesheets/style.styl')
  .pipe(stylus({use: [axis()]}))
  .pipe(gulp.dest('./app/public/stylesheets'));
});

gulp.task('watch', function(){
    gulp.watch("./app/public/stylesheets/*.styl", ['stylus']);
});

gulp.task('dev', function() {
  nmon({script: 'server.js'});
});

gulp.task('default', ['dev', 'watch']);
