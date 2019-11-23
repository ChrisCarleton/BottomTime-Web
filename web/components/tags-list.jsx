import { FormControl } from 'react-bootstrap';
import FormGroup from './form-group';
import { propTypes as formsyProps, withFormsy } from 'formsy-react';
import React from 'react';
import TagsListControl from './tags-list-control';

class TagsList extends React.Component {
	render() {
		return (
			<FormGroup
				label={ this.props.label }
				controlId={ this.props.controlId }
			>
				<FormControl.Static>
					<TagsListControl tags={ this.props.getValue() } />
				</FormControl.Static>
			</FormGroup>
		);
	}
}

TagsList.propTypes = {
	...formsyProps
};

export default withFormsy(TagsList);
