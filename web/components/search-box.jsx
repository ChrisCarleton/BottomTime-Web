import { Button, FormControl, Glyphicon, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

class SearchBox extends React.Component {
	render() {
		return (
			<InputGroup>
				<FormControl
					autoFocus
					controlId={ this.props.controlId }
					placeholder={ this.props.placeholder || 'Search' }
				/>
				<InputGroup.Button>
					<Button>
						<Glyphicon glyph="search" />
					</Button>
				</InputGroup.Button>
			</InputGroup>
		);
	}
}

SearchBox.propTypes = {
	controlId: PropTypes.string.isRequired,
	placeholder: PropTypes.string
};

export default SearchBox;
