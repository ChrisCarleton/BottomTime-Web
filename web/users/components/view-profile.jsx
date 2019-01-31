import _ from 'lodash';
import Formsy from 'formsy-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import StaticField from '../../components/static-field';

class ViewProfile extends React.Component {
	render() {
		const { firstName, lastName } = this.props.profile;
		let fullName = null;

		if (firstName && lastName) {
			fullName = `${ firstName } ${ lastName }`;
		} else if (firstName) {
			fullName = firstName;
		} else if (lastName) {
			fullName = lastName;
		} else {
			fullName = this.props.username;
		}

		return (
			<Formsy className="form-horizontal">
				<h4>Personal Info</h4>
				<StaticField
					controlId="memberSince"
					label="Member since"
					name="memberSince"
					default="unspecified"
					value={ moment(this.props.profile.memberSince).fromNow() }
				/>
				<StaticField
					controlId="name"
					label="Name"
					name="name"
					default="unspecified"
					value={ fullName }
				/>
				<StaticField
					controlId="location"
					label="Location"
					default="unspecified"
					name="location"
					value={ this.props.profile.location }
				/>
				<StaticField
					controlId="occupation"
					label="Occupation"
					name="occupation"
					default="unspecified"
					value={ this.props.profile.occupation }
				/>
				<StaticField
					controlId="gender"
					label="Gender"
					name="gender"
					value={ _.capitalize(this.props.profile.gender) }
					default="unspecified"
				/>
				<StaticField
					controlId="birthdate"
					label="Birthdate"
					name="birthdate"
					defualt="unspecified"
					value={
						this.props.profile.birthdate
							? moment(this.props.profile.birthdate, 'YYYY-MM-DD')
								.local()
								.format('MMMM D, YYYY')
							: null
					}
				/>
				<StaticField
					controlId="about"
					label="General info"
					name="about"
					default="unspecified"
					value={ this.props.profile.about }
				/>

				<h4>Diving Background</h4>
				<StaticField
					controlId="divesLogged"
					label="Dives logged"
					name="divesLogged"
					default="unspecified"
					value={ this.props.profile.divesLogged || '0' }
				/>
				<StaticField
					controlId="bottomTimeLogged"
					label="Total bottom time"
					name="bottomTimeLogged"
					default="unspecified"
					value={ `${ this.props.profile.bottomTimeLogged } minutes` }
				/>
				<StaticField
					controlId="typeOfDiver"
					label="Type of diver"
					name="typeOfDiver"
					default="unspecified"
					value={ this.props.profile.typeOfDiver }
				/>
				<StaticField
					controlId="startedDiving"
					label="Started diving"
					name="startedDiving"
					default="unspecified"
					value={ this.props.profile.startedDiving }
				/>
				<StaticField
					controlId="certificationLevel"
					label="Certification level"
					name="certificationLevel"
					default="unspecified"
					value={ this.props.profile.certificationLevel }
				/>
				<StaticField
					controlId="certificationAgencies"
					label="Certification agencies"
					name="certificationAgencies"
					default="unspecified"
					value={ this.props.profile.certificationAgencies }
				/>
				<StaticField
					controlId="specialties"
					label="Specialty certifications"
					name="specialties"
					default="unspecified"
					value={ this.props.profile.specialties }
				/>
			</Formsy>
		);
	}
}

ViewProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired
};

export default ViewProfile;
