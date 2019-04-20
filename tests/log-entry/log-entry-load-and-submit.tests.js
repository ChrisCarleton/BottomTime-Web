import { By, until } from 'selenium-webdriver';
import config from '../../web/config';
import driver from '../web-driver';
import { expect } from 'chai';
import mockApis, { ErrorIds, exampleUser, logEntries } from '../webapp/mock-apis';
import moment from 'moment';
import sinon from 'sinon';

async function refreshPage(url) {
	await driver.navigate().to(url);
	await driver.wait(until.elementLocated(By.id('location')));
}

async function fillInRequiredFields() {
	await driver.findElement(By.id('location')).sendKeys(logEntries[0].location);
	await driver.findElement(By.id('site')).sendKeys(logEntries[0].site);
	await driver.findElement(By.id('entryTime')).sendKeys(moment().format(config.entryTimeFormat));
	await driver.findElement(By.id('maxDepth')).sendKeys(logEntries[0].maxDepth);
	await driver.findElement(By.id('bottomTime')).sendKeys(logEntries[0].bottomTime);
}

const BaseUrl = 'http://localhost:8081';
const NotFoundUrl = `${ BaseUrl }/notFound`;
const ForbiddenUrl = `${ BaseUrl }/forbidden`;
const LoginUrl = `${ BaseUrl }/login`;
const NewEntryUrl = `${ BaseUrl }/logs/jake_smith/new`;
const EntryUrl = `${ BaseUrl }/logs/jake_smith/${ logEntries[0].entryId }`;

describe('Loading and Submitting Log Entries', () => {
	let authStub = null;
	let stub = null;
	let spy = null;

	afterEach(() => {
		if (authStub) {
			authStub.restore();
			authStub = null;
		}

		if (stub) {
			stub.restore();
			stub = null;
		}

		if (spy) {
			spy.restore();
			spy = null;
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
		await driver.wait(until.elementLocated(By.id('weight_amount')));
		expect(async () => {
			await driver.findElement(By.id('btn-save'));
		}).to.throw;
	});

	[
		{ mode: 'read-only', isReadOnly: true },
		{ mode: 'read-write', isReadOnly: false }
	].forEach(t => {
		it(`Weight can be rendered in lbs in ${ t.mode } mode`, async () => {
			const auth = {
				...exampleUser,
				weightUnit: 'lbs'
			};
			const logEntry = {
				...logEntries[0],
				isReadOnly: t.isReadOnly
			};
			logEntry.weight.amount = logEntry.weight.amount || 1.5;

			authStub = sinon.stub(mockApis, 'getAuthMe');
			authStub.callsFake((req, res) => {
				res.json(auth);
			});

			stub = sinon.stub(mockApis, 'getUsersUsernameLogsLogId');
			stub.callsFake((req, res) => {
				res.json(logEntry);
			});

			await refreshPage(EntryUrl);
			const weightElement = await driver.findElement(By.id('weight_amount'));
			const displayedWeight = t.isReadOnly
				? await weightElement.getText()
				: await weightElement.getAttribute('value');
			let expectedWeight = (logEntry.weight.amount * 2.20462).toFixed(2);
			if (t.isReadOnly) {
				expectedWeight = `${ expectedWeight }lbs`;
			}
			expect(displayedWeight).to.equal(expectedWeight);
		});

		it(`Weight of 0.0 can be rendered in lbs in ${ t.mode } mode`, async () => {
			const auth = {
				...exampleUser,
				weightUnit: 'lbs'
			};
			const logEntry = {
				...logEntries[0],
				isReadOnly: t.isReadOnly
			};
			logEntry.weight.amount = 0;

			authStub = sinon.stub(mockApis, 'getAuthMe');
			authStub.callsFake((req, res) => {
				res.json(auth);
			});

			stub = sinon.stub(mockApis, 'getUsersUsernameLogsLogId');
			stub.callsFake((req, res) => {
				res.json(logEntry);
			});

			await refreshPage(EntryUrl);
			const weightElement = await driver.findElement(By.id('weight_amount'));
			const displayedWeight = t.isReadOnly
				? await weightElement.getText()
				: await weightElement.getAttribute('value');
			let expectedWeight = '0.00';
			if (t.isReadOnly) {
				expectedWeight = `${ expectedWeight }lbs`;
			}
			expect(displayedWeight).to.equal(expectedWeight);
		});

		[ 'averageDepth', 'maxDepth' ].forEach(f => {
			it(`${ f } can be rendered in ft in ${ t.mode } mode`, async () => {
				const auth = {
					...exampleUser,
					distanceUnit: 'ft'
				};
				const logEntry = {
					...logEntries[0],
					isReadOnly: t.isReadOnly
				};

				authStub = sinon.stub(mockApis, 'getAuthMe');
				authStub.callsFake((req, res) => {
					res.json(auth);
				});

				stub = sinon.stub(mockApis, 'getUsersUsernameLogsLogId');
				stub.callsFake((req, res) => {
					res.json(logEntry);
				});

				await refreshPage(EntryUrl);
				const depthElement = await driver.findElement(By.id(f));
				const displayedDepth = t.isReadOnly
					? await depthElement.getText()
					: await depthElement.getAttribute('value');
				let expectedDepth = (logEntry[f] * 3.28084).toFixed(2);
				if (t.isReadOnly) {
					expectedDepth = `${ expectedDepth }ft`;
				}
				expect(displayedDepth).to.equal(expectedDepth);
			});

			it(`${ f } of 0.0 can be rendered in ft in ${ t.mode } mode`, async () => {
				const auth = {
					...exampleUser,
					distanceUnit: 'ft'
				};
				const logEntry = {
					...logEntries[0],
					isReadOnly: t.isReadOnly
				};
				logEntry[f] = 0;

				authStub = sinon.stub(mockApis, 'getAuthMe');
				authStub.callsFake((req, res) => {
					res.json(auth);
				});

				stub = sinon.stub(mockApis, 'getUsersUsernameLogsLogId');
				stub.callsFake((req, res) => {
					res.json(logEntry);
				});

				await refreshPage(EntryUrl);
				const depthElement = await driver.findElement(By.id(f));
				const displayedDepth = t.isReadOnly
					? await depthElement.getText()
					: await depthElement.getAttribute('value');
				let expectedDepth = '0.00';
				if (t.isReadOnly) {
					expectedDepth = `${ expectedDepth }ft`;
				}
				expect(displayedDepth).to.equal(expectedDepth);
			});
		});

		it.skip(`Temperature can be rendered in °F in ${ t.mode }`, async () => {
			// TODO: Add some fields to record temperature so we can test this.
		});
	});

	it('Weight can be submitted in lbs', async () => {
		const auth = {
			...exampleUser,
			weightUnit: 'lbs'
		};

		authStub = sinon.stub(mockApis, 'getAuthMe');
		authStub.callsFake((req, res) => {
			res.json(auth);
		});

		spy = sinon.spy(mockApis, 'postUsersUsernameLogs');

		await refreshPage(NewEntryUrl);
		await fillInRequiredFields();
		await driver.findElement(By.id('weight_amount')).sendKeys('6');
		await driver.findElement(By.id('btn-save')).click();

		expect(spy.called).to.be.true;
		const [ { weight } ] = spy.getCall(0).args[0].body;
		expect(weight.amount).to.equal(2.721552);
	});

	it('Depth can be submitted in ft', async () => {
		const auth = {
			...exampleUser,
			distanceUnit: 'ft'
		};

		authStub = sinon.stub(mockApis, 'getAuthMe');
		authStub.callsFake((req, res) => {
			res.json(auth);
		});

		spy = sinon.spy(mockApis, 'postUsersUsernameLogs');

		await refreshPage(NewEntryUrl);
		await fillInRequiredFields();
		const maxDepthElement = await driver.findElement(By.id('maxDepth'));
		await maxDepthElement.clear();
		await maxDepthElement.sendKeys('81');

		await driver.findElement(By.id('averageDepth')).sendKeys('67');
		await driver.findElement(By.id('btn-save')).click();

		expect(spy.called).to.be.true;
		const [ { averageDepth, maxDepth } ] = spy.getCall(0).args[0].body;
		expect(averageDepth).to.equal(20.4216);
		expect(maxDepth).to.equal(24.6888);
	});

	it.skip('Temperature can be submitted in °F', async () => {
		// TODO: Add some fields to record temperature so we can test this.
	});

	it('Page redirects to Not Found page if entry is not found', async () => {
		authStub = sinon.stub(mockApis, 'getAuthMe');
		authStub.callsFake((req, res) => {
			res.json(exampleUser);
		});

		stub = sinon.stub(mockApis, 'getUsersUsernameLogsLogId');
		stub.callsFake((req, res) => {
			res.sendStatus(404);
		});

		await driver.navigate().to(EntryUrl);
		await driver.wait(until.urlIs(NotFoundUrl));
	});

	it('Page redirects to Forbidden page if user does not have permission to view the entry', async () => {
		authStub = sinon.stub(mockApis, 'getAuthMe');
		authStub.callsFake((req, res) => {
			res.json(exampleUser);
		});

		stub = sinon.stub(mockApis, 'getUsersUsernameLogsLogId');
		stub.callsFake((req, res) => {
			res.sendStatus(403);
		});

		await driver.navigate().to(EntryUrl);
		await driver.wait(until.urlIs(ForbiddenUrl));
	});

	it('Anonymous users are redirected to login page if user tries to create a new entry', async () => {
		await driver.navigate().to(NewEntryUrl);
		await driver.wait(until.urlIs(LoginUrl));
	});

	it('Anonymous users are redirected to login page if user tries to view a protected log entry', async () => {
		stub = sinon.stub(mockApis, 'getUsersUsernameLogsLogId');
		stub.callsFake((req, res) => {
			res.sendStatus(403);
		});

		await driver.navigate().to(EntryUrl);
		await driver.wait(until.urlIs(LoginUrl));
	});

	it('Page redirects to Forbidden if user tries to update an entry they have no access to', async () => {
		authStub = sinon.stub(mockApis, 'getAuthMe');
		authStub.callsFake((req, res) => {
			res.json(exampleUser);
		});

		stub = sinon.stub(mockApis, 'getUsersUsernameLogsLogId');
		stub.callsFake((req, res) => {
			res.json(logEntries[0]);
		});

		spy = sinon.stub(mockApis, 'putUsersUsernameLogsLogId');
		spy.callsFake((req, res) => {
			res.sendStatus(403);
		});

		await refreshPage(EntryUrl);
		await driver.findElement(By.id('btn-save')).click();
		await driver.wait(until.urlIs(ForbiddenUrl));
	});

	it('Page redirects to Not Found page if user tries to update a record that does not exist', async () => {
		authStub = sinon.stub(mockApis, 'getAuthMe');
		authStub.callsFake((req, res) => {
			res.json(exampleUser);
		});

		stub = sinon.stub(mockApis, 'getUsersUsernameLogsLogId');
		stub.callsFake((req, res) => {
			res.json(logEntries[0]);
		});

		spy = sinon.stub(mockApis, 'putUsersUsernameLogsLogId');
		spy.callsFake((req, res) => {
			res.sendStatus(404);
		});

		await refreshPage(EntryUrl);
		await driver.findElement(By.id('btn-save')).click();
		await driver.wait(until.urlIs(NotFoundUrl));
	});

	it('Page shows error message if there is a server error', async () => {
		authStub = sinon.stub(mockApis, 'getAuthMe');
		authStub.callsFake((req, res) => {
			res.json(exampleUser);
		});

		stub = sinon.stub(mockApis, 'getUsersUsernameLogsLogId');
		stub.callsFake((req, res) => {
			res.status(500).json({
				errorId: ErrorIds.serverError,
				status: 500,
				message: 'Uh oh',
				details: 'Did not work'
			});
		});

		await driver.navigate().to(EntryUrl);
		await driver.wait(until.elementLocated(By.id('global-error-bar')));
	});
});
