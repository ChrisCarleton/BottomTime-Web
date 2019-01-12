import driver from './web-driver';
import mockApis from './webapp/mock-apis';
import sinon from 'sinon';

describe('List Logs page', () => {
	const authMeStub = sinon.stub(mockApis, 'getAuthMe');
	const user = {
		username: 'Homer.Watson',
		password: 'F!ckle.P@rsn1ps3',
		email: 'Homer.Watson@net-com.net',
		createdAt: (new Date()).toISOString(),
		role: 'user',
		isAnonymous: false,
		isLockedOut: false
	};

	before(() => {
		authMeStub.callsFake((req, res) => res.json(user));
	});

	beforeEach(async () => {
		await driver.navigate().to(`http://localhost:8081/users/${ user.username }/logs/`);
	});

	after(() => {
		authMeStub.restore();
	});

	// it('Shows the list of logs on page load', async () => {

	// });
});
