import { By, until } from 'selenium-webdriver';
import driver from './web-driver';
import { expect } from 'chai';
import mockApis, { ErrorIds } from './webapp/mock-apis';
import sinon from 'sinon';

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

	function refreshPage() {
		return driver.navigate().to('http://localhost:8081/login/')
			.then(() => driver.wait(until.elementLocated(By.id('username'))));
	}

	let stub = null;

	before(refreshPage);
	afterEach(() => {
		if (stub) {
			stub.restore();
			stub = null;
		}

		return refreshPage();
	});

	it('catches missing username', () =>
		driver.findElement(By.id('password')).sendKeys(user.password)
			.then(() => driver.findElement(By.id('btn-login')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-username'))))
	);

	it('catches missing password', () =>
		driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('btn-login')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-password'))))
	);

	it('succeeds if username and password are correct', () => {
		stub = sinon.stub(mockApis, 'getAuthMe');
		stub.callsFake((req, res) => res.json(user));

		return driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-login')).click())
			.then(() => driver.wait(until.urlIs('http://localhost:8081/')))
			.then(() => driver.wait(until.elementLocated(By.id('user-nav-dropdown'))))
			.then(() => driver.findElement(By.id('user-nav-dropdown')).getText())
			.then(text => expect(text).to.equal(user.username));
	});

	it('fails if username or password is incorrect', () => {
		stub = sinon.stub(mockApis, 'postAuthLogin');
		stub.callsFake((req, res) =>
			res.status(401).json({
				errorId: ErrorIds.notAuthorized,
				status: 401,
				message: 'Authentication failed',
				details: 'Check your username and password and try again'
			})
		);

		return driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-login')).click())
			.then(() => driver.wait(until.elementLocated(By.id('error-alert-message'))));
	});

	it('fails if there is a general server error', () => {
		stub = sinon.stub(mockApis, 'postAuthLogin');
		stub.callsFake((req, res) => res.sendStatus(503));

		return driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-login')).click())
			.then(() => driver.wait(until.elementLocated(By.id('error-alert-message'))));
	});

});
