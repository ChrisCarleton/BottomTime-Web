import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export default new webdriver.Builder()
	.forBrowser('chrome')
	.setChromeOptions(new chrome.Options())
	.build();
