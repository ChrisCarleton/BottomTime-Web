import { Col, FormControl } from 'react-bootstrap';
import FormGroup from '../../components/form-group';
import React from 'react';
import { propTypes, withFormsy } from 'formsy-react';

class TankCapacity extends React.Component {
	constructor(props) {
		super(props);

		this.handleUnitChanged = this.handleUnitChanged.bind(this);
		this.handleVolumeChanged = this.handleVolumeChanged.bind(this);
	}

	handleVolumeChanged(e) {
		this.props.setValue({
			...this.props.getValue(),
			volume: e.target.value
		});
	}

	handleUnitChanged(e) {
		this.props.setValue({
			...this.props.getValue(),
			volumeUnit: e.currentTarget.value
		});
	}

	render() {
		const { volume, volumeUnit } = this.props.getValue();
		return (
			<FormGroup
				controlId={ this.props.controlId }
				label={ this.props.label }
			>
				<Col sm={ 6 }>
					<FormControl
						type="text"
						maxLength={ 4 }
						onChange={ this.handleVolumeChanged }
						value={ volume || '' }
					/>
				</Col>
				<Col sm={ 6 }>
					<FormControl
						onChange={ this.handleUnitChanged }
						componentClass="select"
						value={ volumeUnit || 'L' }
					>
						<option value="L">L</option>
						<option value="cf">cf</option>
					</FormControl>
				</Col>
			</FormGroup>
		);
	}
}

TankCapacity.propTypes = {
	...propTypes
};

export default withFormsy(TankCapacity);
