import LoginForm from './login-form';
import React from 'react';
import PageTitle from '../../components/page-title';

class Login extends React.Component {
	render() {
		return (
			<div>
				<PageTitle title="Login" />
				<LoginForm />
			</div>
		);
	}
}

export default Login;
