import FormGroup from './form-group';
import { propTypes as formsyProps, withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import Ratings from './rating-control';
import React from 'react';

class StarRating extends React.Component {
	constructor(props) {
		super(props);
		this.handleRatingChanged = this.handleRatingChanged.bind(this);
	}

	handleRatingChanged(rating) {
		this.props.setValue(rating);
	}

	render() {
		const {
			controlId,
			getValue,
			isPristine,
			label,
			readOnly,
			required,
			showRequired
		} = this.props;
		let validationState = null;
		let errorMessage = null;

		if (!isPristine() && showRequired()) {
			errorMessage = `${ label } is required.`;
			validationState = 'error';
		} else if (!isPristine()) {
			validationState = 'success';
		}

		return (
			<FormGroup
				controlId={ controlId }
				label={ label }
				validationState={ validationState }
				errorMessage={ errorMessage }
				required={ required }
			>
				<div>
					<Ratings
						rating={ getValue() }
						changeRating={ this.handleRatingChanged }
						readOnly={ readOnly }
						large
					/>
				</div>
			</FormGroup>
		);
	}
}

StarRating.propTypes = {
	readOnly: PropTypes.bool,
	...formsyProps
};

export default withFormsy(StarRating);
