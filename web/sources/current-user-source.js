import agent from '../agent';

const CurrentUserSource = {
	signUpUser: {

	},

	getCurrentUser: {
		remote: async state => {
			try {
				const res = await agent.get('/auth/me');
				state.user = res.body;
			} catch (err) {
				console.error(err);
			}
		}
	}
};

export default CurrentUserSource;
