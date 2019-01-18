import Formsy from 'formsy-react';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import StaticField from '../../components/static-field';

class ViewProfile extends React.Component {
	render() {
		return (
			<Formsy>
				<Row>
					<Col sm={ 12 }>
						<StaticField
							controlId="memberSince"
							label="Member since"
							name="memberSince"
							value={ moment(this.props.profile.memberSince).fromNow() }
						/>
						<StaticField
							controlId="firstName"
							label="First name"
							name="firstName"
							value={ this.props.profile.firstName }
						/>
						<StaticField
							controlId="lastName"
							label="Last name"
							name="lastName"
							value={ this.props.profile.firstName }
						/>

					</Col>
				</Row>
			</Formsy>
		);
	}
}

ViewProfile.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ViewProfile;
