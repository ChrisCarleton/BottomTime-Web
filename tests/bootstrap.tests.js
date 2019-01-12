import app from './webapp/app';
import driver from './web-driver';
import http from 'http';

const server = http.createServer(app);
server.listen(8081);

after(async () => {
	await driver.quit();
	server.close();
});
