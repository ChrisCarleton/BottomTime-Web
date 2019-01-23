import faker from 'faker';
import fakeMongoId from '../utils/fake-mongo-id';

export const logEntries = new Array(250);
for (let i = 0; i < logEntries.length; i++) {
	logEntries[i] = {
		entryId: fakeMongoId(),
		entryTime: faker.date.past(3).toISOString(),
		bottomTime: faker.random.number({ min: 10, max: 70 }),
		location: faker.fake('{{address.city}}{{address.citySuffix}}, {{address.stateAbbr}}'),
		site: faker.fake('{{address.cityPrefix}} {{name.lastName}}'),
		maxDepth: faker.random.number({ min: 15, max: 100 })
	};
}

const mockApis = {
	getAuthMe(req, res) {
		res.status(200).json({
			username: 'Anonymous',
			email: '',
			createdAt: null,
			role: 'user',
			isAnonymous: true,
			isLockedOut: false
		});
	},

	postAuthLogin(req, res) {
		return res.sendStatus(204);
	},

	putUsersUsername(req, res) {
		res.status(201).json({
			user: {
				username: req.params.username,
				email: `${ req.params.username }@gmail.com`,
				createdAt: (new Date()).toISOString(),
				role: 'user',
				isAnonymous: false,
				isLockedOut: false
			},
			token: 'la.di.da'
		});
	},

	getUsersUsernameLogs(req, res) {
		return res.json(logEntries);
	}
};

export default mockApis;

export const ErrorIds = {
	badRequest: 'bottom-time/errors/bad-request',
	conflict: 'bottom-time/errors/conflict',
	forbidden: 'bottom-time/errors/forbidden',
	notAuthorized: 'bottom-time/errors/unauthorized',
	notFound: 'bottom-time/errors/resource-not-found',
	serverError: 'bottom-time/errors/server-error'
};
