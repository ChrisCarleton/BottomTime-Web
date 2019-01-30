import { Button, Modal } from 'react-bootstrap';
import DatePicker from '../../components/date-picker';
import FormButtonGroup from '../../components/form-button-group';
import Formsy from 'formsy-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import RadioList from '../../components/radio-list';
import React from 'react';
import SelectBox from '../../components/select-box';
import StaticField from '../../components/static-field';
import TextArea from '../../components/text-area';
import TextBox from '../../components/text-box';
import UserProfileActions from '../actions/user-profile-actions';

class EditProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showConfirmReset: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDiscardChanges = this.handleDiscardChanges.bind(this);
		this.confirmDiscardChanges = this.confirmDiscardChanges.bind(this);
		this.cancelDiscardChanges = this.cancelDiscardChanges.bind(this);
	}

	handleSubmit(model) {
		delete model.memberSince;
		delete model.divesLogged;
		delete model.bottomTimeLogged;

		model.startedDiving = model.startedDiving ? moment(model.startedDiving).year() : null;
		model.birthdate = model.birthdate ? moment(model.birthdate).format('YYYY-MM-DD') : null;

		UserProfileActions.saveProfile(
			this.props.username,
			model
		);
	}

	handleDiscardChanges() {
		this.setState(Object.assign({}, this.state, { showConfirmReset: true }));
	}

	confirmDiscardChanges() {
		this.setState(Object.assign({}, this.state, { showConfirmReset: false }));
		UserProfileActions.getProfile(this.props.username);
	}

	cancelDiscardChanges() {
		this.setState(Object.assign({}, this.state, { showConfirmReset: false }));
	}

	render() {
		return (
			<Formsy className="form-horizontal" onValidSubmit={ this.handleSubmit }>
				<Modal show={ this.state.showConfirmReset }>
					<Modal.Header>
						<Modal.Title>Confirm Reset</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Are you sure you want to reset the changes you have made?</p>
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="primary" onClick={ this.confirmDiscardChanges }>Yes</Button>
						{ ' ' }
						<Button onClick={ this.cancelDiscardChanges }>No</Button>
					</Modal.Footer>
				</Modal>
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
					inline
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
					value={ this.props.profile.firstName }
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
					value={ this.props.profile.lastName }
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
					value={ this.props.profile.location }
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
					value={ this.props.profile.occupation }
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
					value={
						this.props.profile.startedDiving
							? moment(this.props.profile.startedDiving, 'YYYY')
							: null
					}
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
				<TextBox
					controlId="certificationAgencies"
					label="Certification agencies"
					name="certificationAgencies"
					placeholder="Agencies with whom you've been certified (PADI, SSI, NAUI, etc.)"
					value={ this.props.profile.certificationAgencies }
					validations={ {
						maxLength: 100
					} }
					validationErrors={ {
						maxLength: 'Certification agencies cannot be more than 100 characters.'
					} }
					maxLength={ 100 }
				/>
				<TextBox
					controlId="specialties"
					label="Specialty certifications"
					name="specialties"
					placeholder="E.g. night diving, underwater navigation, wreck diving, etc."
					value={ this.props.profile.specialties }
					validations={ {
						maxLength: 200
					} }
					validationErrors={ {
						maxLength: 'Specialties cannot be more than 200 characters.'
					} }
					maxLength={ 200 }
				/>
				<TextArea
					controlId="about"
					label="About me"
					name="about"
					value={ this.props.profile.about }
					validations={ {
						maxLength: 1000
					} }
					validationErrors={ {
						maxLength: 'About me cannot be more than 1000 characters.'
					} }
					maxLength={ 1000 }
				/>
				<FormButtonGroup>
					<Button id="btn-save" bsStyle="primary" type="submit">Save Changes</Button>
					{ ' ' }
					<Button id="btn-reset" onClick={ this.handleDiscardChanges }>Discard Changes</Button>
				</FormButtonGroup>
			</Formsy>
		);
	}
}

EditProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired
};

export default EditProfile;
