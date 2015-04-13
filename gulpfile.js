var gulp    = require('gulp');
var debug   = require('gulp-debug');
var plumber = require('gulp-plumber');

var myth = require('gulp-myth');

var chalk   = require('chalk');
var through = require('through2');
var path    = require('path');
var loadtheme = require('./bower_components/protoboard/loadtheme');

function chain(fn) {
  return through.obj(function(file, enc, callback) {
    // TODO(gs): How to open a stream?
    var stream = gulp.src('')
        .pipe(plumber({
          errorHandler: function(err) {
            this.emit('error', err);
          }.bind(this)
        }))
        .pipe(through.obj(function(f, enc, cb) {
          cb(null, file);
        }));
    fn(stream)
        .pipe(through.obj(function(f, enc, cb) {
          this.push(f);
          cb(null, f);
        }.bind(this), function(cb) {
          callback();
          cb();
        }));
  });
}

function subMyth() {
  return chain(function(stream) {
    return stream
        .pipe(myth({ 'variables': loadtheme(__dirname + '/theme.json') }));
  })
}

gulp.task('ex', function() {
  return gulp.src('./css/*.css')
      .pipe(subMyth())
      .pipe(gulp.dest('out'));
});

gulp.task('test', ['jshint'], function() {
  return gulp.src(['./test/**/*_test.html', './test/testbase.html'])
      .pipe(subBabel())
      .pipe(gulp.dest('out'));
});

gulp.task('watch', ['compile'], function() {
  // src
  gulp.watch(['src/**/*.html', 'test/**/*.html'], function(event) {
    var base = event.path.substring(__dirname.length).split('/')[1];
    gulp.src(event.path, {base: base})
        .pipe(plumber())
        .pipe(subBabel())
        .pipe(subMythHtml())
        .pipe(debug({title: chalk.green('src')}))
        .pipe(gulp.dest('out'));
  });

  // JSHint
  gulp.watch(['src/**/*.html', 'test/**/*.html'], function(event) {
    var base = event.path.substring(__dirname.length).split('/')[1];
    gulp.src(event.path, {base: base})
        .pipe(plumber())
        .pipe(subJsHint())
        .pipe(debug({title: chalk.green('jshint')}));
  });
});

gulp.task('compile', ['src', 'test', 'ex']);
gulp.task('pack', ['src', 'ex'], function() {
  return gulp.src('out/**/*')
      .pipe(zip('bin.zip'))
      .pipe(gulp.dest('dist'));
});
gulp.task('check', ['karma', 'doc']);
