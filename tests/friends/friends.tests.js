import { By, until } from 'selenium-webdriver';
import driver from '../web-driver';
import mockApis, { exampleUser } from '../webapp/mock-apis';
import sinon from 'sinon';

const FriendsUrl = 'http://localhost:8081/friends/';

async function refreshPage() {
	await driver.navigate().to(FriendsUrl);
	await driver.wait(until.elementLocated(By.id('btn-new-request')));
}

describe('Friends Page', () => {
	let authStub = null;

	beforeEach(() => {
		if (authStub) {
			authStub.restore();
			authStub = null;
		}
	});

	it('Will display friends list', async () => {
		authStub = sinon.stub(mockApis, 'getAuthMe');
		authStub.callsFake((req, res) => {
			res.json(exampleUser);
		});

		await refreshPage();
	});

	it('Anonymous users will be redirected to the login page', async () => {
		await driver.navigate().to(FriendsUrl);
		await driver.wait(until.urlMatches(/.*\/login(\?.*)?$/));
	});
});
