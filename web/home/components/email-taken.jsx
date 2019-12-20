import config from '../../config';
import { Link, withRouter } from 'react-router-dom';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';

class EmailTaken extends React.Component {
	getProviderFriendlyName(provider) {
		switch (provider) {
		case 'google':
			return 'Google';

		default:
			return 'Unknown Provider';
		}
	}

	render() {
		const providerName = this.getProviderFriendlyName(this.props.match.params.provider);

		// TODO: Finish the steps for linking SSO accounts.
		return (
			<div>
				<PageTitle title="E-mail Address is Taken" hidden />
				<h1>An Account Exists With Your Email Address</h1>

				<p>
					Sign in failed because an account already exists with the e-mail address provided
					to us by { providerName }. If you would like to link your { providerName } account
					with your existing account on this site follow these steps:
				</p>

				<ol>
					<li>
						Log into your account the way you normally do.&nbsp;
						(<Link to="/login">Click here to return to the login page</Link>.)
					</li>
					<li>
						Go to your profile page. (Click your username in the top right corner and then
						click <strong>My Profile</strong>.)
					</li>
					<li>
						<strong>TODO:</strong> Implement this goodness.
					</li>
				</ol>

				<p>
					If you feel something is wrong and you don&apos;t know of any account that should
					have your e-mail address associated with it then contact
					<a href={ `mailto:${ config.adminEmail }` }>{ config.adminEmail }</a> for help.
				</p>
			</div>
		);
	}
}

EmailTaken.propTypes = {
	match: PropTypes.string.isRequired
};

export default withRouter(EmailTaken);
