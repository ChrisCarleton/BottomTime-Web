import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import {
	Breadcrumb,
	Col,
	Grid,
	Row
} from 'react-bootstrap';

class LogEntry extends React.Component {
	render() {
		return (
			<div>
				<Breadcrumb>
					<LinkContainer to="/">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
					</LinkContainer>
					<LinkContainer to="/logs">
						<Breadcrumb.Item>My Logs</Breadcrumb.Item>
					</LinkContainer>
					<Breadcrumb.Item active>New Log Item</Breadcrumb.Item>
				</Breadcrumb>

				<h1>New Log Entry</h1>

				<Grid>
					<Row>
						<Col></Col>
					</Row>
				</Grid>
			</div>);
	}
}

export default LogEntry;
