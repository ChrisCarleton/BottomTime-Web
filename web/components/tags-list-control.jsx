import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

class TagsListControl extends React.Component {
	render() {
		const tags = this.props.tags || [];
		const badges = [];

		tags.forEach((tag, i) => {
			badges.push(<Badge key={ `tag_${ i }` }>{ tag }</Badge>);

			if (i < tags.length - 1) {
				badges.push(<span key={ `span_${ i }` }>{ ' ' }</span>);
			}
		});

		return badges;
	}
}

TagsListControl.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string)
};

export default TagsListControl;
