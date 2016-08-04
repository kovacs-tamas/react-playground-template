var gulp = require('gulp');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');

var paths = {
    scripts: [
        './main.js',
        './app/*.js'
    ],
    scriptbundles: [
       './node_modules/react/dist/react.min.js',
       './node_modules/react-dom/dist/react-dom.min.js',
       './node_modules/react/dist/react-dom.min.js',
        './public/app.js'
    ]
};

gulp.task('scripts', function(done)
{
    gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(concat('app.js'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest('./public/'))
        .on('end', done);
});

gulp.task('scriptbundles', function(done)
{
    gulp.src(paths.scriptbundles)
        .pipe(concat('app.bundle.js'))
        .pipe(gulp.dest('./public/'))
        .pipe(livereload())
        .on('end', done);
});

gulp.task('watch', function()
{
    // follow the strange configuration of the chrome extension
    // http://livereload.com/extensions/
    livereload.listen(
        {
            'host': '127.0.0.1',
            'port': '35729'
        });
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.scriptbundles, ['scriptbundles']);

});

gulp.task('default', ['scripts', 'watch']);
