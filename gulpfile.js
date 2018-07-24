
const gulp = require( 'gulp' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    images = require( 'gulp-imagemin' ),
    less = require( 'gulp-less' ),
    jade = require( 'gulp-jade' ),
    groupMedia = require( 'gulp-group-css-media-queries' ),
    clean = require( 'gulp-clean-css' ),
    rename = require( 'gulp-rename' ),
    browser = require( 'browser-sync' );



gulp.task( 'browser', function() {
    browser.init({
        server: {
            baseDir: 'production/'
        }
    });
});


// CSS

gulp.task( 'CSS', function() {
    return gulp.src( 'src/css/style.less' )
        .pipe(less().on('error', console.info))
        .pipe(autoprefixer({ browsers: ['last 5 versions', '> 1%'], cascade: false }))
        .pipe(groupMedia())
        .pipe(clean())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest( 'production/css/' ));
});


gulp.task('watch_CSS', function() {
    gulp.watch( 'src/css/*.less' , ['CSS']);
});

// Images

gulp.task( 'images', function(){
    return gulp.src( 'src/img/*.{png,jpg,jpeg}' )
        .pipe(images())
        .pipe(gulp.dest( 'production/img/' ))
});

gulp.task('watch_img', function() {
    gulp.watch( 'src/*.{jpg,png,jpeg}' , ['images']);
});


// Jade

gulp.task( 'jade', function(){
    return gulp.src( 'src/index.jade' )
        .pipe(jade())
        .pipe(gulp.dest( 'production/' ))
});

gulp.task('watch_jade', function() {
    gulp.watch( 'src/*.jade' , ['jade']);
});


// Font


gulp.task( 'copyFonts', function() {
    return gulp.src( 'src/font/*.{ttf,woff,woff2,eot,svg}' )
        .pipe(gulp.dest( 'production/font/' ))
});

// Main task

gulp.task('default', [ 'copyFonts', 'CSS', 'watch_CSS', 'images', 'watch_img', 'jade', 'watch_jade' ]);