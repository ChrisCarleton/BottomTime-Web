import { By, until } from 'selenium-webdriver';
import driver from '../web-driver';
import { expect } from 'chai';
import mockApis from '../webapp/mock-apis';
import sinon from 'sinon';

describe('Displaying Logs', () => {

	let stub = null;
	let spy = null;

	afterEach(() => {
		if (spy) {
			spy.restore();
			spy = null;
		}

		if (stub) {
			stub.restore();
			stub = null;
		}
	});

	describe('Sort orders', () => {
		it('Default sort order is by entry time - descending', async () => {
			spy = sinon.spy(mockApis, 'getUsersUsernameLogs');

			await driver.navigate().to('http://localhost:8081/logs/');
			await driver.wait(until.elementLocated(By.id('log-entries-grid')));

			const query = spy.getCall(0).args[0].query;
			expect(query).to.exist;
			expect(query.sortBy).to.equal('entryTime');
			expect(query.sortOrder).to.equal('desc');
		});

		it('Can be changed to sort by max depth', async () => {
			spy = sinon.spy(mockApis, 'getUsersUsernameLogs');

			await driver.navigate().to('http://localhost:8081/logs/');
			await driver.wait(until.elementLocated(By.id('sortBy_maxDepth')));
			await driver.findElement(By.id('sortBy_maxDepth')).click();
			await driver.wait(until.elementLocated(By.id('log-entries-grid')));

			const query = spy.getCall(1).args[0].query;
			expect(query).to.exist;
			expect(query.sortBy).to.equal('maxDepth');
			expect(query.sortOrder).to.equal('desc');
		});

		it('Can be changed to sort by bottom time', async () => {
			spy = sinon.spy(mockApis, 'getUsersUsernameLogs');

			await driver.navigate().to('http://localhost:8081/logs/');
			await driver.wait(until.elementLocated(By.id('sortBy_maxDepth')));
			await driver.findElement(By.id('sortBy_bottomTime')).click();
			await driver.wait(until.elementLocated(By.id('log-entries-grid')));

			const query = spy.getCall(1).args[0].query;
			expect(query).to.exist;
			expect(query.sortBy).to.equal('bottomTime');
			expect(query.sortOrder).to.equal('desc');
		});

		it('Can be changed back to sorting by entry time', async () => {
			spy = sinon.spy(mockApis, 'getUsersUsernameLogs');

			await driver.navigate().to('http://localhost:8081/logs/');
			await driver.wait(until.elementLocated(By.id('sortBy_maxDepth')));
			await driver.findElement(By.id('sortBy_maxDepth')).click();
			await driver.findElement(By.id('sortBy_entryTime')).click();
			await driver.wait(until.elementLocated(By.id('log-entries-grid')));

			let query = spy.getCall(1).args[0].query;
			expect(query).to.exist;
			expect(query.sortBy).to.equal('maxDepth');
			expect(query.sortOrder).to.equal('desc');

			query = spy.getCall(2).args[0].query;
			expect(query).to.exist;
			expect(query.sortBy).to.equal('entryTime');
			expect(query.sortOrder).to.equal('desc');
		});

		it('Can be changed to sort in ascending order', async () => {
			spy = sinon.spy(mockApis, 'getUsersUsernameLogs');

			await driver.navigate().to('http://localhost:8081/logs/');
			await driver.wait(until.elementLocated(By.id('sortOrder')));
			await driver.findElement(By.id('sortOrder')).click();
			await driver.wait(until.elementLocated(By.id('log-entries-grid')));

			const query = spy.getCall(1).args[0].query;
			expect(query).to.exist;
			expect(query.sortBy).to.equal('entryTime');
			expect(query.sortOrder).to.equal('asc');
		});
	});

	describe('Load more', () => {

	});

	describe('Showing no logs', () => {
		it('Will show a helpful message if no logs are returned.', async () => {
			stub = sinon.stub(mockApis, 'getUsersUsernameLogs');
			stub.callsFake((req, res) => { res.json([]); });

			await driver.navigate().to('http://localhost:8081/logs/');
			await driver.wait(until.elementLocated(By.id('no-entries-message')));
		});
	});

});
