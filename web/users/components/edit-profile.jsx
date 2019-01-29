import { Button } from 'react-bootstrap';
import FormButtonGroup from '../../components/form-button-group';
import Formsy from 'formsy-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import RadioList from '../../components/radio-list';
import React from 'react';
import StaticField from '../../components/static-field';
import TextBox from '../../components/text-box';

class EditProfile extends React.Component {
	render() {
		return (
			<Formsy className="form-horizontal">
				<StaticField
					controlId="memberSince"
					label="Member since"
					name="memberSince"
					value={ moment(this.props.profile.memberSince).fromNow() }
				/>
				<StaticField
					controlId="divesLogged"
					label="Dives logged"
					name="divesLogged"
					value={ this.props.profile.divesLogged || '0' }
				/>
				<StaticField
					controlId="bottomTimeLogged"
					label="Total bottom time"
					name="bottomTimeLogged"
					default="unspecified"
					value={ `${ this.props.profile.bottomTimeLogged } minutes` }
				/>
				<RadioList
					controlId="logsVisibility"
					name="logsVisibility"
					label="Profile visible to"
					value={ this.props.profile.logsVisibility }
					required
					inline
				>
					{ [
						{ text: 'Anyone', value: 'public', title: 'Anyone can view your profile and log book' },
						{ text: 'My friends', value: 'friends-only', title: 'Only people you have friended can view your profile and log book' },
						{ text: 'Just me', value: 'private', title: 'Only you can view your profile and log book' }
					] }
				</RadioList>
				<TextBox
					controlId="firstName"
					label="First name"
					name="firstName"
					value={ this.props.profile.firstName || '' }
					validations={ {
						maxLength: 50
					} }
					validationErrors={ {
						maxLength: 'First name cannot be more than 50 characters.'
					} }
					maxLength={ 50 }
				/>
				<TextBox
					controlId="lastName"
					label="Last name"
					name="lastName"
					value={ this.props.profile.lastName || '' }
					validations={ {
						maxLength: 50
					} }
					validationErrors={ {
						maxLength: 'Last name cannot be more than 50 characters.'
					} }
					maxLength={ 50 }
				/>
				<FormButtonGroup>
					<Button id="btn-save" bsStyle="primary" type="submit">Save Changes</Button>
					{ JSON.stringify(this.props.profile) }
				</FormButtonGroup>
			</Formsy>
		);
	}
}

EditProfile.propTypes = {
	profile: PropTypes.object.isRequired
};

export default EditProfile;
