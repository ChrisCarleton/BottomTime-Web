/* eslint no-process-env: 0 */

import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

let chromeOptions = new chrome.Options();

if (process.env.CIRCLECI === 'true') {
	chromeOptions = chromeOptions.headless();
}

export default new webdriver.Builder()
	.forBrowser('chrome')
	.setChromeOptions(chromeOptions)
	.build();
