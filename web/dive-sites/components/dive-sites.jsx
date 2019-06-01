import {
	Breadcrumb,
	Button,
	ButtonToolbar,
	Col,
	Row
} from 'react-bootstrap';
import Formsy from 'formsy-react';
import { LinkContainer } from 'react-router-bootstrap';
import Map from '../../components/map';
import PageTitle from '../../components/page-title';
import React from 'react';
import SearchBox from '../../components/search-box';

class DiveSites extends React.Component {
	render() {
		return (
			<div>
				<Breadcrumb>
					<LinkContainer to="/">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
					</LinkContainer>
					<Breadcrumb.Item active>Dive Sites</Breadcrumb.Item>
				</Breadcrumb>
				<PageTitle title="Dive Sites" />
				<ButtonToolbar>
					<LinkContainer to="/diveSites/new">
						<Button bsStyle="primary">Create New Dive Site</Button>
					</LinkContainer>
				</ButtonToolbar>
				<Formsy>
					<SearchBox controlId="search" />
				</Formsy>
				<Row>
					<Col sm={ 12 } md={ 6 }>
						<Map
							height="450px"
							width="100%"
						/>
					</Col>
					<Col sm={ 12 } md={ 6 } />
				</Row>
			</div>
		);
	}
}

export default DiveSites;
