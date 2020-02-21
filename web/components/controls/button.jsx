import PropTypes from 'prop-types';
import React from 'react';

class Button extends React.Component {
	render() {
		const {
			navigateTo
		} = this.props;

		if (navigateTo) {
			return null;
		}

		return null;
	}
}

Button.propTypes = {
	navigateTo: PropTypes.string
};

export default Button;
