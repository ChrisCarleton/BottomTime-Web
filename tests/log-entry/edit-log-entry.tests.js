import { By, until } from 'selenium-webdriver';
import driver from '../web-driver';
import { expect } from 'chai';
import faker from 'faker';
import mockApis, { exampleUser } from '../webapp/mock-apis';
import sinon from 'sinon';

const NewEntryUrl = 'http://localhost:8081/logs/jake_smith/new';
// const EntryUrl = `http://localhost:8081/logs/jake_smith/${ logEntries[0].entryId }`;

async function refreshPage(url) {
	await driver.navigate().to(url);
	await driver.wait(until.elementLocated(By.id('location')));
}

describe('Editing Log Entries', () => {
	describe('Validation', () => {
		let authStub = null;

		before(() => {
			authStub = sinon.stub(mockApis, 'getAuthMe');
			authStub.callsFake((req, res) => {
				res.json(exampleUser);
			});
		});

		after(() => {
			authStub.restore();
			authStub = null;
		});

		const LongString = faker.lorem.sentences(8).substr(0, 201);

		beforeEach(async () => {
			await refreshPage(NewEntryUrl);
		});

		it('Will not allow location to be longer than 200 characters', async () => {
			const element = await driver.findElement(By.id('location'));
			await element.sendKeys(LongString);
			const value = await element.getAttribute('value');
			expect(value).to.have.lengthOf(200);
		});

		it('Will not allow site to be longer than 200 characters', async () => {
			const element = await driver.findElement(By.id('site'));
			await element.sendKeys(LongString);
			const value = await element.getAttribute('value');
			expect(value).to.have.lengthOf(200);
		});

		it('Entry time must be valid', async () => {
			await driver.findElement(By.id('entryTime')).sendKeys('not a valid date');
			await driver.findElement(By.id('btn-save')).click();
			await driver.findElement(By.id('err-entryTime'));
		});

		it('Bottom time must be a number', async () => {
			await driver.findElement(By.id('bottomTime')).sendKeys('seven');
			await driver.findElement(By.id('btn-save')).click();
			await driver.findElement(By.id('err-bottomTime'));
		});

		it('Bottom time must be positive', async () => {
			await driver.findElement(By.id('bottomTime')).sendKeys('0');
			await driver.findElement(By.id('btn-save')).click();
			await driver.findElement(By.id('err-bottomTime'));
		});

		it('Total time must be a number', async () => {
			await driver.findElement(By.id('totalTime')).sendKeys('seven');
			await driver.findElement(By.id('btn-save')).click();
			await driver.findElement(By.id('err-totalTime'));
		});

		it('Total time must be positive', async () => {
			await driver.findElement(By.id('totalTime')).sendKeys('0');
			await driver.findElement(By.id('btn-save')).click();
			await driver.findElement(By.id('err-totalTime'));
		});

		it('Total time must be greater than or equal to bottom time', async () => {
			await driver.findElement(By.id('bottomTime')).sendKeys('31');
			await driver.findElement(By.id('totalTime')).sendKeys('30.6');
			await driver.findElement(By.id('btn-save')).click();
			await driver.wait(until.elementLocated(By.id('err-totalTime')));
		});

		it('Latitude must be a number', async () => {
			await driver.findElement(By.id('gps_latitude')).sendKeys('nope');
			await driver.findElement(By.id('gps_longitude')).sendKeys('114.38484');
			await driver.findElement(By.id('btn-save')).click();
			await driver.wait(until.elementLocated(By.id('err-gps_latitude')));
		});

		it('Latitude cannot be less than -90.0 degrees', async () => {
			await driver.findElement(By.id('gps_latitude')).sendKeys('-90.32324');
			await driver.findElement(By.id('gps_longitude')).sendKeys('114.38484');
			await driver.findElement(By.id('btn-save')).click();
			await driver.wait(until.elementLocated(By.id('err-gps_latitude')));
		});

		it('Latitude cannot be more than 90 degrees', async () => {
			await driver.findElement(By.id('gps_latitude')).sendKeys('90.5373582');
			await driver.findElement(By.id('gps_longitude')).sendKeys('114.38484');
			await driver.findElement(By.id('btn-save')).click();
			await driver.wait(until.elementLocated(By.id('err-gps_latitude')));
		});

		it('longitude must be a number', async () => {
			await driver.findElement(By.id('gps_latitude')).sendKeys('14.38394');
			await driver.findElement(By.id('gps_longitude')).sendKeys('nope');
			await driver.findElement(By.id('btn-save')).click();
			await driver.wait(until.elementLocated(By.id('err-gps_longitude')));
		});

		it('longitude cannot be less than -180 degrees', async () => {
			await driver.findElement(By.id('gps_latitude')).sendKeys('14.38394');
			await driver.findElement(By.id('gps_longitude')).sendKeys('-180.45782575');
			await driver.findElement(By.id('btn-save')).click();
			await driver.wait(until.elementLocated(By.id('err-gps_longitude')));
		});

		it('longitude cannot be more than 180 degrees', async () => {
			await driver.findElement(By.id('gps_latitude')).sendKeys('14.38394');
			await driver.findElement(By.id('gps_longitude')).sendKeys('180.35735735');
			await driver.findElement(By.id('btn-save')).click();
			await driver.wait(until.elementLocated(By.id('err-gps_longitude')));
		});

		it('if longitude is entered, latitude must also be present', async () => {
			await driver.findElement(By.id('location')).sendKeys('Roatan');
			await driver.findElement(By.id('site')).sendKeys('Mary\'s Place');
			await driver.findElement(By.id('entryTime')).sendKeys('2016-02-04 10:30AM');
			await driver.findElement(By.id('gps_longitude')).sendKeys('17.32828');
			await driver.findElement(By.id('btn-save')).click();
			await driver.wait(until.elementLocated(By.id('err-gps_latitude')));
		});

		it('if latitude is entered, longitude must also be present', async () => {
			await driver.findElement(By.id('location')).sendKeys('Roatan');
			await driver.findElement(By.id('site')).sendKeys('Mary\'s Place');
			await driver.findElement(By.id('entryTime')).sendKeys('2016-02-04 10:30AM');
			await driver.findElement(By.id('gps_latitude')).sendKeys('14.38394');
			await driver.findElement(By.id('btn-save')).click();
			await driver.wait(until.elementLocated(By.id('err-gps_longitude')));
		});

		it('Average depth must be a number', async () => {
			await driver.findElement(By.id('averageDepth')).sendKeys('seven');
			await driver.findElement(By.id('btn-save')).click();
			await driver.findElement(By.id('err-averageDepth'));
		});

		it('Average depth must be positive', async () => {
			await driver.findElement(By.id('averageDepth')).sendKeys('0');
			await driver.findElement(By.id('btn-save')).click();
			await driver.findElement(By.id('err-averageDepth'));

		});

		it('Max depth must be a number', async () => {
			await driver.findElement(By.id('maxDepth')).sendKeys('seven');
			await driver.findElement(By.id('btn-save')).click();
			await driver.findElement(By.id('err-maxDepth'));
		});

		it('Max depth must be positive', async () => {
			await driver.findElement(By.id('maxDepth')).sendKeys('0');
			await driver.findElement(By.id('btn-save')).click();
			await driver.findElement(By.id('err-maxDepth'));
		});

		it('Max depth cannot be less than average depth', async () => {
			await driver.findElement(By.id('averageDepth')).sendKeys('24');
			await driver.findElement(By.id('maxDepth')).sendKeys('23.8');
			await driver.findElement(By.id('btn-save')).click();
			await driver.findElement(By.id('err-maxDepth'));
		});

		it('Weight amount must be a number', async () => {
			await driver.findElement(By.id('weight_amount')).sendKeys('lol');
			await driver.findElement(By.id('btn-save')).click();
			await driver.findElement(By.id('err-weight_amount'));
		});

		it('Weight amount must be positive', async () => {
			await driver.findElement(By.id('weight_amount')).sendKeys('-0.1');
			await driver.findElement(By.id('btn-save')).click();
			await driver.findElement(By.id('err-weight_amount'));
		});
	});

	// describe('Discard changes', () => {

	// });

	// describe('Submission', () => {

	// });
});