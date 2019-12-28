import { By, until } from 'selenium-webdriver';
import driver from './web-driver';
import { expect } from 'chai';
import faker from 'faker';
import mockApis, { exampleUser } from './webapp/mock-apis';
import sinon from 'sinon';

const UsernameTextId = 'username';
const UsernameErrorId = 'err-username';
const EmailTextId = 'email';
const EmailErrorId = 'err-email';
const FirstNameTextId = 'firstName';
const LastNameTextId = 'lastName';
const SubmitButtonId = 'btn-complete-reg';
const WelcomePageUrl = mockApis.resolveUrl('/welcome');

const LongString = faker.lorem.words(15);

describe('Complete registration page', () => {

	const ExpectedUsername = 'fred33';
	const NewUser = {
		...exampleUser,
		username: '71fd8924-24d7-11ea-a870-08606e10bc93',
		email: 'jerry.roflton@lulz.com',
		isRegistrationIncomplete: true,
		hasPassword: false
	};
	let authMeStub = null;
	let stub = null;

	async function refreshPage() {
		await driver.navigate().to(mockApis.resolveUrl('/'));
		await driver.wait(until.elementLocated(By.id(UsernameTextId)));
	}

	before(() => {
		authMeStub = sinon.stub(mockApis, 'getAuthMe');
		authMeStub.callsFake((req, res) => res.json(NewUser));
	});
	beforeEach(refreshPage);

	afterEach(() => {
		if (stub) {
			stub.restore();
			stub = null;
		}
	});
	after(() => {
		authMeStub.restore();
	});

	it('Will catch missing username', async () => {
		await driver.findElement(By.id(SubmitButtonId)).click();
		await driver.wait(until.elementLocated(By.id(UsernameErrorId)));
	});

	it('Will catch username if it is too short', async () => {
		await driver.findElement(By.id(UsernameTextId)).sendKeys('Joe');
		await driver.findElement(By.id(SubmitButtonId)).click();
		await driver.wait(until.elementLocated(By.id(UsernameErrorId)));
	});

	it('Will catch username if it is too long', async () => {
		stub = sinon.spy(mockApis, 'postUsersUsernameCompleteRegistration');

		const longUsername = 'Oh.Snap.This.Is.A.Long.Ass.User.Name.No.Way.Will.This.Be.Accepted.Awww.Jeez';
		await driver.findElement(By.id(UsernameTextId)).sendKeys(longUsername);
		await driver.findElement(By.id(SubmitButtonId)).click();
		await driver.wait(until.urlIs(WelcomePageUrl));

		const [ { body, params } ] = stub.getCall(0).args;
		expect(params.username).to.equal(NewUser.username);
		expect(body.username).to.equal(longUsername.substr(0, 50));
	});

	it('Will catch username if it is invalid', async () => {
		await driver.findElement(By.id(UsernameTextId)).sendKeys('@@ Nope!');
		await driver.findElement(By.id(SubmitButtonId)).click();
		await driver.wait(until.elementLocated(By.id(UsernameErrorId)));
	});

	it('Will catch missing email', async () => {
		const emailText = await driver.findElement(By.id(EmailTextId));
		await driver.findElement(By.id(UsernameTextId)).sendKeys(ExpectedUsername);
		await emailText.clear();

		// Don't know why this is necessary. :( Why doesn't .clear() work without this?
		await emailText.sendKeys('b\b');

		await driver.findElement(By.id(SubmitButtonId)).click();
		await driver.wait(until.elementLocated(By.id(EmailErrorId)));
	});

	it('Will catch email that is invalid', async () => {
		const emailText = await driver.findElement(By.id(EmailTextId));
		await driver.findElement(By.id(UsernameTextId)).sendKeys(ExpectedUsername);
		await emailText.clear();
		await emailText.sendKeys('not an email');
		await driver.findElement(By.id(SubmitButtonId)).click();
		await driver.wait(until.elementLocated(By.id(EmailErrorId)));
	});

	it('Will catch email that is too long', async () => {
		const longEmail = 'Gerald_Montgomery_Abercrombie_Sinclair_The_Third@Unnecessarily.Long.Domain.co.uk';
		const emailText = await driver.findElement(By.id(EmailTextId));
		stub = sinon.spy(mockApis, 'postUsersUsernameCompleteRegistration');
		await driver.findElement(By.id(UsernameTextId)).sendKeys(ExpectedUsername);
		await emailText.clear();
		await emailText.sendKeys(longEmail);
		await driver.findElement(By.id(SubmitButtonId)).click();

		const [ { body } ] = stub.getCall(0).args;
		expect(body.email).to.equal(longEmail.substr(0, 70));
	});

	it('Will catch long first names', async () => {
		stub = sinon.spy(mockApis, 'postUsersUsernameCompleteRegistration');
		await driver.findElement(By.id(UsernameTextId)).sendKeys(ExpectedUsername);
		await driver.findElement(By.id(FirstNameTextId)).sendKeys(LongString);
		await driver.findElement(By.id(SubmitButtonId)).click();

		const [ { body } ] = stub.getCall(0).args;
		expect(body.firstName).to.equal(LongString.substr(0, 50));
	});

	it('Will catch long last names', async () => {
		stub = sinon.spy(mockApis, 'postUsersUsernameCompleteRegistration');
		await driver.findElement(By.id(UsernameTextId)).sendKeys(ExpectedUsername);
		await driver.findElement(By.id(LastNameTextId)).sendKeys(LongString);
		await driver.findElement(By.id(SubmitButtonId)).click();

		const [ { body } ] = stub.getCall(0).args;
		expect(body.lastName).to.equal(LongString.substr(0, 50));
	});

	it('Will succeed if form data is valid', async () => {
		const ExpectedSubmit = {
			username: ExpectedUsername,
			email: NewUser.email,
			firstName: 'Jerry',
			lastName: 'Roflton',
			distanceUnit: 'ft',
			logsVisibility: 'public',
			pressureUnit: 'psi',
			temperatureUnit: 'f',
			weightUnit: 'lbs'
		};
		stub = sinon.spy(mockApis, 'postUsersUsernameCompleteRegistration');
		await driver.findElement(By.id(UsernameTextId)).sendKeys(ExpectedUsername);
		await driver.findElement(By.id(FirstNameTextId)).sendKeys(ExpectedSubmit.firstName);
		await driver.findElement(By.id(LastNameTextId)).sendKeys(ExpectedSubmit.lastName);
		await driver.findElement(By.id('logsVisibility_public')).click();
		await driver.findElement(By.id('distanceUnit_ft')).click();
		await driver.findElement(By.id('temperatureUnit_f')).click();
		await driver.findElement(By.id('pressureUnit_psi')).click();
		await driver.findElement(By.id('weightUnit_lbs')).click();
		await driver.findElement(By.id(SubmitButtonId)).click();
		await driver.wait(until.urlIs(WelcomePageUrl));

		const [ { body } ] = stub.getCall(0).args;
		expect(body).to.eql(ExpectedSubmit);
	});
});
