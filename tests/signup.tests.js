import { By, until } from 'selenium-webdriver';
import driver from './web-driver';
import { expect } from 'chai';
import mockApis, { ErrorIds } from './webapp/mock-apis';
import sinon from 'sinon';

describe('Sign up page', () => {

	const user = {
		username: 'Jake.McHardy24',
		email: 'jake.mch@gmail.com',
		password: 'I@amTehJ3ek!'
	};

	function refreshPage() {
		return driver.navigate().to('http://localhost:8081/signup/')
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

	it('catches usernames that are too short', () =>
		driver.findElement(By.id('username')).sendKeys('Tim')
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-username'))))
	);

	it('catches usernames that are invalid', () =>
		driver.findElement(By.id('username')).sendKeys('Well this won\'t do!!')
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-username'))))
	);

	it('catches usernames that are too long', () =>
		driver.findElement(By.id('username'))
			.sendKeys(
				'This.Username.May.Technically.Be.Valid.However.It.Is.Certainly.Far.Too.Long'
			)
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-username'))))
	);

	it('catches missing usernames', () =>
		driver.findElement(By.id('email')).sendKeys(user.email)
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-username'))))
	);

	it('catches emails that are invalid', () =>
		driver.findElement(By.id('email')).sendKeys('http://email_address.com/')
			.then(() => driver.findElement(By.id('username')).sendKeys(user.username))
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-email'))))
	);

	it('catches missing emails', () =>
		driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-email'))))
	);

	it('catches missing password', () =>
		driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-password'))))
	);

	it('catches weak password', () =>
		driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('password')).sendKeys('LongEnoughButWeak'))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-password'))))
	);

	it('catches password that is too short', () =>
		driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('password')).sendKeys('!23abc'))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-password'))))

	);

	it('catches password that is too long', () =>
		driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('password')).sendKeys(
				'R3@lly.G00d.P@zzw3rdz--But__G0nn@Bee!2!L0000ng! Seri0slee! T00long$'
			))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-password'))))
	);

	it('catches missing confirm password', () =>
		driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-confirmPassword'))))
	);

	it('catches mismatched confirm password', () =>
		driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(`${ user.password }...n0t!`))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('err-confirmPassword'))))
	);

	it('succeeds when form is valid', () =>
		driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.urlIs('http://localhost:8081/')))
			.then(() => driver.wait(until.elementLocated(By.id('user-nav-dropdown'))))
			.then(() => driver.findElement(By.id('user-nav-dropdown')).getText())
			.then(text => expect(text).to.equal(user.username))
	);

	it('reports error when there is a conflict in username', () => {
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

		return driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('error-alert-message'))))
			.then(() => driver.findElement(By.id('error-alert-message')).getText())
			.then(text => expect(text).to.equal(message));
	});

	it('reports error when there is a conflict in email address', () => {
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

		return driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('error-alert-message'))))
			.then(() => driver.findElement(By.id('error-alert-message')).getText())
			.then(text => expect(text).to.equal(message));
	});

	it('reports general error if there is a problem reaching the server', () => {
		stub = sinon.stub(mockApis, 'putUsersUsername');
		stub.callsFake((req, res) => res.sendStatus(503));

		return driver.findElement(By.id('username')).sendKeys(user.username)
			.then(() => driver.findElement(By.id('email')).sendKeys(user.email))
			.then(() => driver.findElement(By.id('password')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('confirmPassword')).sendKeys(user.password))
			.then(() => driver.findElement(By.id('btn-sign-up')).click())
			.then(() => driver.wait(until.elementLocated(By.id('error-alert-message'))));
	});
});
