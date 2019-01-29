import Formsy from 'formsy-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import StaticField from '../../components/static-field';

class ViewProfile extends React.Component {
	render() {
		return (
			<Formsy className="form-horizontal">
				<StaticField
					controlId="memberSince"
					label="Member since"
					name="memberSince"
					default="unspecified"
					value={ moment(this.props.profile.memberSince).fromNow() }
				/>
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
					controlId="firstName"
					label="First name"
					name="firstName"
					default="unspecified"
					value={ this.props.profile.firstName }
				/>
				<StaticField
					controlId="lastName"
					label="Last name"
					name="lastName"
					default="unspecified"
					value={ this.props.profile.lastName }
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
					value={ this.props.profile.gender }
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
				<StaticField
					controlId="about"
					label="About me"
					name="about"
					default="unspecified"
					value={ this.props.profile.about }
				/>
			</Formsy>
		);
	}
}

ViewProfile.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ViewProfile;
