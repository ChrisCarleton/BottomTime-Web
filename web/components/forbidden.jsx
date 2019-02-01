import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import PageTitle from './page-title';
import React from 'react';

require('../img/lost-underwater.jpg');

class Forbidden extends React.Component {
	render() {
		return (
			<div>
				<PageTitle title="403 - Forbidden!" hidden />
				<h1>{ 'Sorry, but you don\'t have access to this page' }</h1>

				<p>
					{ 'You\'re not authorized to view the page you requested. Try clicking ' }
					<Link to="/">here</Link>
					{ ' to return home. If you think you should have access try clicking ' }
					<Link to="/login">here</Link>
					{ 'to login.' }
				</p>

				<Image src="/img/lost-underwater.jpg" rounded />
			</div>);
	}
}

export default Forbidden;
