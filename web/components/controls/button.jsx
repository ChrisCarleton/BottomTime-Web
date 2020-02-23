import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.handleClicked = this.handleClicked.bind(this);
	}

	handleClicked() {
		const { history, navigateTo, onClick } = this.props;

		if (onClick) {
			onClick();
		}

		if (navigateTo) {
			history.push(navigateTo);
		}
	}

	render() {
		const {
			buttonStyle,
			buttonType,
			children,
			disabled
		} = this.props;

		switch (buttonStyle) {
		default:
		}

		return (
			<button disabled={ disabled } type={ buttonType } onClick={ this.handleClicked }>
				{ children }
			</button>
		);
	}
}

Button.propTypes = {
	buttonType: PropTypes.oneOf([ 'button', 'submit', 'reset' ]).isRequired,
	buttonStyle: PropTypes.oneOf([ 'default', 'primary', 'danger', 'link' ]).isRequired,
	disabled: PropTypes.bool,
	children: PropTypes.node,
	history: PropTypes.object,
	navigateTo: PropTypes.string,
	onClick: PropTypes.func
};

Button.defaultProps = {
	buttonType: 'button',
	buttonStyle: 'default'
};

export default withRouter(Button);
