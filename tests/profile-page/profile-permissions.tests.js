import { By, until } from 'selenium-webdriver';
import driver from '../web-driver';
import mockApis, { ErrorIds, exampleProfile, exampleUser } from '../webapp/mock-apis';
import sinon from 'sinon';

const Error403 = {
	errorId: ErrorIds.forbidden,
	status: 403,
	message: 'Access denied',
	details: 'Sorry - you don\'t have access to view this profile'
};
let getProfileStub = null;

describe('Profile page permissions', () => {

	afterEach(() => {
		if (getProfileStub) {
			getProfileStub.restore();
			getProfileStub = null;
		}
	});

	describe('for anonymous users', () => {
		it('will allow read-only viewing of public profiles', async () => {
			getProfileStub = sinon.stub(mockApis, 'getUsersUsernameProfile');
			getProfileStub.callsFake((req, res) => {
				res.json({ ...exampleProfile, readOnly: true });
			});

			await driver.navigate().to('http://localhost:8081/profile/JLapain999');
			await driver.wait(until.elementLocated(By.id('name')));
		});

		it('will redirect to login page if not authorized', async () => {
			getProfileStub = sinon.stub(mockApis, 'getUsersUsernameProfile');
			getProfileStub.callsFake((req, res) => {
				res.status(403).json(Error403);
			});

			await driver.navigate().to('http://localhost:8081/profile/JLapain999');
			await driver.wait(until.urlIs('http://localhost:8081/login'));
		});

		it('will redirect to login page if they try to view their own profile', async () => {
			await driver.navigate().to('http://localhost:8081/profile');
			await driver.wait(until.urlIs('http://localhost:8081/login'));
		});
	});

	describe('for authenticated users', () => {
		let authStub = null;

		before(() => {
			authStub = sinon.stub(mockApis, 'getAuthMe');
			authStub.callsFake((req, res) => {
				res.json(exampleUser);
			});
		});

		afterEach(() => {
			if (getProfileStub) {
				getProfileStub.restore();
				getProfileStub = null;
			}
		});

		after(() => {
			authStub.restore();
		});

		it('will allow write-access to their own profile', async () => {
			await driver.navigate().to('http://localhost:8081/profile');
			await driver.wait(until.elementLocated(By.id('firstName')));
		});

		it('will allow read-access when service indicates read-only flag is true', async () => {
			getProfileStub = sinon.stub(mockApis, 'getUsersUsernameProfile');
			getProfileStub.callsFake((req, res) => {
				res.json({ ...exampleProfile, readOnly: true });
			});

			await driver.navigate().to('http://localhost:8081/profile/JLapain999');
			await driver.wait(until.elementLocated(By.id('name')));
		});

		it('will allow write-access when service indicates that read-only flag is false', async () => {
			await driver.navigate().to('http://localhost:8081/profile/JLapain999');
			await driver.wait(until.elementLocated(By.id('firstName')));
		});

		it('will show Forbidden page if not authorized', async () => {
			getProfileStub = sinon.stub(mockApis, 'getUsersUsernameProfile');
			getProfileStub.callsFake((req, res) => {
				res.status(403).json(Error403);
			});

			await driver.navigate().to('http://localhost:8081/profile/JLapain999');
			await driver.wait(until.elementLocated(By.id('forbidden-page')));
		});
	});

});
