const mockApis = {
	getAuthMe: (req, res) =>
		res.status(200).json({
			username: 'Anonymous',
			email: '',
			createdAt: null,
			role: 'user',
			isAnonymous: true,
			isLockedOut: false
		}),

	postAuthLogin: (req, res) => res.sendStatus(204),

	putUsersUsername: (req, res) =>
		res.status(201).json({
			username: req.params.username,
			email: `${ req.params.username }@gmail.com`,
			createdAt: (new Date()).toISOString(),
			role: 'user',
			isAnonymous: false,
			isLockedOut: false
		})
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
