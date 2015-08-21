// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var htmlreplace = require('gulp-html-replace');
var minifyCss = require('gulp-minify-css');


//HTML replace - replace script in development HTML with processed/minified script and move to dist folder for production

gulp.task('htmlReplace', function() {
  gulp.src('app/*.html')
    .pipe(htmlreplace({
        'js': 'js/all.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('htmlReplace2', function() {
  gulp.src('app/views/*.html')
    .pipe(htmlreplace({
       'css': 'css/styles.min.css',
        'js': 'js/all.min.js'
    }))
    .pipe(gulp.dest('dist/views'));
});

//minify css
gulp.task('minify-css', function() {
  return gulp.src('app/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-css2', function() {
  return gulp.src('app/views/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/views/css'));
});


// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/views/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
//gulp.task('sass', function() {
//    return gulp.src('scss/*.scss')
//       .pipe(sass())
//        .pipe(gulp.dest('css'));
//});

// Compress images
gulp.task('imageCompress', function () {
    return gulp.src('app/views/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/views/images'));
});

gulp.task('imageCompress2', function () {
    return gulp.src('app/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/views/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/views/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/js'));
});

gulp.task('scripts2', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('views/js/*.js', ['lint', 'scripts']);
});


// Default Task
gulp.task('default', ['lint', 'scripts', 'scripts2', 'imageCompress', 'imageCompress2', 'htmlReplace', 'htmlReplace2', 'minify-css', 'minify-css2']);
