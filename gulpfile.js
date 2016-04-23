// 引入插件

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

// gulp 默认任务
gulp.task('default', ['browserSync'], function(){
	gulp.watch('./src/scss/**/*.scss', ['sass']);
	gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
});


// gulp sass解析任务
gulp.task('sass', function(){
	sass('./src/scss/**/*scss')
		.on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer({
        	browsers: ['Android >= 2.3', 'iOS >= 7'],
            cascade: true,  //是否美化属性值 默认：true 像这样：
        	remove:true 	//是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({stream: true}));
});

// 浏览器刷新任务
gulp.task('browserSync', function(){
	browserSync({
	    server: {
	      baseDir: './'
	    },

	    // 在Chrome浏览器中打开网站 
		browser: ["chrome"],

		// 监听的文件列表
		files : [
			'./src/css/**/*.css',
			'./src/js/**/*.js',
			'./index.html'
		],
	});
});