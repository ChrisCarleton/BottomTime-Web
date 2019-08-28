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
		const { controlId, getValue, isPristine, label, readOnly } = this.props;
		const validationState = isPristine() ? null : 'success';

		return (
			<FormGroup
				controlId={ controlId }
				label={ label }
				validationState={ validationState }
			>
				<Ratings
					rating={ getValue() }
					changeRating={ this.handleRatingChanged }
					readOnly={ readOnly }
				/>
			</FormGroup>
		);
	}
}

StarRating.propTypes = {
	readOnly: PropTypes.bool,
	...formsyProps
};

export default withFormsy(StarRating);
