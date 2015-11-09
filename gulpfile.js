var gulp   = require('gulp'),
	  jshint = require('gulp-jshint'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
	  rename = require('gulp-rename'),
    axis   = require('axis'),
    nmon   = require('gulp-nodemon'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./app/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('copyFonts' , function(){
  return gulp.src('./app/public/custom-fonts/**/*.{ttf,eot,woff,svg,woff2}')
  .pipe(rename({dirname: ''}))
  .pipe(gulp.dest('./app/dist/css'));
});

gulp.task('css', function(){
  return gulp.src('./app/public/**/*.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(minifyCSS())
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('./app/dist/css'));
});


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

gulp.task('default', ['dev','css', 'copyFonts',  'watch' , 'lint']);
