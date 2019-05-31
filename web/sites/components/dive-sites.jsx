import { Checkbox } from 'react-bootstrap';
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
					<Checkbox>Just My Dive Sites</Checkbox>
				</Formsy>
				<Map />
			</div>
		);
	}
}

export default DiveSites;
