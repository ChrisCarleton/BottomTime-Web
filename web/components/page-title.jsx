import PropTypes from 'prop-types';
import React from 'react';

const TitlePrefix = 'Bottom Time';

class PageTitle extends React.Component {
	componentDidMount() {
		if (typeof (this.props.title) === 'function') {
			document.title = `${ TitlePrefix } | ${ this.props.title() }`;
		} else if (typeof (this.props.title) === 'string') {
			document.title = `${ TitlePrefix } | ${ this.props.title }`;
		} else {
			document.title = TitlePrefix;
		}
	}

	render() {
		if (this.props.hidden) {
			return null;
		}

		const title = typeof (this.props.title) === 'function'
			? this.props.title()
			: this.props.title;
		return <h1>{ title }</h1>;
	}
}

PageTitle.propTypes = {
	hidden: PropTypes.bool,
	title: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ])
};

export default PageTitle;
