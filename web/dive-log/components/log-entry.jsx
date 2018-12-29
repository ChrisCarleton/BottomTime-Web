import React from 'react';
import LogEntryActions from '../../actions/log-entry-actions';
import LogEntryStore from '../../stores/log-entry-store';

import DatePicker from '../../components/date-picker';
import Formsy from 'formsy-react';
import { LinkContainer } from 'react-router-bootstrap';
import {
	Breadcrumb,
	Button,
	Col,
	Row,
	Tabs,
	Tab
} from 'react-bootstrap';
import TextBox from '../../components/text-box';
import GpsPicker from '../../components/gps-picker';

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
		const newState = Object.assign({}, this.state.currentEntry, change);
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

				<Formsy className="inline">
					<Tabs defaultActiveKey={ 0 } id="log-entry-tabs">
						<Tab title="Basic Info" eventKey={ 0 }>
							<Row>
								<Col sm={ 12 } md={ 6 }>
									<DatePicker
										controlId="entryTime"
										label="Entry time"
										name="entryTime"
										value={ this.state.currentEntry.entryTime || '' }
										onChange={ v => this.onValueChanged({ entryTime: v }) }
										validations={ {
											isDateTime: true
										} }
										validationErrors={ {
											isDateTime: 'Entry time should be a valid date time.'
										} }
										required
									/>
									<TextBox
										controlId="location"
										label="Location"
										name="location"
										value={ this.state.currentEntry.location || '' }
										onChange={ v => this.onValueChanged({ location: v }) }
										required
									/>
									<TextBox
										controlId="diveSite"
										label="Site"
										name="diveSite"
										value={ this.state.currentEntry.site || '' }
										onChange={ v => this.onValueChanged({ site: v }) }
										required
									/>
									<TextBox
										controlId="bottomTime"
										label="Bottom time"
										name="bottomTime"
										value={ this.state.currentEntry.bottomTime || '' }
										onChange={ v => this.onValueChanged({ bottomTime: v }) }
										units="min"
										required
									/>
									<TextBox
										controlId="totalTime"
										label="Total time"
										name="totalTime"
										value={ this.state.currentEntry.totalTime || '' }
										onChange={ v => this.onValueChanged({ totalTime: v }) }
										units="min"
									/>
									<TextBox
										controlId="maxDepth"
										label="Max depth"
										name="maxDepth"
										value={ this.state.currentEntry.maxDepth || '' }
										onChange={ v => this.onValueChanged({ maxDepth: v }) }
										units="ft"
									/>
									<TextBox
										controlId="avgDepth"
										label="Average depth"
										name="avgDepth"
										value={ this.state.currentEntry.avgDepth || '' }
										onChange={ v => this.onValueChanged({ avgDepth: v }) }
										units="ft"
									/>
								</Col>
								<Col sm={ 12 } md={ 6 }>
									<GpsPicker
										controlId="gps"
										label="GPS Coordinates"
										name="gps"
										onChange={ v => this.onValueChanged({ gps: v }) }
									/>
								</Col>
							</Row>
						</Tab>
						<Tab title="Equipment" eventKey={ 1 }>
							<Row>
								<Col sm={ 12 } md={ 6 }>
									<TextBox
										controlId="weight"
										label="Weight"
										name="weight"
										value={ this.state.currentEntry.weight || '' }
										onChange={ v => this.onValueChanged({ weight: v }) }
										units="lbs"
									/>
								</Col>
							</Row>
						</Tab>
					</Tabs>

					<Button bsStyle="primary" type="submit">Save</Button>
					<p>
						<small>{ JSON.stringify(this.state.currentEntry, '&nbsp;&nbsp;') }</small>
					</p>
				</Formsy>
			</div>);
	}
}

export default LogEntry;
