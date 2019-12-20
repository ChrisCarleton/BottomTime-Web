import config from '../../config';
import { Image } from 'react-bootstrap';
import PageTitle from '../../components/page-title';
import React from 'react';

import '../../img/server-error.jpg';

class ServerError extends React.Component {
	render() {
		return (
			<div>
				<PageTitle title="500 - Server Error" hidden />
				<h1>Uh Oh! Something Went Wrong On Our End</h1>

				<p>
					It looks like we&apos;re experiencing some technical issues on our end. Please try
					again later. If the problem persists you can contact an administrator at&nbsp;
					<a href={ `mailto:${ config.adminEmail }` }>{ config.adminEmail }</a>.
				</p>

				<Image src="/img/server-error.jpg" rounded />
			</div>
		);
	}
}

export default ServerError;
