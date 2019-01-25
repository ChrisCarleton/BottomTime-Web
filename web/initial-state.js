export default {
	CurrentUserStore: {
		currentUser: {
			username: 'Anonymous',
			email: '',
			createdAt: null,
			role: 'user',
			isAnonymous: true,
			isLockedOut: false
		}
	},
	ErrorStore: {
		display: 'none',
		message: '',
		details: ''
	}
};
