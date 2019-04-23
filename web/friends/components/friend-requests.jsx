import {
	Alert,
	Button,
	ButtonGroup,
	ButtonToolbar,
	Checkbox,
	Col,
	Glyphicon,
	Label,
	ListGroup,
	ListGroupItem,
	Row
} from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

class FriendRequests extends React.Component {
	handleAcceptRequest(index) {
		console.log('Accept', index);
	}

	handleDeclineRequest(index) {
		console.log('Decline', index);
	}

	renderRequestsList() {
		const { requestsList } = this.props;
		if (requestsList.length === 0) {
			return (
				<Alert bsStyle="info">
					<p>
						<Glyphicon glyph="exclamation-sign" />&nbsp;
						No one is requesting to be your dive buddy at the moment. Check back later!
					</p>
				</Alert>
			);
		}

		return (
			<ListGroup>
				{
					requestsList.map((r, i) => (
						<ListGroupItem key={ i }>
							<Row>
								<Col sm={ 4 } md={ 1 }>
									<Checkbox />
								</Col>
								<Col sm={ 6 } md={ 6 }>
									<h4>
										<a href="#">{ r.user }</a>
										&nbsp;
										<small>
											(requested { moment(r.requestedOn).local().fromNow() })
										</small>
									</h4>
								</Col>
								<Col sm={ 12 } md={ 5 }>
									<Button bsStyle="success" onClick={ () => this.handleAcceptRequest(i) }>
										<Glyphicon glyph="ok" />
										&nbsp;
										Accept
									</Button>
									&nbsp;
									<Button bsStyle="danger" onClick={ () => this.handleDeclineRequest(i) }>
										<Glyphicon glyph="remove" />
										&nbsp;
										Decline
									</Button>
								</Col>
							</Row>
						</ListGroupItem>
					))
				}
			</ListGroup>
		);
	}

	render() {
		return (
			<div>
				<ButtonToolbar>
					<ButtonGroup>
						<Button>Select All</Button>
						<Button>Select None</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button>
							<Glyphicon glyph="refresh" />
							&nbsp;
							Refresh
						</Button>
						<Button disabled>
							<Glyphicon glyph="trash" />
							&nbsp;
							Delete
						</Button>
					</ButtonGroup>
				</ButtonToolbar>
				<p>You have <Label>{ this.props.requestsList.length }</Label> pending dive buddy requests.</p>
				{ this.renderRequestsList() }
			</div>
		);
	}
}

FriendRequests.propTypes = {
	requestsList: PropTypes.array.isRequired
};

export default FriendRequests;
