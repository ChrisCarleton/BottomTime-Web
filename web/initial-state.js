export default {
	CurrentUserStore: {
		currentUser: {
			username: 'Anonymous',
			email: '',
			createdAt: null,
			role: 'user',
			isAnonymous: true,
			isLockedOut: false,
			isRegistrationIncomplete: false,
			distanceUnit: 'm',
			pressureUnit: 'bar',
			weightUnit: 'kg',
			temperatureUnit: 'c'
		}
	},
	ErrorStore: {
		display: 'none',
		message: '',
		details: ''
	},
	TankStore: {
		userTanks: []
	}
};
