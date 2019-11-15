import { Badge, FormControl } from 'react-bootstrap';
import FormGroup from './form-group';
import { propTypes as formsyProps, withFormsy } from 'formsy-react';
import React from 'react';

class TagsList extends React.Component {
	render() {
		const tags = this.props.getValue() || [];

		const badges = [];
		tags.forEach((tag, i) => {
			badges.push(<Badge key={ tag }>{ tag }</Badge>);

			if (i < tags.length - 1) {
				badges.push(<span key={ i }>{ ' ' }</span>);
			}
		});

		return (
			<FormGroup
				label={ this.props.label }
				controlId={ this.props.controlId }
			>
				<FormControl.Static>{ badges }</FormControl.Static>
			</FormGroup>
		);
	}
}

TagsList.propTypes = {
	...formsyProps
};

export default withFormsy(TagsList);
