import webdriver from 'selenium-webdriver';

let driver = null;

export default function() {
	if (driver) {
		return driver;
	}

	driver = new webdriver.Builder()
		.forBrowser('phantomjs')
		.usingServer('http://localhost:8081/')
		.build();
	return driver;
};
