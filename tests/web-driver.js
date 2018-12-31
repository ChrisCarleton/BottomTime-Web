import webdriver from 'selenium-webdriver';

const driver = new webdriver.Builder()
	.forBrowser('phantomjs')
	.build();

export default driver;
