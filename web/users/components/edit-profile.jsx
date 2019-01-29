import { Button } from 'react-bootstrap';
import DatePicker from '../../components/date-picker';
import FormButtonGroup from '../../components/form-button-group';
import Formsy from 'formsy-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import RadioList from '../../components/radio-list';
import React from 'react';
import SelectBox from '../../components/select-box';
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
				>
					{ [
						{ text: 'Everyone', value: 'public', title: 'Anyone can view your profile and log book' },
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
				<TextBox
					controlId="location"
					label="Location"
					name="location"
					placeholder="General area where you live (e.g. city)"
					value={ this.props.profile.location || '' }
					validations={ {
						maxLength: 100
					} }
					validationErrors={ {
						maxLength: 'Location cannot be more than 100 characters.'
					} }
					maxLength={ 100 }
				/>
				<TextBox
					controlId="occupation"
					label="Occupation"
					name="occupation"
					value={ this.props.profile.occupation || '' }
					validations={ {
						maxLength: 50
					} }
					validationErrors={ {
						maxLength: 'Occupation cannot be more than 50 characters.'
					} }
					maxLength={ 50 }
					placeholder="What you do for a living"
				/>
				<RadioList
					controlId="gender"
					name="gender"
					label="Gender"
					value={ this.props.profile.gender }
					inline
				>
					{ [
						{ text: 'Male', value: 'male' },
						{ text: 'Female', value: 'female' }
					] }
				</RadioList>
				<DatePicker
					controlId="birthdate"
					label="Birthdate"
					name="birthdate"
					value={ this.props.profile.birthdate }
					hideTime
				/>
				<SelectBox
					controlId="typeOfDiver"
					label="Type of diver"
					name="typeOfDiver"
					value={ this.props.profile.typeOfDiver }
				>
					<option></option>
					<option>New to diving</option>
					<option>Casual/vacation diver</option>
					<option>Typical diver</option>
					<option>Experienced diver</option>
					<option>Tech diver</option>
					<option>Commercial diver</option>
					<option>Divemaster</option>
					<option>Instructor</option>
					<option>Professional diver</option>
				</SelectBox>
				<DatePicker
					controlId="startedDiving"
					label="Started diving"
					name="startedDiving"
					value={ this.props.profile.startedDiving }
					hideTime
					dateFormat="YYYY"
				/>
				<SelectBox
					controlId="certificationLevel"
					label="Certification level"
					name="certificationLevel"
					value={ this.props.profile.certificationLevel }
				>
					<option></option>
					<option>Open Water</option>
					<option>Advanced Open Water</option>
					<option>Rescue Diver</option>
					<option>Divemaster</option>
					<option>Assistant Instructor</option>
					<option>Instructor</option>
					<option>Course Director</option>
				</SelectBox>
				<FormButtonGroup>
					<Button id="btn-save" bsStyle="primary" type="submit">Save Changes</Button>
					{ ' ' }
					<Button id="btn-reset">Discard Changes</Button>
				</FormButtonGroup>
			</Formsy>
		);
	}
}

EditProfile.propTypes = {
	profile: PropTypes.object.isRequired
};

export default EditProfile;
