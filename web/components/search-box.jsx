import { Button, FormControl, Glyphicon, InputGroup } from 'react-bootstrap';
import FormGroup from './form-group';
import { propTypes as formsyProps, withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';

class SearchBox extends React.Component {
	constructor(props) {
		super(props);

		this.handleTextChanged = this.handleTextChanged.bind(this);
	}

	handleTextChanged(e) {
		this.props.setValue(e.target.value);
	}

	render() {
		return (
			<FormGroup
				controlId={ this.props.controlId }
			>
				<InputGroup>
					<FormControl
						autoFocus={ this.props.autoFocus }
						placeholder={ this.props.placeholder || 'Search' }
						value={ this.props.getValue() || '' }
						onChange={ this.handleTextChanged }
					/>
					<InputGroup.Button>
						<Button type="submit">
							<Glyphicon glyph="search" />
						</Button>
					</InputGroup.Button>
				</InputGroup>
			</FormGroup>
		);
	}
}

SearchBox.propTypes = {
	autoFocus: PropTypes.bool,
	controlId: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	...formsyProps
};

export default withFormsy(SearchBox);
