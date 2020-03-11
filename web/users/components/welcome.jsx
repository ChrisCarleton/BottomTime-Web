import PageTitle from '../../components/page-title';
import React from 'react';
import RequireUser from '../../components/require-user';

class Welcome extends React.Component {
	render() {
		return (
			<div>
				<PageTitle title="Welcome to Bottom Time!" />
				<RequireUser>
					TODO: Make this a really nice welcome page.
				</RequireUser>
			</div>
		);
	}
}

export default Welcome;
