import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import PageTitle from '../../components/page-title';
import React from 'react';

require('../../img/lost-underwater.jpg');

class NotFound extends React.Component {
	render() {
		return (
			<div id="not-found-page">
				<PageTitle title="404 - Page Not Found!" hidden />
				<h1>Uh Oh!<small> (Page not found)</small></h1>

				<p>
					Are you feeling a little lost? The page you requested could not be found. Try
					clicking <Link to="/">here</Link> to return home.
				</p>

				<Image src="/img/lost-underwater.jpg" rounded />
			</div>);
	}
}

export default NotFound;
