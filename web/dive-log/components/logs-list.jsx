import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Breadcrumb, Button } from 'react-bootstrap';

class LogsList extends React.Component {
	render() {
		return (
			<div>
				<Breadcrumb>
					<LinkContainer to="/">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
					</LinkContainer>
					<Breadcrumb.Item active>My Logs</Breadcrumb.Item>
				</Breadcrumb>

				<h1>Logs List!</h1>

				<LinkContainer to="/logs/new">
					<Button bsStyle="primary">Create New</Button>
				</LinkContainer>
			</div>);
	}
}

export default LogsList;
