const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const autoprefix = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const filter = require('gulp-filter')
const rename = require('gulp-rename');
const jsmin = require('gulp-jsmin');
const clean = require('gulp-clean');

gulp.task('js', () => {
    return gulp.src('./src/js/*.js')
        .pipe(jsmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('js-watch', ['js'], (done) => {
    browserSync.reload();
    done();
});

gulp.task('scss', () => {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefix())
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('css', () => {
    return gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./build/css'));
});

gulp.task('css-watch', ['css'], (done) => {
    browserSync.reload();
    done();
});

gulp.task('scss-watch', ['scss'], (done) => {
    browserSync.reload();
    done();
});

gulp.task('templates', (done) => {
    return gulp.src('./src/templates/*.pug')
        .pipe(pug().on('error', (e) => {
            console.log(e.message);
            done();
        }))
        .pipe(filter((file) => {
            return !/\/_/.test(file.path) && !/^_/.test(file.relative);
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('pug-watch', ['templates'], (done) => {
    browserSync.reload();
    done();
});

gulp.task('assets', () => {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./build/assets'));
})

gulp.task('assets-watch', ['assets'], (done) => {
    browserSync.reload();
    done();
})

gulp.task('clean', () => {
    return gulp.src('./build', {
            read: false
        })
        .pipe(clean());
})

gulp.task('watch', ['templates', 'scss', 'js', 'assets'], () => {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./src/js/*.js", ['js-watch']);
    gulp.watch("./src/templates/**/*.pug", ['pug-watch']);
    gulp.watch("./src/scss/**/*.scss", ['scss-watch']);
    gulp.watch("./src/css/**/*.css", ['css-watch']);
    gulp.watch("./src/assets/**/*", ['assets-watch']);
});

gulp.task('build', ['clean'], () => {
    gulp.run('js', 'css', 'scss', 'templates', 'assets');
});
