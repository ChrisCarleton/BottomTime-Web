import { Breadcrumb } from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentDiveSiteStore from '../stores/current-site-store';
import EditDiveSite from './edit-dive-site';
import { LinkContainer } from 'react-router-bootstrap';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

class DiveSite extends React.Component {
	static getStores() {
		return [ CurrentDiveSiteStore ];
	}

	static getPropsFromStores() {
		return CurrentDiveSiteStore.getState();
	}

	render() {
		return (
			<div>
				<Breadcrumb>
					<LinkContainer to="/">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
					</LinkContainer>
					<LinkContainer to="/diveSites">
						<Breadcrumb.Item>Dive Sites</Breadcrumb.Item>
					</LinkContainer>
					<Breadcrumb.Item active>New Dive Site</Breadcrumb.Item>
				</Breadcrumb>
				<PageTitle title="New Dive Site" />
				<EditDiveSite currentDiveSite={ this.props.currentDiveSite } />
			</div>
		);
	}
}

DiveSite.propTypes = {
	currentDiveSite: PropTypes.object.isRequired
};

export default connectToStores(withRouter(DiveSite));
