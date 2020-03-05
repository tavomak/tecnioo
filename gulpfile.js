const
    gulp = require('gulp'),
    bourbon = require("bourbon").includePaths,
    browsersync = require('browser-sync').create(), //Recarga el navegador
    autoprefixer = require('gulp-autoprefixer'), //Autoprefixer
    notify = require('gulp-notify'), //Notificaciones
    sass = require('gulp-sass'), //Copila SCSS
    sourcemaps = require('gulp-sourcemaps'), //SourceMaps
    pug = require('gulp-pug'), //Copila PUG
    uglify = require('gulp-uglify'), //Minifica JS
    cleanCSS = require('gulp-clean-css'), //Minifica CSS
    rename = require('gulp-rename'), //Renombra archivos
    imagemin = require('gulp-imagemin'); //Minifica img

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./dist"
        }
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function pugjs() {
    return (
        gulp
        .src('./src/pug/pages/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .on('error', notify.onError(function (error) {
            return 'Error de copilacion PUG.\nDetalles en la consola.\n' + error;
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(notify({
            sound: false,
            message: 'PUG Procesados',
            onLast: true
        }))
        .pipe(browsersync.stream())
    );
}

// Define tasks after requiring dependencies
function scss() {
    return (
        gulp
        .src('./src/assets/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: true,
            includePaths: bourbon.includePaths
        }))
        .on("error", notify.onError({
            sound: true,
            title: 'Error de copilación SCSS'
        }))
        .pipe(autoprefixer({
            versions: ['last 2 browsers']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/css/'))
        .pipe(browsersync.stream())
    );
}

// Dist css
function minifyCss() {
    return (
        gulp
        .src('./dist/assets/css/main.css')
        .pipe(rename({
            suffix: '-dist'
        }))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/css/'))
        .pipe(notify({
            sound: false,
            message: 'Css Procesado',
            onLast: true
        }))
        .pipe(browsersync.stream())
    );
}

function minifyJs() {
    return (
        gulp
        .src('./src/assets/js/*')
        /* .pipe(uglify()
            .on("error", notify.onError({
                sound: true,
                title: 'Error en JS'
            }))) */
        .pipe(rename({
            suffix: '-dist'
        }))
        .pipe(gulp.dest('./dist/assets/js/'))
        .pipe(notify({
            sound: false,
            message: 'Js Procesados',
            onLast: true
        }))
    )
}

function imageMin() {
    return (
        gulp.src('./src/assets/img/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('./dist/assets/img'))
    )
}

// Watch files
function watchFiles() {
    gulp.watch("./src/assets/scss/**/*", scss);
    gulp.watch("./src/pug/**/*", pugjs);
    gulp.watch("./dist/assets/css/main.css", minifyCss);
    gulp.watch("./src/assets/js/**/*", minifyJs);
    gulp.watch("./src/assets/js/**/*", browserSyncReload);
    gulp.watch(
        [
            "./src/assets/img/**/*"
        ],
        gulp.series(browserSyncReload)
    );
}

// define complex tasks
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.scss = scss;
exports.pugjs = pugjs;
exports.minifyCss = minifyCss;
exports.minifyJs = minifyJs;
exports.imageMin = imageMin;
exports.watch = watch;