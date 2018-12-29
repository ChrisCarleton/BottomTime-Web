import agent from '../agent';

const CurrentUserSource = {
	signUpUser: {

	},

	getCurrentUser: {
		remote: async state => {
			try {
				state.user = await agent.get('/auth/me');
				currentUser = res.body;
			} catch (err) {
				console.error(err);
			}
		}
	}
};

export default CurrentUserSource;
