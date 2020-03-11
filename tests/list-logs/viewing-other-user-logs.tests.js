import { By, until } from 'selenium-webdriver';
import driver from '../web-driver';
import { expect } from 'chai';
import mockApis, { ErrorIds, exampleUser } from '../webapp/mock-apis';
import sinon from 'sinon';

const DefaultUrl = mockApis.resolveUrl('/logs');
const LoginUrl = mockApis.resolveUrl('/login');
const Username = 'Timmy22';
const UserUrl = `${ DefaultUrl }/${ Username }`;
const Error403 = {
	errorId: ErrorIds.forbidden,
	status: 403,
	message: 'Access denied',
	details: 'Sorry - you don\'t have access to view this profile'
};

describe('Viewing Other User\'s Log Books', () => {

	let getLogsStub = null;

	afterEach(() => {
		if (getLogsStub) {
			getLogsStub.restore();
			getLogsStub = null;
		}
	});

	describe('As an authenticated user', () => {
		let authStub = null;

		before(() => {
			authStub = sinon.stub(mockApis, 'getAuthMe');
			authStub.callsFake((req, res) => {
				res.json(exampleUser);
			});
		});

		after(() => {
			authStub.restore();
		});

		it('Shows the list if allowed', async () => {
			getLogsStub = sinon.spy(mockApis, 'getUsersUsernameLogs');

			await driver.navigate().to(UserUrl);
			await driver.wait(until.elementLocated(By.id('log-entries-grid')));

			const [ { params } ] = getLogsStub.getCall(0).args;
			expect(params.username).to.equal(Username);
		});

		it('Shows Forbidden page if 403 error is returned', async () => {
			getLogsStub = sinon.stub(mockApis, 'getUsersUsernameLogs');
			getLogsStub.callsFake((req, res) => {
				res.status(403).json(Error403);
			});

			await driver.navigate().to(UserUrl);
			await driver.wait(until.elementLocated(By.id('forbidden-page')));

			const [ { params } ] = getLogsStub.getCall(0).args;
			expect(params.username).to.equal(Username);
		});

		it('Shows their own log book', async () => {
			getLogsStub = sinon.spy(mockApis, 'getUsersUsernameLogs');

			await driver.navigate().to(DefaultUrl);
			await driver.wait(until.elementLocated(By.id('log-entries-grid')));

			const [ { params } ] = getLogsStub.getCall(0).args;
			expect(params.username).to.equal(exampleUser.username);
		});
	});

	describe('As anonymous user', () => {
		it('Will show a log book if it is public', async () => {
			getLogsStub = sinon.spy(mockApis, 'getUsersUsernameLogs');

			await driver.navigate().to(UserUrl);
			await driver.wait(until.elementLocated(By.id('log-entries-grid')));

			const [ { params } ] = getLogsStub.getCall(0).args;
			expect(params.username).to.equal(Username);
		});

		it('Will redirect to login screen if a 403 is returned', async () => {
			getLogsStub = sinon.stub(mockApis, 'getUsersUsernameLogs');
			getLogsStub.callsFake((req, res) => {
				res.status(403).json(Error403);
			});

			await driver.navigate().to(UserUrl);
			await driver.wait(until.elementLocated(By.id('btn-login')));

			const [ { params } ] = getLogsStub.getCall(0).args;
			expect(params.username).to.equal(Username);
		});

		it('Will redirect to login if they try to view the default log book', async () => {
			getLogsStub = sinon.spy(mockApis, 'getUsersUsernameLogs');

			await driver.navigate().to(DefaultUrl);
			await driver.wait(until.urlIs(LoginUrl));

			expect(getLogsStub.notCalled).to.be.true;
		});
	});

});
