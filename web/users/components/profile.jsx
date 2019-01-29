import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../stores/current-user-store';
import EditProfile from './edit-profile';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';
import RequireUser from '../../components/require-user';
import UserProfileActions from '../actions/user-profile-actions';
import UserProfileStore from '../stores/user-profile-store';
import ViewProfile from './view-profile';
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
		if (!this.props.match.username && this.props.currentUser.isAnonymous) {
			return;
		}

		const username = this.props.match.params.username
			|| this.props.currentUser.username;
		return UserProfileActions.getProfile(username);
	}

	render() {
		if (!this.props.match.username && this.props.currentUser.isAnonymous) {
			return <RequireUser />;
		}

		return (
			<div>
				<PageTitle title="Profile" />
				{
					this.props.currentProfile.readOnly
						? <ViewProfile profile={ this.props.currentProfile } />
						: <EditProfile profile={ this.props.currentProfile } />
				}
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
