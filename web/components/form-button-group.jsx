import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

class FormButtonGroup extends React.Component {
	render() {
		return (
			<Row>
				<Col xs={ 12 } smOffset={ 3 } sm={ 9 } mdOffset={ 3 } md={ 9 }>
					{ this.props.children }
				</Col>
			</Row>
		);
	}
}

FormButtonGroup.propTypes = {
	children: PropTypes.node
};

export default FormButtonGroup;
