import { By, until } from 'selenium-webdriver';
import driver from './web-driver';
import { expect } from 'chai';
import mockApis, { ErrorIds } from './webapp/mock-apis';
import sinon from 'sinon';

const LoginUrl = mockApis.resolveUrl('/login');

describe('Login page', () => {

	const user = {
		username: 'Jake.McHardy24',
		password: 'I@amTehJ3ek!',
		email: 'Jake.McHardy24@gmail.com',
		createdAt: (new Date()).toISOString(),
		role: 'user',
		isAnonymous: false,
		isLockedOut: false
	};

	async function refreshPage() {
		await driver.navigate().to(LoginUrl);
		await driver.wait(until.elementLocated(By.id('username')));
	}

	let stub = null;

	before(refreshPage);
	afterEach(async () => {
		if (stub) {
			stub.restore();
			stub = null;
		}

		await refreshPage();
	});

	it('catches missing username', async () => {
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('btn-login')).click();
		await driver.wait(until.elementLocated(By.id('err-username')));
	});

	it('catches missing password', async () => {
		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('btn-login')).click();
		await driver.wait(until.elementLocated(By.id('err-password')));
	});

	it('succeeds if username and password are correct', async () => {
		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('password')).sendKeys(user.password);

		stub = sinon.stub(mockApis, 'postAuthLogin');
		stub.callsFake((req, res) => res.json(user));

		await driver.findElement(By.id('btn-login')).click();
		await driver.wait(until.urlIs(mockApis.resolveUrl('/')));
		await driver.wait(until.elementLocated(By.id('user-nav-dropdown')));

		const text = await driver.findElement(By.id('user-nav-dropdown')).getText();
		expect(text).to.equal(user.username);
	});

	it('fails if username or password is incorrect', async () => {
		stub = sinon.stub(mockApis, 'postAuthLogin');
		stub.callsFake((req, res) =>
			res.status(401).json({
				errorId: ErrorIds.notAuthorized,
				status: 401,
				message: 'Authentication failed',
				details: 'Check your username and password and try again'
			})
		);

		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('btn-login')).click();
		await driver.wait(until.elementLocated(By.id('global-error-bar')));
	});

	it('fails if there is a general server error', async () => {
		stub = sinon.stub(mockApis, 'postAuthLogin');
		stub.callsFake((req, res) => res.sendStatus(503));

		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('btn-login')).click();
		await driver.wait(until.elementLocated(By.id('global-error-bar')));
	});

});
