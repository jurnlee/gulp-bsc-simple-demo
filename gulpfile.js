
var 
gulp        = require('gulp'),
browserSync = require('browser-sync'), 
browserify  = require('browserify'),
uglify      = require('gulp-uglify'),
path        = require('gulp-path'),
less        = require('gulp-less'),
sass        = require('gulp-sass'),
htmlmin     = require('gulp-htmlmin'),
minifycss   = require('gulp-minify-css'),
rename      = require('gulp-rename'),
clean       = require('gulp-clean'),
concat      = require('gulp-concat');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  gulp.start('build');
});

var config = {
    css : {
        src: 'src/css',
        dest: 'dist/css',
        filter: '**/*.css'
    },
    js:{
        src: 'src/js',
        dest: 'dist/js',
        filter: ['**/*.js','**/*.coffee']
    },
    less: {
        src: 'src/less',
        dest: 'dist/less',
        filter: '**/*.less',
        conf:{
            paths : ['./']
        }
    },
    sass:{
        src: 'src/sass',
        dest: 'dist/sass',
        filter: ['**/*.scsss','**/*.sass'],
        conf: {
          compass: false,
          bundleExec: true,
          sourcemap: true,
          sourcemapPath: '../scss'
        }
    }
}

// 静态服务器
gulp.task('bsrc', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});

// 代理
/*
gulp.task('proxy', function() {
    browserSync.init({
        proxy: "你的域名或IP"
    });
});
*/

gulp.task('less', function(){
    return gulp.src( path.join(config.less.src, config.less.filter) )
        .pipe(less())
        //.pipe(gulp.dest(config.less.dest))
        .pipe(concat('less.css'))
        .pipe(gulp.dest(config.css.src));
});

gulp.task('sass', function(){
    return gulp.src( path.join(config.sass.src, config.sass.filter) )
        .pipe(sass(config.sass.conf))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(concat('sass.css'))
        .pipe(gulp.dest(config.css.src));
});

 gulp.task('css', ['less', 'sass'], function () { 
    return gulp.src(config.css.src)
    	.pipe(concat('style.css'))
    	.pipe(gulp.dest(config.css.dest))
    	.pipe(rename({suffix:'.min'}))
    	.pipe(minifycss())
    	.pipe(gulp.dest(config.css.dest));    
});
gulp.task('js', function () {
     return gulp.src('src/js/*js')
     	.pipe(concat('index.js'))
     	.pipe(gulp.dest('dist/js/'))
     	.pipe(rename({suffix:'.min'}))
     	.pipe(uglify())
     	.pipe(gulp.dest('dist/js/'));
});
gulp.task('html', function () {
	var htmlOptions = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/index.html').pipe(gulp.dest('dist/'));
    return gulp.src('src/html/*html').pipe(htmlmin(htmlOptions)).pipe(gulp.dest('dist/html/'));
});

gulp.task('js-watch', ['js'], browserSync.reload);
gulp.task('css-watch', ['css'], browserSync.reload);
gulp.task('html-watch', ['html'], browserSync.reload);


gulp.task('build', ['html','js','css'] , function() {
    console.log('----build success!----');
});

// 使用默认任务启动Browsersync，监听文件
gulp.task('serve', ['html','js','css'], function () { 
    
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
    // 添加 browserSync.reload 到任务队列里
    gulp.watch("src/html/*.html", ['html-watch']);
    gulp.watch("src/js/*.js", ['js-watch']);
    gulp.watch("src/css/*.css", ['css-watch']);
});


