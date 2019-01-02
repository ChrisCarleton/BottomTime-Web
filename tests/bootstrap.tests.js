import Driver from './web-driver';
import Koa from 'koa';
import path from 'path';
import proxy from 'koa-proxy';
import serve from 'koa-static';

const app = new Koa();
let server = null;

app.use(proxy({
	host: 'http://localhost:29201/',
	match: /^\/api\//,
	jar: true
}));
app.use(serve(path.join(__dirname, '../dist/dev/')));

before(done => {
	server = app.listen(8081, 'localhost', null, done);
});

after(() => {
	server.close();
});

describe('Web Driver', () => {
	it('Works?', () => {
		const driver = Driver();
		return driver.get('/index.html');
	});
});
