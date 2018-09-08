import React from 'react';

import Form from '../../components/form';
import { LinkContainer } from 'react-router-bootstrap';
import {
	Breadcrumb,
	Col,
	Row
} from 'react-bootstrap';
import TextBox from '../../components/text-box';

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

				<Form>
					<TextBox
						controlId="location"
						label="Location" />
					<TextBox
						controlId="diveSite"
						label="Site" />
				</Form>
			</div>);
	}
}

export default LogEntry;
