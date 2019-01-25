import app from './webapp/app';
import driver from './web-driver';
import http from 'http';

const server = http.createServer(app);
server.listen(8081);

after(async () => {
	try {
		await driver.quit();
	} catch (err) {
		/* eslint-disable no-console */
		console.error(err);
		/* eslint-enable no-console */
	}
	server.close();
});
