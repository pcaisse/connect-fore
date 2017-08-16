var gulp = require('gulp')
var uglify = require('gulp-uglify')

var file = 'static/game.js'
var dist = 'static/dist'

gulp.task('build-dev', function() {
  return gulp.src(file)
    .pipe(uglify({
      output: {
        beautify: true,
        indent_level: 2,
        bracketize: true
      }
    }))
    .pipe(gulp.dest(dist))
})

gulp.task('build', function() {
  return gulp.src(file)
    .pipe(gulp.dest(dist))
})
