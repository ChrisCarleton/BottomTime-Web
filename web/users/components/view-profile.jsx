import Formsy from 'formsy-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import StaticField from '../../components/static-field';

const Unspecified = 'unspecified';

function capitalize(s) {
	if (s && typeof (s) === 'string') {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	return '';
}

class ViewProfile extends React.Component {
	render() {
		const { firstName, lastName, bottomTimeLogged } = this.props.profile;
		const bottomTime = bottomTimeLogged > 59
			? `${ moment.duration(bottomTimeLogged, 'minutes').humanize() } (${ bottomTimeLogged } minutes)`
			: `${ bottomTimeLogged } minutes`;
		let fullName = null;

		if (firstName && lastName) {
			fullName = `${ firstName } ${ lastName }`;
		} else if (firstName) {
			fullName = firstName;
		} else if (lastName) {
			fullName = lastName;
		}

		return (
			<Formsy>
				<h4>Personal Info</h4>
				<StaticField
					controlId="memberSince"
					label="Member since"
					name="memberSince"
					default={ Unspecified }
					value={ moment(this.props.profile.memberSince).fromNow() }
				/>
				<StaticField
					controlId="name"
					label="Name"
					name="name"
					default={ Unspecified }
					value={ fullName }
				/>
				<StaticField
					controlId="location"
					label="Location"
					default={ Unspecified }
					name="location"
					value={ this.props.profile.location }
				/>
				<StaticField
					controlId="occupation"
					label="Occupation"
					name="occupation"
					default={ Unspecified }
					value={ this.props.profile.occupation }
				/>
				<StaticField
					controlId="gender"
					label="Gender"
					name="gender"
					value={ capitalize(this.props.profile.gender) }
					default={ Unspecified }
				/>
				<StaticField
					controlId="birthdate"
					label="Birthdate"
					name="birthdate"
					defualt={ Unspecified }
					value={
						this.props.profile.birthdate
							? moment(this.props.profile.birthdate, 'YYYY-MM-DD')
								.local()
								.format('MMMM D, YYYY')
							: Unspecified
					}
				/>
				<StaticField
					controlId="about"
					label="General info"
					name="about"
					default={ Unspecified }
					value={ this.props.profile.about }
				/>

				<h4>Diving Background</h4>
				<StaticField
					controlId="divesLogged"
					label="Dives logged"
					name="divesLogged"
					default={ Unspecified }
					value={ this.props.profile.divesLogged || '0' }
				/>
				<StaticField
					controlId="bottomTimeLogged"
					label="Total bottom time"
					name="bottomTimeLogged"
					default={ Unspecified }
					value={ bottomTime }
				/>
				<StaticField
					controlId="typeOfDiver"
					label="Type of diver"
					name="typeOfDiver"
					default={ Unspecified }
					value={ this.props.profile.typeOfDiver }
				/>
				<StaticField
					controlId="startedDiving"
					label="Started diving"
					name="startedDiving"
					default={ Unspecified }
					value={ this.props.profile.startedDiving }
				/>
				<StaticField
					controlId="certificationLevel"
					label="Certification level"
					name="certificationLevel"
					default={ Unspecified }
					value={ this.props.profile.certificationLevel }
				/>
				<StaticField
					controlId="certificationAgencies"
					label="Certification agencies"
					name="certificationAgencies"
					default={ Unspecified }
					value={ this.props.profile.certificationAgencies }
				/>
				<StaticField
					controlId="specialties"
					label="Specialty certifications"
					name="specialties"
					default={ Unspecified }
					value={ this.props.profile.specialties }
				/>
			</Formsy>
		);
	}
}

ViewProfile.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ViewProfile;
