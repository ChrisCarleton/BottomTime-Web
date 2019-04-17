import { By, until } from 'selenium-webdriver';
import driver from '../web-driver';
import { expect } from 'chai';
import mockApis, { logEntries } from '../webapp/mock-apis';
import sinon from 'sinon';

async function refreshPage(url) {
	await driver.navigate().to(url);
	await driver.wait(until.elementLocated(By.id('location')));
}

const NewEntryUrl = 'http://localhost:8081/logs/jake_smith/new';
const EntryUrl = `http://localhost:8081/logs/jake_smith/${ logEntries[0].entryId }`;

describe('Loading and Submitting Log Entries', () => {
	let stub = null;

	afterEach(() => {
		if (stub) {
			stub.restore();
			stub = null;
		}
	});

	it('Read-only entries are displayed on a read-only page', async () => {
		const logEntry = {
			...logEntries[0],
			isReadOnly: true
		};

		stub = sinon.stub(mockApis, 'getUsersUsernameLogsLogId');
		stub.callsFake((req, res) => {
			res.json(logEntry);
		});

		await refreshPage(EntryUrl);
		expect(async () => {
			await driver.findElement(By.id('btn-save'));
		}).to.throw;
	});

	[
		{ mode: 'read-only', isReadOnly: true },
		{ mode: 'read-write', isReadOnly: false }
	].forEach(t => {
		it(`Weight can be rendered in lbs in ${ t.mode } mode`, async () => {
			const logEntry = {
				...logEntries[0],
				isReadOnly: t.isReadOnly
			};

			stub = sinon.stub(mockApis, 'getUsersUsernameLogsLogId');
			stub.callsFake((req, res) => {
				res.json(logEntry);
			});

			await refreshPage(EntryUrl);
			// TODO: Figure this out.
		});

		it(`Depth can be rendered in ft in ${ t.mode } mode`, async () => {

		});

		it.skip(`Temperature can be rendered in °F in ${ t.mode }`, async () => {
			// TODO: Add some fields to record temperature so we can test this.
		});
	});

	it('Weight can be submitted in lbs', async () => {

	});

	it('Depth can be submitted in ft', async () => {

	});

	it.skip('Temperature can be submitted in °F', async () => {
		// TODO: Add some fields to record temperature so we can test this.
	});

	it('Page redirects to Not Found page if entry is not found', async () => {

	});

	it('Page redirects to Forbidden page if user does not have permission to view the entry', async () => {

	});

	it('Anonymous users are redirected to login page if user tries to create a new entry', async () => {

	});

	it('Anonymous users are redirected to login page if user tries to view a protected log entry', async () => {

	});

	it('Page redirects to Forbidden if user tries to update an entry they have no access to', async () => {

	});

	it('Page redirects to Not Found page if user tries to update a record that does not exist', async () => {

	});

	it('Page shows error message if there is a server error', async () => {

	});
});
