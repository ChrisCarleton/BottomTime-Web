import { Col, Row } from 'react-bootstrap';
import Formsy from 'formsy-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import StaticField from '../../components/static-field';

class EditProfile extends React.Component {
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
					</Col>
				</Row>
			</Formsy>
		);
	}
}

EditProfile.propTypes = {
	profile: PropTypes.object.isRequired
};

export default EditProfile;
