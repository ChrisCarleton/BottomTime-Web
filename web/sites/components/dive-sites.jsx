import { Checkbox, Col, Row } from 'react-bootstrap';
import Formsy from 'formsy-react';
import Map from '../../components/map';
import PageTitle from '../../components/page-title';
import React from 'react';
import SearchBox from '../../components/search-box';

class DiveSites extends React.Component {
	render() {
		return (
			<div>
				<PageTitle title="Dive Sites" />
				<Formsy className="form-horizontal">
					<SearchBox controlId="search" />
				</Formsy>
				<Row>
					<Col sm={ 12 } md={ 6 }>
						<Map
							height="450px"
							width="100%"
						/>
					</Col>
					<Col sm={ 12 } md={ 6 }></Col>
				</Row>
			</div>
		);
	}
}

export default DiveSites;
