var gulp      = require('gulp');
var tsc       = require('gulp-typescript');
var sass      = require('gulp-sass');
var concat    = require('gulp-concat');
var sequence  = require('run-sequence');

var riotFiles       = ['bower_components/riot/riot.js', 'bower_components/riot/compiler.js', 'bower_components/riot-ts/riot-ts.js'];
var cssLibFiles     = ['bower_components/normalize-css/normalize.css', 'bower_components/font-awesome/css/font-awesome.css'];
var fontFiles       = ['bower_components/font-awesome/fonts/*'];
var typescriptFiles = ['src/ts/app/*.ts', 'src/ts/app/**/*.ts'];
var sassFiles       = ['src/sass/*.scss', 'src/sass/**/*.scss'];
var cssFiles        = ['src/sass/*.css', 'src/sass/**/*.css'];
var destJS          = 'app/assets/javascripts';
var destCSS         = 'app/assets/stylesheets';

gulp.task('default', function() {
  return sequence(
    'bower',
    'typescript',
    'sass',
    'watch'
  );
});

gulp.task('watch', function() {
  gulp.watch(typescriptFiles, ['typescript']);
  gulp.watch(sassFiles, ['sass']);
});

// ============================================
// bower
// ============================================

gulp.task('bower', [
  'bower-js',
  'bower-css',
  'bower-fonts'
]);

gulp.task('bower-js', function() {
  return gulp.src(riotFiles)
    .pipe(gulp.dest(destJS + '/vendor'));
});

gulp.task('bower-css', function() {
  return gulp.src(cssLibFiles)
    .pipe(gulp.dest(destCSS + '/vendor'));
});

gulp.task('bower-fonts', function() {
  return gulp.src(fontFiles)
    .pipe(gulp.dest(destCSS + '/font'));
});

// ============================================
// typescript
// ============================================

gulp.task('typescript', function() {
  return sequence(
    'typescript-compile'
  );
});

gulp.task('typescript-compile', function() {
  return gulp.src(typescriptFiles)
    .pipe(tsc({
      typescript: require('typescript'),
      target: 'ES5',
      experimentalDecorators: true,
      noImplicitAny: true,
      removeComments: true,
      out: 'riot-components.js'
    }))
    .pipe(gulp.dest(destJS + '/app'));
});

// ============================================
// sass
// ============================================

var sassDir = 'src/sass';

gulp.task('sass', function() {
  return sequence(
    'sass-compile',
    'sass-concat'
  );
})

gulp.task('sass-compile', function() {
  return gulp.src(sassFiles, {
      base: sassDir
    })
    .pipe(sass())
    .pipe(gulp.dest(sassDir));
});

gulp.task('sass-concat', function() {
  return gulp.src(cssFiles)
    .pipe(concat('app.css'))
    .pipe(gulp.dest(destCSS + '/app'));
})
