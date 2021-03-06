import { until } from 'selenium-webdriver';
import driver from './web-driver';
import mockApis, { exampleUser } from './webapp/mock-apis';
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
			authStub.restore();
			res.sendStatus(401);
		});

		await driver.navigate().to(mockApis.resolveUrl('/logs'));
		await driver.wait(until.urlIs(mockApis.resolveUrl('/login')));
	});

});
