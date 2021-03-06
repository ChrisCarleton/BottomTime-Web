import { By, until } from 'selenium-webdriver';
import driver from './web-driver';
import { expect } from 'chai';
import mockApis, { ErrorIds } from './webapp/mock-apis';
import sinon from 'sinon';

const SignupUrl = mockApis.resolveUrl('/signup');
const WelcomeUrl = mockApis.resolveUrl('/welcome');

describe('Sign up page', () => {

	const user = {
		username: 'Jake.McHardy24',
		email: 'jake.mch@gmail.com',
		password: 'I@amTehJ3ek!'
	};

	async function refreshPage() {
		await driver.navigate().to(SignupUrl);
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

	it('catches usernames that are too short', async () => {
		await driver.findElement(By.id('username')).sendKeys('Tim');
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('err-username')));
	});

	it('catches usernames that are invalid', async () => {
		await driver.findElement(By.id('username')).sendKeys('Well this won\'t do!!');
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('err-username')));
	});

	it('catches usernames that are too long', async () => {
		stub = sinon.spy(mockApis, 'putUsersUsername');

		const element = await driver.findElement(By.id('username'));
		await element.sendKeys('This.Username.May.Technically.Be.Valid.However.It.Is.Certainly.Far.Too.Long');
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.urlIs(WelcomeUrl));

		const [ { params } ] = stub.getCall(0).args;
		expect(params.username).to.have.length(50);
	});

	it('catches missing usernames', async () => {
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('err-username')));
	});

	it('catches emails that are invalid', async () => {
		await driver.findElement(By.id('email')).sendKeys('http://email_address.com/');
		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('err-email')));
	});

	it('catches missing emails', async () => {
		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('err-email')));
	});

	it('catches missing password', async () => {
		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('err-password')));
	});

	it('catches weak password', async () => {
		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys('LongEnoughButWeak');
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('err-password')));
	});

	it('catches password that is too short', async () => {
		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys('!23abc');
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('err-password')));
	});

	it('catches password that is too long', async () => {
		const password = 'R3@lly.G00d.P@zzw3rdz--But__G0nn@Bee!2!L0000ng! Seri0slee! T00long$';
		stub = sinon.spy(mockApis, 'putUsersUsername');

		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys(password);
		await driver.findElement(By.id('confirmPassword')).sendKeys(password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.urlIs(WelcomeUrl));

		const [ { body } ] = stub.getCall(0).args;
		expect(body.password).to.have.length(50);
	});

	it('catches missing confirm password', async () => {
		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('err-confirmPassword')));
	});

	it('catches mismatched confirm password', async () => {
		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('confirmPassword')).sendKeys(`${ user.password }...n0t!`);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('err-confirmPassword')));
	});

	it('succeeds when form is valid', async () => {
		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.urlIs(WelcomeUrl));
		await driver.wait(until.elementLocated(By.id('user-nav-dropdown')));

		const text = await driver.findElement(By.id('user-nav-dropdown')).getText();
		expect(text).to.equal(user.username);
	});

	it('reports error when there is a conflict in username', async () => {
		const field = 'username';
		const message = `There was a conflict in field ${ field }.`;

		stub = sinon.stub(mockApis, 'putUsersUsername');
		stub.callsFake((req, res) =>
			res.status(409).json({
				errorId: ErrorIds.conflict,
				status: 409,
				fieldName: field,
				message,
				details: 'Username is taken.'
			})
		);

		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('global-error-bar')));
	});

	it('reports error when there is a conflict in email address', async () => {
		const field = 'email';
		const message = `There was a conflict in field ${ field }.`;

		stub = sinon.stub(mockApis, 'putUsersUsername');
		stub.callsFake((req, res) =>
			res.status(409).json({
				errorId: ErrorIds.conflict,
				status: 409,
				fieldName: field,
				message,
				details: 'Username is taken.'
			})
		);

		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('global-error-bar')));
	});

	it('reports general error if there is a problem reaching the server', async () => {
		stub = sinon.stub(mockApis, 'putUsersUsername');
		stub.callsFake((req, res) => res.sendStatus(503));

		await driver.findElement(By.id('username')).sendKeys(user.username);
		await driver.findElement(By.id('email')).sendKeys(user.email);
		await driver.findElement(By.id('password')).sendKeys(user.password);
		await driver.findElement(By.id('confirmPassword')).sendKeys(user.password);
		await driver.findElement(By.id('btn-sign-up')).click();
		await driver.wait(until.elementLocated(By.id('global-error-bar')));
	});
});
