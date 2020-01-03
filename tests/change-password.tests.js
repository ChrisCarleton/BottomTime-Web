import { By, until } from 'selenium-webdriver';
import driver from './web-driver';
import mockApis, { ErrorIds, exampleUser } from './webapp/mock-apis';
import sinon from 'sinon';

const ControlIds = {
	oldPassword: 'oldPassword',
	oldPasswordError: 'err-oldPassword',
	newPassword: 'newPassword',
	newPasswordError: 'err-newPassword',
	confirmPassword: 'confirmPassword',
	confirmPasswordError: 'err-confirmPassword',
	submit: 'btn-change'
};

const OldPassword = 'my..0ldPzzw3d';
const NewPassword = '@Brnd-NuP@ssw3rd';

let stub = null;
let authStub = null;

async function refreshPage() {
	await driver.navigate().to(mockApis.resolveUrl('/changePassword/'));
	await driver.wait(until.elementLocated(By.id(ControlIds.newPassword)));
}

describe('Change password page', () => {

	afterEach(() => {
		if (stub) {
			stub.restore();
			stub = null;
		}
	});

	describe('for authenticated user with password', () => {
		before(() => {
			authStub = sinon.stub(mockApis, 'getAuthMe');
			authStub.callsFake((req, res) => {
				res.json(exampleUser);
			});
		});

		beforeEach(refreshPage);

		after(() => {
			authStub.restore();
		});

		it('catches missing old password', async () => {
			await driver.findElement(By.id(ControlIds.newPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.confirmPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.submit)).click();
			await driver.wait(until.elementLocated(By.id(ControlIds.oldPasswordError)));
		});

		it('catches missing new password', async () => {
			await driver.findElement(By.id(ControlIds.oldPassword)).sendKeys(OldPassword);
			await driver.findElement(By.id(ControlIds.confirmPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.submit)).click();
			await driver.wait(until.elementLocated(By.id(ControlIds.newPasswordError)));
		});

		it('catches missing confirm password', async () => {
			await driver.findElement(By.id(ControlIds.oldPassword)).sendKeys(OldPassword);
			await driver.findElement(By.id(ControlIds.newPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.submit)).click();
			await driver.wait(until.elementLocated(By.id(ControlIds.confirmPasswordError)));
		});

		it('catches weak password', async () => {
			await driver.findElement(By.id(ControlIds.oldPassword)).sendKeys(OldPassword);
			await driver.findElement(By.id(ControlIds.newPassword)).sendKeys('too.weak');
			await driver.findElement(By.id(ControlIds.confirmPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.submit)).click();
			await driver.wait(until.elementLocated(By.id(ControlIds.newPasswordError)));
		});

		it('catches mismatched confirm password', async () => {
			await driver.findElement(By.id(ControlIds.oldPassword)).sendKeys(OldPassword);
			await driver.findElement(By.id(ControlIds.newPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.confirmPassword)).sendKeys(`${ NewPassword }nope`);
			await driver.findElement(By.id(ControlIds.submit)).click();
			await driver.wait(until.elementLocated(By.id(ControlIds.confirmPasswordError)));
		});

		it('shows success if password is changed', async () => {
			await driver.findElement(By.id(ControlIds.oldPassword)).sendKeys(OldPassword);
			await driver.findElement(By.id(ControlIds.newPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.confirmPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.submit)).click();
			await driver.wait(until.elementLocated(By.id('global-error-bar')));
		});

		it('shows error if old password is incorrect', async () => {
			stub = sinon.stub(mockApis, 'postUsersUsernameChangePassword');
			stub.callsFake((req, res) => res.sendStatus(403));

			await driver.findElement(By.id(ControlIds.oldPassword)).sendKeys(OldPassword);
			await driver.findElement(By.id(ControlIds.newPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.confirmPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.submit)).click();
			await driver.wait(until.elementLocated(By.id('global-error-bar')));
		});

		it('handles error if server returns 500 status', async () => {
			stub = sinon.stub(mockApis, 'postUsersUsernameChangePassword');
			stub.callsFake((req, res) => res.status(500).json({
				errorId: ErrorIds.serverError,
				status: 500,
				message: 'Database error',
				details: 'lol. fail.',
				logId: '34c20264-4a77-11e9-b757-08606e10bc93'
			}));

			await driver.findElement(By.id(ControlIds.oldPassword)).sendKeys(OldPassword);
			await driver.findElement(By.id(ControlIds.newPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.confirmPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.submit)).click();
			await driver.wait(until.elementLocated(By.id('global-error-bar')));
		});
	});

	describe('for other users', () => {
		it('requires user to be signed in', async () => {
			await driver.navigate().to(mockApis.resolveUrl('/changePassword/'));
			await driver.wait(until.urlIs(mockApis.resolveUrl('/login')));
		});

		it('does not require old password if user does not have an existing password', async () => {
			const user = {
				...exampleUser,
				hasPassword: false
			};

			stub = sinon.stub(mockApis, 'getAuthMe');
			stub.callsFake((req, res) => res.json(user));

			await refreshPage();
			await driver.findElement(By.id(ControlIds.newPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.confirmPassword)).sendKeys(NewPassword);
			await driver.findElement(By.id(ControlIds.submit)).click();
			await driver.wait(until.elementLocated(By.id('global-error-bar')));
		});
	});
});
