import faker from 'faker';
import fakeMongoId from '../utils/fake-mongo-id';
import moment from 'moment';

export const exampleUser = {
	username: 'Lindsay.Irvine',
	email: 'lindsey3331@gmail.com',
	createdAt: moment().toDate(),
	role: 'user',
	isAnonymous: false,
	isLockedOut: false,
	hasPassword: true,
	distanceUnit: 'm',
	weightUnit: 'kg',
	temperatureUnit: 'c'
};

export const exampleProfile = {
	memberSince: moment().add(-2, 'y').add(-7, 'months').toISOString(),
	logsVisibility: 'public',
	firstName: 'Jerard',
	lastName: 'Lapain',
	location: 'Paris, France',
	occupation: 'Painter',
	gender: 'male',
	birthdate: '1985-04-12',
	typeOfDiver: 'Casual/vacation diver',
	startedDiving: 2013,
	certificationLevel: 'Advanced Open Water',
	certificationAgencies: 'SSI',
	specialties: 'Nitrox, Night Diver',
	about: 'J\'aime beaucoup la plange! C\'est magnifique!',
	distanceUnit: 'm',
	weightUnit: 'kg',
	temperatureUnit: 'c',
	divesLogged: 47,
	bottomTimeLogged: 1748,
	readOnly: false
};

export const logEntries = new Array(250);
for (let i = 0; i < logEntries.length; i++) {
	const bottomTime = faker.random.number({ min: 10, max: 70 });
	const averageDepth = faker.random.number({ min: 3, max: 35 });

	logEntries[i] = {
		entryId: fakeMongoId(),
		entryTime: faker.date.past(3).toISOString(),
		bottomTime,
		totalTime: bottomTime + faker.random.number({ min: 1, max: 5 }),
		location: faker.fake('{{address.city}}{{address.citySuffix}}, {{address.stateAbbr}}'),
		site: faker.fake('{{address.cityPrefix}} {{name.lastName}}'),
		averageDepth,
		maxDepth: averageDepth + faker.random.number({ min: 1, max: 10 }),
		gps: {
			latitude: faker.random.number({ min: -90, max: 90 }),
			longitude: faker.random.number({ min: -180, max: 180 })
		},
		weight: {
			amount: faker.random.number({ min: 0, max: 12 })
		},
		readOnly: false
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
			isLockedOut: false,
			hasPassword: false,
			distanceUnit: 'm',
			weightUnit: 'kg',
			temperatureUnit: 'c'
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
				createdAt: moment().toISOString(),
				role: 'user',
				isAnonymous: false,
				isLockedOut: false,
				hasPassword: true
			},
			token: 'la.di.da'
		});
	},

	getUsersUsernameLogs(req, res) {
		return res.json(logEntries);
	},

	getUsersUsernameLogsLogId(req, res) {
		return res.json(logEntries[0]);
	},

	postUsersUsernameLogs(req, res) {
		return res.json(req.body.map(e => ({ ...e, entryId: fakeMongoId() })));
	},

	putUsersUsernameLogsLogId(req, res) {
		return res.sendStatus(204);
	},

	getUsersUsernameProfile(req, res) {
		res.json(exampleProfile);
	},

	patchUsersUsernameProfile(req, res) {
		res.sendStatus(204);
	},

	postUsersUsernameChangePassword(req, res) {
		res.sendStatus(204);
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
