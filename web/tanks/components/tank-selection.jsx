import agent from '../../agent';
import { Button, ButtonGroup, FormControl } from 'react-bootstrap';
import ConfirmDialog from '../../components/confirm-dialog';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import EditTankProfile from './edit-tank-profile';
import ErrorActions from '../../actions/error-actions';
import FormGroup from '../../components/form-group';
import HiddenField from '../../components/hidden-field';
import LogEntryUtilities from '../../dive-log/components/log-entry-utilities';
import { propTypes as formsyProps, withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';
import TanksActions from '../actions/tanks-actions';
import TanksStore from '../stores/tanks-store';
import { isUndefined } from 'util';

class TankSelection extends React.Component {
	static getStores() {
		return [ CurrentUserStore, TanksStore ];
	}

	static getPropsFromStores() {
		const { userTanks } = TanksStore.getState();
		const { pressureUnit } = CurrentUserStore.getState().currentUser;
		return {
			tanks: userTanks,
			pressureUnit
		};
	}

	constructor(props) {
		super(props);

		this.state = {
			showConfirmDeleteDialog: false,
			showEditDialog: false,
			editValue: null
		};

		this.handleChanged = this.handleChanged.bind(this);
		this.handleCreateNewTankProfile = this.handleCreateNewTankProfile.bind(this);
		this.handleEditTankProfile = this.handleEditTankProfile.bind(this);
		this.handleDeleteTankProfile = this.handleDeleteTankProfile.bind(this);
		this.handleDeleteCancelled = this.handleDeleteCancelled.bind(this);
		this.handleDeleteConfirmed = this.handleDeleteConfirmed.bind(this);
		this.handleEditCanceled = this.handleEditCanceled.bind(this);
		this.handleProfileSaved = this.handleProfileSaved.bind(this);
		this.getCurrentValue = this.getCurrentValue.bind(this);
	}

	handleChanged(e) {
		this.props.setValue(e.currentTarget.value);
	}

	handleCreateNewTankProfile() {
		this.setState({
			...this.state,
			showEditDialog: true,
			editValue: null
		});
	}

	handleEditTankProfile() {
		this.setState({
			...this.state,
			showEditDialog: true,
			editValue: this.props.tanks[this.props.getValue()]
		});
	}

	handleDeleteTankProfile() {
		this.setState({
			...this.state,
			showConfirmDeleteDialog: true
		});
	}

	async handleDeleteConfirmed() {
		const currentTank = this.props.tanks[this.props.getValue()];
		if (!currentTank) {
			return;
		}

		this.setState({
			...this.state,
			showConfirmDeleteDialog: false
		});

		try {
			await agent.del(`/api/tanks/${ currentTank.tankId }`);
			TanksActions.removeTank(currentTank.name);
			ErrorActions.showSuccess('Tank profile has been deleted');
		} catch (err) {
			ErrorActions.showError(
				'Failed to delete tank profile',
				'An error occurred on the server. Please try again later.'
			);
		}
	}

	handleDeleteCancelled() {
		this.setState({
			...this.state,
			showConfirmDeleteDialog: false
		});
	}

	handleEditCanceled() {
		this.setState({
			...this.state,
			showEditDialog: false
		});
	}

	async handleProfileSaved(model, conflict) {
		const { oldName, tankId } = model;
		delete model.tankId;
		delete model.oldName;

		try {
			if (tankId) {
				await agent
					.put(`/api/tanks/${ tankId }`)
					.send(model);
				TanksActions.updateTank(model, oldName);
			} else {
				const response = await agent
					.post('/api/tanks')
					.send(model);
				TanksActions.updateTank(response.body, oldName);
			}
			ErrorActions.showSuccess('Tank profile has been saved.');
			this.props.setValue(model.name);

			this.setState({
				...this.state,
				showEditDialog: false
			});
		} catch (err) {
			if (err.response.status === 409) {
				conflict();
			} else {
				ErrorActions.showError('Failed to save tank profile');
			}
		}
	}

	renderSize(size) {
		return size ? `${ size }L` : '';
	}

	renderMaterial(material) {
		switch (material) {
		case 'al':
			return 'Aluminum';

		case 'fe':
			return 'Steel';

		default:
			return '';
		}
	}

	renderPressure(pressure, unit) {
		return pressure
			? `${ LogEntryUtilities.renderPressure(pressure, unit) }${ unit }`
			: '';
	}

	getCurrentValue() {
		const { air } = this.props;
		const selected = this.props.tanks[this.props.getValue()];

		return this.props.isPristine()
			? {
				tankId: selected ? selected.tankId : null,
				isCustom: selected ? selected.isCustom : null,
				name: air.name,
				size: air.size,
				workingPressure: air.workingPressure,
				material: air.material,
				isMissing: isUndefined(selected)
			}
			: selected || {};
	}

	render() {
		const currentValue = this.getCurrentValue();
		const { pressureUnit } = this.props;
		const validationState = this.props.isPristine() ? null : 'success';

		return (
			<FormGroup
				controlId={ this.props.controlId }
				label={ this.props.label }
				validationState={ validationState }
			>
				<EditTankProfile
					show={ this.state.showEditDialog }
					value={ this.state.editValue }
					onCancel={ this.handleEditCanceled }
					onSave={ this.handleProfileSaved }
					pressureUnit={ pressureUnit }
				/>
				<ConfirmDialog
					show={ this.state.showConfirmDeleteDialog }
					message="Are you sure you want to delete this tank profile?"
					title="Confirm Delete"
					onConfirm={ this.handleDeleteConfirmed }
					onCancel={ this.handleDeleteCancelled }
				/>
				<FormControl
					componentClass="select"
					value={ this.props.getValue() }
					onChange={ this.handleChanged }
				>
					<option />
					{
						currentValue.isMissing
							? <option value={ currentValue.name }>{ currentValue.name }</option>
							: null
					}
					{
						Object.values(this.props.tanks).map(t => (
							<option key={ t.name } value={ t.name }>{ t.name }</option>
						))
					}
				</FormControl>
				<ButtonGroup>
					<Button
						id="btn-create-tank-profile"
						onClick={ this.handleCreateNewTankProfile }
						bsStyle="link"
					>
						create new
					</Button>
					{
						currentValue.name
							? (
								<Button
									bsStyle="link"
									onClick={ this.handleEditTankProfile }
								>
									edit
								</Button>
							)
							: null
					}
					{
						currentValue.isCustom
							? (
								<Button
									bsStyle="link"
									onClick={ this.handleDeleteTankProfile }
								>
									delete
								</Button>
							)
							: null
					}
				</ButtonGroup>
				<dl className="dl-horizontal">
					<dt>Size</dt>
					<dd>{ this.renderSize(currentValue.size) }</dd>
					<dt>Working pressure</dt>
					<dd>{ this.renderPressure(currentValue.workingPressure, pressureUnit) }</dd>
					<dt>Material</dt>
					<dd>{ this.renderMaterial(currentValue.material) }</dd>
				</dl>
				<HiddenField
					id="air[0].size"
					name="air[0].size"
					value={ currentValue.size || '' }
				/>
				<HiddenField
					id="air[0].workingPressure"
					name="air[0].workingPressure"
					value={ currentValue.workingPressure || '' }
				/>
				<HiddenField
					id="air[0].material"
					name="air[0].material"
					value={ currentValue.material || '' }
				/>
			</FormGroup>
		);
	}
}

TankSelection.propTypes = {
	...formsyProps,
	air: PropTypes.object,
	pressureUnit: PropTypes.string.isRequired,
	tanks: PropTypes.object.isRequired
};

export default withFormsy(connectToStores(TankSelection));
