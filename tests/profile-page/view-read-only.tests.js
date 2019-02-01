import { By, until } from 'selenium-webdriver';
import driver from '../web-driver';
import { expect } from 'chai';
import mockApis, { exampleUser } from '../webapp/mock-apis';
import moment from 'moment';
import sinon from 'sinon';

describe('Viewing Read-Only Profiles', () => {
	let getAuthStub = null;
	let getProfileStub = null;
	let testProfile = null;
	let stub = null;

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
		testProfile = {
			memberSince: moment().add(-2, 'y').add(-7, 'months').toISOString(),
			logsVisibility: 'public',
			firstName: 'Jerard',
			lastName: 'Lapain',
			location: 'Paris, France',
			occupation: 'Painter',
			gender: 'male',
			birthdate: '1985-04-12',
			typeOfDiver: 'Casual/Vacation Diver',
			startedDiving: 2013,
			certificationLevel: 'Advanced Open Water',
			certificationAgencies: 'SSI',
			specialties: 'Nitrox, Night Diver',
			about: 'J\'aime beaucoup la plange! C\'est magnifique!',
			divesLogged: 47,
			bottomTimeLogged: 1748,
			readOnly: true
		};
	});

	afterEach(() => {
		if (stub) {
			stub.restore();
			stub = null;
		}
	});

	after(() => {
		getProfileStub.restore();
		getAuthStub.restore();
	});

	it('Loads fields as expected', async () => {
		await driver.navigate().to('http://localhost:8081/profile/g.Dog77');
		await driver.wait(until.elementLocated(By.id('memberSince')));
		let text = await driver.findElement(By.id('memberSince')).getText();
		expect(text).to.equal('3 years ago');

		text = await driver.findElement(By.id('name')).getText();
		expect(text).to.equal(`${ testProfile.firstName } ${ testProfile.lastName }`);

		text = await driver.findElement(By.id('location')).getText();
		expect(text).to.equal(testProfile.location);

		text = await driver.findElement(By.id('occupation')).getText();
		expect(text).to.equal(testProfile.occupation);

		text = await driver.findElement(By.id('gender')).getText();
		expect(text).to.equal('Male');

		text = await driver.findElement(By.id('birthdate')).getText();
		expect(text).to.equal('April 12, 1985');

		text = await driver.findElement(By.id('about')).getText();
		expect(text).to.equal(testProfile.about);

		text = await driver.findElement(By.id('divesLogged')).getText();
		expect(text).to.equal('47');

		text = await driver.findElement(By.id('bottomTimeLogged')).getText();
		expect(text).to.equal('a day (1748 minutes)');

		text = await driver.findElement(By.id('typeOfDiver')).getText();
		expect(text).to.equal(testProfile.typeOfDiver);

		text = await driver.findElement(By.id('startedDiving')).getText();
		expect(text).to.equal('2013');

		text = await driver.findElement(By.id('certificationLevel')).getText();
		expect(text).to.equal(testProfile.certificationLevel);

		text = await driver.findElement(By.id('certificationAgencies')).getText();
		expect(text).to.equal(testProfile.certificationAgencies);

		text = await driver.findElement(By.id('specialties')).getText();
		expect(text).to.equal(testProfile.specialties);
	});

	it('Loads empty fields as expected', async () => {
		const Expected = 'unspecified';
		testProfile = {
			memberSince: moment().add(-2, 'y').add(-7, 'months').toISOString(),
			logsVisibility: 'public',
			divesLogged: 47,
			bottomTimeLogged: 1748,
			readOnly: true
		};

		await driver.navigate().to('http://localhost:8081/profile/g.Dog77');
		await driver.wait(until.elementLocated(By.id('memberSince')));
		let text = await driver.findElement(By.id('memberSince')).getText();
		expect(text).to.equal('3 years ago');

		text = await driver.findElement(By.id('name')).getText();
		expect(text).to.equal(Expected);

		text = await driver.findElement(By.id('location')).getText();
		expect(text).to.equal(Expected);

		text = await driver.findElement(By.id('occupation')).getText();
		expect(text).to.equal(Expected);

		text = await driver.findElement(By.id('gender')).getText();
		expect(text).to.equal(Expected);

		text = await driver.findElement(By.id('birthdate')).getText();
		expect(text).to.equal(Expected);

		text = await driver.findElement(By.id('about')).getText();
		expect(text).to.equal(Expected);

		text = await driver.findElement(By.id('divesLogged')).getText();
		expect(text).to.equal('47');

		text = await driver.findElement(By.id('bottomTimeLogged')).getText();
		expect(text).to.equal('a day (1748 minutes)');

		text = await driver.findElement(By.id('typeOfDiver')).getText();
		expect(text).to.equal(Expected);

		text = await driver.findElement(By.id('startedDiving')).getText();
		expect(text).to.equal(Expected);

		text = await driver.findElement(By.id('certificationLevel')).getText();
		expect(text).to.equal(Expected);

		text = await driver.findElement(By.id('certificationAgencies')).getText();
		expect(text).to.equal(Expected);

		text = await driver.findElement(By.id('specialties')).getText();
		expect(text).to.equal(Expected);
	});

	it('Displays name correctly if no first name is supplied', async () => {
		testProfile.firstName = null;

		await driver.navigate().to('http://localhost:8081/profile/g.Dog77');
		await driver.wait(until.elementLocated(By.id('name')));

		const text = await driver.findElement(By.id('name')).getText();
		expect(text).to.equal(testProfile.lastName);
	});

	it('Displays name correctly if no last name is supplied', async () => {
		testProfile.lastName = null;

		await driver.navigate().to('http://localhost:8081/profile/g.Dog77');
		await driver.wait(until.elementLocated(By.id('name')));

		const text = await driver.findElement(By.id('name')).getText();
		expect(text).to.equal(testProfile.firstName);
	});

	it('Displays dives logged correctly if the number is zero', async () => {
		testProfile.divesLogged = 0;

		await driver.navigate().to('http://localhost:8081/profile/g.Dog77');
		await driver.wait(until.elementLocated(By.id('divesLogged')));

		const text = await driver.findElement(By.id('divesLogged')).getText();
		expect(text).to.equal('0');
	});

	it('Displays bottom time correctly if the number is zero', async () => {
		testProfile.bottomTimeLogged = 0;

		await driver.navigate().to('http://localhost:8081/profile/g.Dog77');
		await driver.wait(until.elementLocated(By.id('bottomTimeLogged')));

		const text = await driver.findElement(By.id('bottomTimeLogged')).getText();
		expect(text).to.equal('0 minutes');
	});

	it('Displays bottom time correctly if the number less than 60 minutes', async () => {
		testProfile.bottomTimeLogged = 32;

		await driver.navigate().to('http://localhost:8081/profile/g.Dog77');
		await driver.wait(until.elementLocated(By.id('bottomTimeLogged')));

		const text = await driver.findElement(By.id('bottomTimeLogged')).getText();
		expect(text).to.equal('32 minutes');
	});
});
