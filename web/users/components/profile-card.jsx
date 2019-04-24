import agent from '../../agent';
import { Glyphicon } from 'react-bootstrap';
import handleError from '../../handle-error';
import LoadingSpinner from '../../components/loading-spinner';
import PropTypes from 'prop-types';
import React from 'react';
import ViewProfile from './view-profile';

class ProfileCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: null,
			noAccess: false
		};
	}

	componentDidMount() {
		setTimeout(async () => {
			try {
				const response = await agent
					.get(`/api/users/${ this.props.username }/profile`);
				this.setState({
					...this.state,
					profile: response.body
				});
			} catch (err) {
				if (err.response.status === 403) {
					this.setState({
						...this.state,
						noAccess: true
					});
				} else {
					handleError(err);
				}
			}
		}, 0);
	}

	render() {
		if (this.state.noAccess) {
			return (
				<p>
					<Glyphicon glyph="ban-circle" />
					&nbsp;
					<em>{ 'This user\'s profile is private or only visible to friends.' }</em>
				</p>
			);
		}

		if (!this.state.profile) {
			return <LoadingSpinner message="Retrieving user's profile info..." />;
		}

		return <ViewProfile profile={ this.state.profile } />;
	}
}

ProfileCard.propTypes = {
	username: PropTypes.string.isRequired
};

export default ProfileCard;
