import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../stores/current-user-store';
import EditProfile from './edit-profile';
import ErrorBox from '../../components/error-box';
import PropTypes from 'prop-types';
import React from 'react';
import UserProfileActions from '../actions/user-profile-actions';
import UserProfileStore from '../stores/user-profile-store';
// import ViewProfile from './view-profile';
import { withRouter } from 'react-router-dom';

class Profile extends React.Component {
	static getStores() {
		return [ CurrentUserStore, UserProfileStore ];
	}

	static getPropsFromStores() {
		return {
			currentProfile: UserProfileStore.getState().currentProfile,
			currentUser: CurrentUserStore.getState().currentUser
		};
	}

	componentDidMount() {
		const username = this.props.match.params.username
			|| this.props.currentUser.username;
		UserProfileActions.getProfile(username);
	}

	render() {
		return (
			<div>
				<h1>{ 'Profile' }</h1>
				<ErrorBox />
				<EditProfile profile={ this.props.currentProfile } />
			</div>
		);
	}
}

Profile.propTypes = {
	currentProfile: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

export default withRouter(connectToStores(Profile));
