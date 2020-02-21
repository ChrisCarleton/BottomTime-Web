import { Button, Modal } from 'react-bootstrap';
import Dot from 'dot-object';
import Formsy from 'formsy-react';
import HiddenField from '../../components/hidden-field';
import LogEntryUtilities from '../../dive-log/utils/log-entry-utilities';
import { nullIfEmpty, trim, toPressure } from '../../transform-functions';
import PropTypes from 'prop-types';
import RadioList from '../../components/radio-list';
import React from 'react';
import TextBox from '../../components/text-box';

const dot = new Dot();
dot.override = true;

class EditTankProfile extends React.Component {
	constructor(props) {
		super(props);

		this.formRef = React.createRef();

		this.handleCancel = this.handleCancel.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	handleCancel() {
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	}

	handleSave(model, resetForm, invalidateForm) {
		if (this.props.onSave) {
			this.props.onSave(model, () => {
				invalidateForm({
					name: 'This name is already taken. Please choose a unique name for your tank profile.'
				});
			});
		}
	}

	mapping(model) {
		const mods = {
			'name': trim,
			'size': nullIfEmpty,
			'workingPressure': [ nullIfEmpty, toPressure ],
			'material': nullIfEmpty
		};
		return dot.object(model, mods);
	}

	render() {
		const { pressureUnit, show } = this.props;
		const value = this.props.value || {};

		return (
			<Modal show={ show } onHide={ this.handleCancel }>
				<Modal.Header closeButton>
					<Modal.Title>Edit Tank Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Formsy
						ref={ this.formRef }
						onValidSubmit={ this.handleSave }
						mapping={ this.mapping }
					>
						<HiddenField
							id="tank-profile-id"
							name="tankId"
							value={ value.tankId || '' }
						/>
						<HiddenField
							id="tank-profile-oldName"
							name="oldName"
							value={ value.name }
						/>
						<TextBox
							autoFocus
							controlId="tank-profile-name"
							name="name"
							label="Name"
							value={ value.name || '' }
							placeholder="E.g. My Steel 100"
							required
							maxLength={ 100 }
						/>
						<TextBox
							controlId="tank-profile-size"
							name="size"
							label="Size"
							value={ value.size || '' }
							units="L"
							validations={ {
								isGreaterThan: 0
							} }
							validationErrors={ {
								isGreaterThan: 'Size must be a positive number.'
							} }
						/>
						<TextBox
							controlId="tank-profile-workingPressure"
							name="workingPressure"
							label="Working pressure"
							value={ LogEntryUtilities.renderPressure(value.workingPressure, pressureUnit) }
							units={ pressureUnit }
							validations={ {
								isGreaterThan: 0
							} }
							validationErrors={ {
								isGreaterThan: 'Working pressure must be a positive number.'
							} }
						/>
						<RadioList
							controlId="material"
							name="material"
							label="Material"
							value={ value.material || '' }
							inline
						>
							{ [
								{ text: 'Aluminum', value: 'al' },
								{ text: 'Steel', value: 'fe' }
							] }
						</RadioList>
					</Formsy>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={ () => this.formRef.current.submit() }>Save</Button>
					&nbsp;
					<Button onClick={ this.handleCancel }>Cancel</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

EditTankProfile.propTypes = {
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	pressureUnit: PropTypes.string.isRequired,
	show: PropTypes.bool,
	value: PropTypes.object
};

export default EditTankProfile;
