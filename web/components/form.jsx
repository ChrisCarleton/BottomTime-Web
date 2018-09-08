import PropTypes from 'prop-types';
import React from 'react';

import Formsy from 'formsy-react';

class Form extends React.Component {
	render() {
		return (
			<Formsy className={ this.props.inline ? "inline" : null }>
				{ this.props.children }
			</Formsy>);
	}
}

Form.propTypes = {
	children: PropTypes.node,
	inline: PropTypes.bool
};

export default Form;
