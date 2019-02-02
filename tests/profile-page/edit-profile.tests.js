import { By, until } from 'selenium-webdriver';
import driver from '../web-driver';
import { expect } from 'chai';
import faker from 'faker';
import mockApis, { exampleProfile, exampleUser } from '../webapp/mock-apis';
import moment from 'moment';
import sinon from 'sinon';

const Url = 'http://localhost:8081/profile/g.Dog77';

describe('Editing Profiles', () => {
	let getAuthStub = null;
	let getProfileStub = null;
	let testProfile = null;
	let stub = null;
	let spy = null;

	before(() => {
		getAuthStub = sinon.stub(mockApis, 'getAuthMe');
		getProfileStub = sinon.stub(mockApis, 'getUsersUsernameProfile');

		getProfileStub.callsFake((req, res) => {
			res.json(testProfile);
		});

		getAuthStub.callsFake((req, res) => {
			res.json(exampleUser);
		});
	});

	beforeEach(() => {
		testProfile = { ...exampleProfile };
	});

	afterEach(() => {
		if (stub) {
			stub.restore();
			stub = null;
		}

		if (spy) {
			spy.restore();
			spy = null;
		}
	});

	after(() => {
		getProfileStub.restore();
		getAuthStub.restore();
	});

	it('Loads fields correctly', async () => {
		await driver.navigate().to(Url);
		await driver.wait(until.elementLocated(By.id('memberSince')));

		let text = await driver.findElement(By.id('memberSince')).getText();
		expect(text).to.equal('3 years ago');

		text = await driver.findElement(By.id('firstName')).getAttribute('value');
		expect(text).to.equal(testProfile.firstName);

		text = await driver.findElement(By.id('lastName')).getAttribute('value');
		expect(text).to.equal(testProfile.lastName);

		text = await driver.findElement(By.id('location')).getAttribute('value');
		expect(text).to.equal(testProfile.location);

		text = await driver.findElement(By.id('occupation')).getAttribute('value');
		expect(text).to.equal(testProfile.occupation);

		let isChecked = await driver.findElement(By.id('gender_male')).isSelected();
		expect(isChecked).to.be.true;

		text = await driver.findElement(By.id('birthdate')).getAttribute('value');
		expect(text).to.equal(testProfile.birthdate);

		text = await driver.findElement(By.id('about')).getAttribute('value');
		expect(text).to.equal(testProfile.about);

		text = await driver.findElement(By.id('typeOfDiver')).getAttribute('value');
		expect(text).to.equal(testProfile.typeOfDiver);

		text = await driver.findElement(By.id('startedDiving')).getAttribute('value');
		expect(text).to.equal('2013');

		text = await driver.findElement(By.id('certificationLevel')).getAttribute('value');
		expect(text).to.equal(testProfile.certificationLevel);

		text = await driver.findElement(By.id('certificationAgencies')).getAttribute('value');
		expect(text).to.equal(testProfile.certificationAgencies);

		text = await driver.findElement(By.id('specialties')).getAttribute('value');
		expect(text).to.equal(testProfile.specialties);

		isChecked = await driver.findElement(By.id('logsVisibility_public')).isSelected();
		expect(isChecked).to.be.true;
	});

	it('Loads empty fields correctly', async () => {
		testProfile = {
			memberSince: moment().add(-2, 'y').add(-7, 'months').toISOString(),
			logsVisibility: 'public',
			divesLogged: 47,
			bottomTimeLogged: 1748,
			readOnly: false
		};
		await driver.navigate().to(Url);
		await driver.wait(until.elementLocated(By.id('memberSince')));

		let text = await driver.findElement(By.id('memberSince')).getText();
		expect(text).to.equal('3 years ago');

		text = await driver.findElement(By.id('firstName')).getAttribute('value');
		expect(text).to.be.empty;

		text = await driver.findElement(By.id('lastName')).getAttribute('value');
		expect(text).to.be.empty;

		text = await driver.findElement(By.id('location')).getAttribute('value');
		expect(text).to.be.empty;

		text = await driver.findElement(By.id('occupation')).getAttribute('value');
		expect(text).to.be.empty;

		let isChecked = await driver.findElement(By.id('gender_male')).isSelected();
		expect(isChecked).to.be.false;

		isChecked = await driver.findElement(By.id('gender_female')).isSelected();
		expect(isChecked).to.be.false;

		text = await driver.findElement(By.id('birthdate')).getAttribute('value');
		expect(text).to.be.empty;

		text = await driver.findElement(By.id('about')).getAttribute('value');
		expect(text).to.be.empty;

		text = await driver.findElement(By.id('typeOfDiver')).getAttribute('value');
		expect(text).to.be.empty;

		text = await driver.findElement(By.id('startedDiving')).getAttribute('value');
		expect(text).to.be.empty;

		text = await driver.findElement(By.id('certificationLevel')).getAttribute('value');
		expect(text).to.be.empty;

		text = await driver.findElement(By.id('certificationAgencies')).getAttribute('value');
		expect(text).to.be.empty;

		text = await driver.findElement(By.id('specialties')).getAttribute('value');
		expect(text).to.be.empty;

		isChecked = await driver.findElement(By.id('logsVisibility_public')).isSelected();
		expect(isChecked).to.be.true;
	});

	it('Will save changes to the profile', async () => {
		const expected = { ...testProfile };
		delete expected.bottomTimeLogged;
		delete expected.divesLogged;
		delete expected.memberSince;
		delete expected.readOnly;

		testProfile = {
			memberSince: moment().add(-2, 'y').add(-7, 'months').toISOString(),
			logsVisibility: 'friends-only',
			divesLogged: 47,
			bottomTimeLogged: 1748,
			readOnly: false,
			birthdate: expected.birthdate,
			startedDiving: expected.startedDiving
		};

		spy = sinon.spy(mockApis, 'patchUsersUsernameProfile');

		await driver.navigate().to(Url);
		await driver.wait(until.elementLocated(By.id('memberSince')));

		await driver.findElement(By.id('firstName')).sendKeys(expected.firstName);
		await driver.findElement(By.id('lastName')).sendKeys(expected.lastName);
		await driver.findElement(By.id('location')).sendKeys(expected.location);
		await driver.findElement(By.id('occupation')).sendKeys(expected.occupation);
		await driver.findElement(By.id('gender_male')).click();
		await driver.findElement(By.id('about')).sendKeys(expected.about);
		await driver.findElement(By.id('typeOfDiver')).click();
		await driver.findElement(By.css(`option[value='${ expected.typeOfDiver }']`)).click();
		await driver.findElement(By.id('certificationLevel')).click();
		await driver.findElement(By.css(`option[value='${ expected.certificationLevel }']`)).click();
		await driver.findElement(By.id('certificationAgencies')).sendKeys(expected.certificationAgencies);
		await driver.findElement(By.id('specialties')).sendKeys(expected.specialties);
		await driver.findElement(By.id('logsVisibility_public')).click();
		await driver.findElement(By.id('btn-save')).click();

		await driver.wait(until.elementLocated(By.css('.global-error-success')));

		const [ { body, params } ] = spy.getCall(0).args;
		expect(params.username).to.equal('g.Dog77');
		expect(body).to.eql(expected);
	});

	it('Can discard changes made to the profile', async () => {
		const expected = { ...testProfile };

		testProfile = {
			memberSince: moment().add(-2, 'y').add(-7, 'months').toISOString(),
			logsVisibility: 'friends-only',
			divesLogged: 47,
			bottomTimeLogged: 1748,
			readOnly: false
		};

		spy = sinon.spy(mockApis, 'patchUsersUsernameProfile');

		await driver.navigate().to(Url);
		await driver.wait(until.elementLocated(By.id('memberSince')));

		await driver.findElement(By.id('firstName')).sendKeys(expected.firstName);
		await driver.findElement(By.id('lastName')).sendKeys(expected.lastName);
		await driver.findElement(By.id('gender_male')).click();
		await driver.findElement(By.id('birthdate')).sendKeys(`${ expected.birthdate }\t`);
		await driver.findElement(By.id('certificationLevel')).click();
		await driver.findElement(By.css(`option[value='${ expected.certificationLevel }']`)).click();
		await driver.findElement(By.id('logsVisibility_public')).click();
		await driver.findElement(By.id('btn-reset')).click();

		await driver.wait(until.elementLocated(By.id('btn-confirm-discard')));
		await driver.findElement(By.id('btn-confirm-discard')).click();

		expect(spy.called).to.be.false;

		let text = await driver.findElement(By.id('firstName')).getAttribute('value');
		expect(text).to.be.empty;

		text = await driver.findElement(By.id('lastName')).getAttribute('value');
		expect(text).to.be.empty;

		let isChecked = await driver.findElement(By.id('gender_male')).isSelected();
		expect(isChecked).to.be.false;

		isChecked = await driver.findElement(By.id('gender_female')).isSelected();
		expect(isChecked).to.be.false;

		text = await driver.findElement(By.id('certificationLevel')).getAttribute('value');
		expect(text).to.be.empty;

		text = await driver.findElement(By.id('certificationAgencies')).getAttribute('value');
		expect(text).to.be.empty;

		text = await driver.findElement(By.id('specialties')).getAttribute('value');
		expect(text).to.be.empty;

		isChecked = await driver.findElement(By.id('logsVisibility_friends-only')).isSelected();
		expect(isChecked).to.be.true;
	});

	it('Can cancel discarding changes made to the profile', async () => {
		const expected = { ...testProfile };

		testProfile = {
			memberSince: moment().add(-2, 'y').add(-7, 'months').toISOString(),
			logsVisibility: 'friends-only',
			divesLogged: 47,
			bottomTimeLogged: 1748,
			readOnly: false
		};

		spy = sinon.spy(mockApis, 'patchUsersUsernameProfile');

		await driver.navigate().to(Url);
		await driver.wait(until.elementLocated(By.id('memberSince')));

		await driver.findElement(By.id('firstName')).sendKeys(expected.firstName);
		await driver.findElement(By.id('lastName')).sendKeys(expected.lastName);
		await driver.findElement(By.id('gender_male')).click();
		await driver.findElement(By.id('birthdate')).sendKeys(`${ expected.birthdate }\t`);
		await driver.findElement(By.id('certificationLevel')).click();
		await driver.findElement(By.css(`option[value='${ expected.certificationLevel }']`)).click();
		await driver.findElement(By.id('logsVisibility_public')).click();
		await driver.findElement(By.id('btn-reset')).click();

		await driver.wait(until.elementLocated(By.id('btn-cancel-discard')));
		await driver.findElement(By.id('btn-cancel-discard')).click();

		expect(spy.called).to.be.false;
	});

	[
		{ field: 'firstName', maxLength: 50 },
		{ field: 'lastName', maxLength: 50 },
		{ field: 'location', maxLength: 100 },
		{ field: 'occupation', maxLength: 50 },
		{ field: 'certificationAgencies', maxLength: 100 },
		{ field: 'specialties', maxLength: 200 },
		{ field: 'about', maxLength: 1000 }
	].forEach(t =>
		it(`Respects max length of ${ t.field }`, async () => {
			const text = faker.lorem.words(80).substr(0, t.maxLength + 1);
			const about = faker.lorem.paragraphs(14).substr(0, 990);
			const specialties = faker.lorem.words(80).substr(0, 190);

			testProfile = {
				memberSince: moment().add(-2, 'y').add(-7, 'months').toISOString(),
				logsVisibility: 'friends-only',
				divesLogged: 47,
				bottomTimeLogged: 1748,
				readOnly: false,
				about,
				specialties
			};

			await driver.navigate().to(Url);
			await driver.wait(until.elementLocated(By.id('memberSince')));

			const element = await driver.findElement(By.id(t.field));
			await element.sendKeys(text);

			const value = await element.getAttribute('value');
			expect(value).to.have.length(t.maxLength);
		})
	);

	it('Birthdate must be a valid date', async () => {
		delete testProfile.birthdate;

		await driver.navigate().to(Url);
		await driver.wait(until.elementLocated(By.id('memberSince')));

		await driver.findElement(By.id('birthdate')).sendKeys('not valid\t');
		await driver.wait(until.elementLocated(By.id('err-birthdate')));
	});

	it('Birthdate must be no sooner than 10 years ago', async () => {
		testProfile.birthdate = moment().subtract(7, 'y').format('YYYY');

		await driver.navigate().to(Url);
		await driver.wait(until.elementLocated(By.id('memberSince')));

		await driver.findElement(By.id('btn-save')).click();
		await driver.wait(until.elementLocated(By.id('err-birthdate')));
	});

	it('Stared diving must be a valid year', async () => {
		testProfile.startedDiving = 'not valid';

		await driver.navigate().to(Url);
		await driver.wait(until.elementLocated(By.id('memberSince')));

		await driver.findElement(By.id('btn-save')).click();
		await driver.wait(until.elementLocated(By.id('err-startedDiving')));
	});

	it('Started diving must not be in the future', async () => {
		testProfile.startedDiving = moment().add(1, 'y').format('YYYY');

		await driver.navigate().to(Url);
		await driver.wait(until.elementLocated(By.id('memberSince')));

		await driver.findElement(By.id('btn-save')).click();
		await driver.wait(until.elementLocated(By.id('err-startedDiving')));
	});
});
