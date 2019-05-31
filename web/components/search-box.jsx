import { Button, FormControl, Glyphicon, InputGroup } from 'react-bootstrap';
import FormGroup from './form-group';
import PropTypes from 'prop-types';
import React from 'react';

class SearchBox extends React.Component {
	render() {
		return (
			<FormGroup
				controlId={ this.props.controlId }
				label="Search"
			>
				<InputGroup>
					<FormControl
						autoFocus
						placeholder="Type search term here."
					/>
					<InputGroup.Button>
						<Button>
							<Glyphicon glyph="search" />
						</Button>
					</InputGroup.Button>
				</InputGroup>
			</FormGroup>
		);
	}
}

SearchBox.propTypes = {
	controlId: PropTypes.string.isRequired
};

export default SearchBox;
