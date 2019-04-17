export default {
	CurrentUserStore: {
		currentUser: {
			username: 'Anonymous',
			email: '',
			createdAt: null,
			role: 'user',
			isAnonymous: true,
			isLockedOut: false,
			distanceUnit: 'm',
			weightUnit: 'kg',
			temperatureUnit: 'c'
		}
	},
	ErrorStore: {
		display: 'none',
		message: '',
		details: ''
	}
};
