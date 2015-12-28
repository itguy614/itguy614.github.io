var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    iffer           = require('gulp-if'),

    imagemin        = require('gulp-imagemin');

    settings        = require('../_settings.json');

module.exports = function buildImg() {

    return gulp.src(settings.paths.src.img + '/**/*')
        .pipe(imagemin(settings.plugins.options.imagemin))
        .pipe(gulp.dest(settings.paths.dest.img))
    ;

};
