import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import PageTitle from '../../components/page-title';
import React from 'react';

require('../../img/forbidden-sign.jpg');

class Forbidden extends React.Component {
	render() {
		return (
			<div id="forbidden-page">
				<PageTitle title="403 - Forbidden!" hidden />
				<h1>Sorry, but you don&apos;t have access to this page</h1>

				<p>
					You&apos;re not authorized to view the page you requested. Try clicking
					&nbsp;<Link to="/">here</Link>&nbsp;
					to return home.
				</p>

				<Image src="/img/forbidden-sign.jpg" rounded />
			</div>);
	}
}

export default Forbidden;
