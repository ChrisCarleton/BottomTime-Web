import _ from 'lodash';
import agent, { makeAbsoluteUri } from '../agent';
import alt from '../alt';

class CurrentUserActions {
	signUpUser(newUser) {
		const userAccount = {
			email: newUser.email,
			password: newUser.password,
			role: 'user'
		};

		agent
			.put(makeAbsoluteUri(`/users/${ newUser.username }`))
			.send(userAccount)
			.then(res => {
				this.signUpUserSucceeded(res);
			})
			.catch(err => {
				console.error(err);
				this.signUpUserFailed(err);
			});

		return true;
	}

	signUpUserSucceeded(result) {

	}

	signUpUserFailed(err) {

	}
}

export default alt.createActions(CurrentUserActions);
