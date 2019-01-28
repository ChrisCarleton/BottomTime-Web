import { By, until } from 'selenium-webdriver';
import driver from './web-driver';
import mockApis, { ErrorIds, exampleUser } from './webapp/mock-apis';
import sinon from 'sinon';

describe('Handle Error utility', () => {

	let authStub = null;
	let stub = null;
	let spy = null;

	before(() => {
		authStub = sinon.stub(mockApis, 'getAuthMe');
		authStub.callsFake((req, res) => {
			res.json(exampleUser);
		});
	});

	after(() => {
		authStub.restore();
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

	it('Will handle 401 errors by clearing the auth token and redirecting to login page', async () => {
		stub = sinon.stub(mockApis, 'getUsersUsernameLogs');
		stub.callsFake((req, res) => {
			res.sendStatus(401);
		});

		await driver.navigate().to('http://localhost:8081/logs');
		await driver.wait(until.urlIs('http://localhost:8081/login'));
	});

	it('Handles other errors by displaying them via ErrorActions', async () => {
		stub = sinon.stub(mockApis, 'getUsersUsernameLogs');
		stub.callsFake((req, res) => {
			res.status(403).json({
				errorId: ErrorIds.forbidden,
				status: 403,
				message: 'Access Denied',
				details: 'You\'re not allowed to view this page.'
			});
		});

		await driver.navigate().to('http://localhost:8081/logs');
		await driver.wait(until.elementLocated(By.id('global-error-bar')));
	});

});
