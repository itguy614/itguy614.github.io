var
    autoprefixer = require('gulp-autoprefixer')
    bower = require('gulp-bower')
    gulp = require('gulp'),
    minifier = require('gulp-minify-css')
    notify = require("gulp-notify")
    rename = require('gulp-rename')
    sass = require('gulp-sass')
    sourcemaps = require('gulp-sourcemaps')
    iffer = require('gulp-if')
    ;

var config = {
     sassPath: './resources/sass',
     bowerDir: './bower_components' ,
    production: false,
    sourcemaps: {
        enabled: true
    },
    autoprefixer: {
        enabled: true,
        pluginOptions: {
            browsers: ['last 2 versions'],
            cascade: false
        }
    },
    minifier: {
        pluginOptions: {
            processImport: false
        }
    },
    sass: {
        pluginOptions: {
            outputStyle: 'nested',
            precision: 10
        }
    }
}

gulp.task('default', ['bower', 'fonts', 'css']);

gulp.task('bower', function() { 
    return bower().pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('fonts', function() { 
    return gulp.src([
                    config.bowerDir + '/font-awesome/fonts/**.*',
                    config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*',
                    config.bowerDir + '/fonts-raleway/fonts/fonts-raleway/**.*',
                    config.bowerDir + '/roboto-fontface/fonts/**.*',
                ]) 
               .pipe(gulp.dest('./assets/fonts')); 
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/app.sass')
               .pipe(iffer(config.sourcemaps.enabled, sourcemaps.init()))
                .pipe(sass({
                    outputStyle: 'compact',
                    includePaths: [
                        './resources/sass',
                        config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                        config.bowerDir + '/font-awesome/scss',
                       config.bowerDir + '/fonts-raleway/scss',
                       config.bowerDir + '/roboto-fontface/css',
                    ]
                    }))
               .on('error', notify.onError(function(error) {
                    console.log('\n' + error);
                    return {
                        title: 'Gulp',
                        subtitle: 'Failure',
                        message: 'An error occured during the CSS build.',
                        sound: 'Frog'
                    };
                }))
               .pipe(iffer(config.autoprefixer.enabled, autoprefixer(config.autoprefixer.pluginOptions)))
               .pipe(iffer(config.production, minifier(config.minifier.pluginOptions)))
               .pipe(iffer(config.sourcemaps.enabled, sourcemaps.write('.')))
               .pipe(gulp.dest('./assets/css'))
               .pipe(notify({
                    title: 'Gulp',
                    subtitle: 'Success',
                    message: 'CSS Build Complete',
                    sound: 'Pop'
                }))
               ;
});



gulp.task('watch', function() {
    return gulp.watch(config.sassPath + '/**/*.sass', ['css']);
});
