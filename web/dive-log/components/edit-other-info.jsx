import {
	Col,
	Glyphicon,
	Row
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import Tags from '../../components/tags';
import TextArea from '../../components/text-area';

const TagSuggestions = [
	'altitude dive',
	'boat dive',
	'cave dive',
	'cavern dive',
	'cold water',
	'deep dive',
	'drift dive',
	'dry suit',
	'fresh water',
	'ice dive',
	'night dive',
	'reef',
	'salt water',
	'search and recovery',
	'shore dive',
	'training dive',
	'warm water',
	'wreck dive'
];

class OtherInfo extends React.Component {
	render() {
		const { comments, tags } = this.props.currentEntry;

		return (
			<div>
				<Row>
					<Col sm={ 12 }>
						<h3>
							<Glyphicon glyph="pencil" />&nbsp;Notes
						</h3>
					</Col>
				</Row>
				<Row>
					<Col sm={ 12 }>
						<Tags
							controlId="tags"
							name="tags"
							label="Tags"
							value={ tags || [] }
							suggestions={ TagSuggestions }
						/>
						<TextArea
							controlId="comments"
							name="comments"
							label="Comments"
							value={ comments || '' }
							maxLength={ 1000 }
						/>
					</Col>
				</Row>
			</div>
		);
	}
}

OtherInfo.propTypes = {
	currentEntry: PropTypes.object.isRequired
};

export default OtherInfo;
