import PageTitle from '../../components/page-title';
import React from 'react';
import RequireUser from '../../components/require-user';

class Welcome extends React.Component {
	render() {
		return (
			<div>
				<RequireUser />
				<PageTitle title="Welcome to Bottom Time!" />
				<p>
					TODO: Make this a really nice welcome page.
				</p>
			</div>
		);
	}
}

export default Welcome;
