import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../stores/current-user-store';
import EditProfile from './edit-profile';
import LoadingSpinner from '../../components/loading-spinner';
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
		const { currentProfile, isLoading } = UserProfileStore.getState();
		return {
			currentProfile,
			isLoading,
			currentUser: CurrentUserStore.getState().currentUser
		};
	}

	componentDidMount() {
		if (this.props.match.params.username || !this.props.currentUser.isAnonymous) {
			const username = this.props.match.params.username
				|| this.props.currentUser.username;
			UserProfileActions.getProfile(username);
		}
	}

	render() {
		if (!this.props.match.params.username && this.props.currentUser.isAnonymous) {
			return <RequireUser />;
		}

		const username = this.props.match.params.username || this.props.currentUser.username;
		let element = null;
		if (this.props.isLoading) {
			element = <LoadingSpinner message="Loading profile information..." />;
		} else if (this.props.currentProfile.readOnly) {
			element = (
				<ViewProfile
					profile={ this.props.currentProfile }
					username={ username }
				/>
			);
		} else {
			element = (
				<EditProfile
					profile={ this.props.currentProfile }
					username={ username }
				/>
			);
		}

		return (
			<div>
				<PageTitle title="Profile" />
				{ element }
			</div>
		);
	}
}

Profile.propTypes = {
	currentProfile: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	match: PropTypes.object.isRequired
};

export default withRouter(connectToStores(Profile));
