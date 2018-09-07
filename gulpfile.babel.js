import eslint from 'gulp-eslint';
import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';

function lint() {
	return gulp.src([
			'web/**/*.js',
			'web/**/*.jsx',
			'admin/imagethumbs/*.js',
			'admin/manifester/*.js',
			'admin/transcoder/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
}

function test(done) {
	done();
}

function packageDev() {
	return gulp.src('web/app.js')
		.pipe(webpackStream(
			require('./webpack.dev'),
			webpack
		))
		.pipe(gulp.dest('dist/dev'));
}

function packageProd() {
	return gulp.src('web/app.js')
		.pipe(webpackStream(
			require('./webpack.prod'),
			webpack
		))
		.pipe(gulp.dest('dist/prod'));
}

function serve(done) {
	new WebpackDevServer(
		webpack(require('./webpack.dev')),
		{
			compress: true,
			historyApiFallback: true,
			hot: true,
			index: 'index.html',
			port: 8080,
			publicPath: '/',
			watchContentBase: true
		})
		.listen(8080, 'localhost', err => {
			if (err) return done(err);
			done();
		});
}

gulp.task('package-dev', packageDev);

gulp.task('package-prod', packageProd);

gulp.task('package', gulp.parallel(packageDev, packageProd));

gulp.task('lint', lint);

gulp.task('test', gulp.series('lint', test));

gulp.task('serve', serve);

gulp.task('default', serve);
