import FormGroup from './form-group';
import { propTypes as formsyProps, withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';
import ReactStarRating from 'react-star-rating';

class StarRating extends React.Component {
	constructor(props) {
		super(props);
		this.handleRatingChanged = this.handleRatingChanged.bind(this);
	}

	handleRatingChanged(e, data) {
		this.props.setValue(data.rating);
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
				<ReactStarRating
					caption={ label }
					rating={ getValue() || 0 }
					disabled={ readOnly }
					onRatingClick={ this.handleRatingChanged }
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
