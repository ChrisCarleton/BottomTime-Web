import React from 'react';
import LogEntryActions from '../../actions/log-entry-actions';
import LogEntryStore from '../../stores/log-entry-store';

import DatePicker from '../../components/date-picker';
import Form from '../../components/form';
import { LinkContainer } from 'react-router-bootstrap';
import {
	Breadcrumb,
	Button,
	Col,
	Row
} from 'react-bootstrap';
import TextBox from '../../components/text-box';

class LogEntry extends React.Component {
	constructor(props) {
		super(props);
		this.state = LogEntryStore.getState();

		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this);
		this.onEntryChanged = this.onEntryChanged.bind(this);
	}

	componentDidMount() {
		LogEntryStore.listen(this.onEntryChanged);
	}

	componentWillUnmount() {
		LogEntryStore.unlisten(this.onEntryChanged);
	}

	onEntryChanged() {
		this.setState(LogEntryStore.getState());
	}

	onValueChanged(change) {
		const newState = Object.assign({}, this.state, change);
		LogEntryActions.updateCurrentEntry(newState);
	}

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
					<Row>
						<Col sm={ 12 } md={ 6 }>
							<DatePicker
								controlId="entryTime"
								label="Entry time"
								value={ this.state.currentEntry.entryTime || '' }
								onChange={ v => this.onValueChanged({ entryTime: v }) } />
							<TextBox
								controlId="location"
								label="Location"
								value={ this.state.currentEntry.location || '' }
								onChange={ v => this.onValueChanged({ location: v }) } />
							<TextBox
								controlId="diveSite"
								label="Site"
								value={ this.state.currentEntry.site || '' }
								onChange={ v => this.onValueChanged({ site: v }) } />
						</Col>
					</Row>
					
					<Button bsStyle="primary">Save</Button>
				</Form>
			</div>);
	}
}

export default LogEntry;
