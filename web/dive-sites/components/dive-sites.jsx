import agent from '../../agent';
import {
	Breadcrumb,
	Button,
	ButtonToolbar
} from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import DiveSitesActions from '../actions/dive-sites-actions';
import DiveSitesList from './dive-sites-list';
import DiveSitesStore from '../stores/dive-sites-store';
import Formsy from 'formsy-react';
import handleError from '../../handle-error';
import { LinkContainer } from 'react-router-bootstrap';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';
import SearchBox from '../../components/search-box';
import { withRouter } from 'react-router-dom';

class DiveSites extends React.Component {
	static getStores() {
		return [ DiveSitesStore ];
	}

	static getPropsFromStores() {
		return {
			...DiveSitesStore.getState()
		};
	}

	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		setTimeout(async () => {
			DiveSitesActions.beginLoadingSites();
			try {
				const { body } = await agent
					.get('/api/diveSites')
					.query({
						count: 200
					});
				DiveSitesActions.updateSites(body);
			} catch (err) {
				DiveSitesActions.finishLoadingSites();
				handleError(err, this.props.history);
			}
		}, 0);
	}

	async handleSearch(model) {
		DiveSitesActions.beginLoadingSites();
		try {
			const { body } = await agent
				.get('/api/diveSites')
				.query({
					query: model.search,
					count: 200
				});
			DiveSitesActions.updateSites(body);
		} catch (err) {
			DiveSitesActions.finishLoadingSites();
			handleError(err, this.props.history);
		}
	}

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
				<Formsy onValidSubmit={ this.handleSearch }>
					<SearchBox autoFocus controlId="search" name="search" />
				</Formsy>
				<DiveSitesList
					diveSites={ this.props.diveSites }
					isLoadingSites={ this.props.isLoadingSites }
				/>
			</div>
		);
	}
}

DiveSites.propTypes = {
	diveSites: PropTypes.arrayOf(PropTypes.object).isRequired,
	history: PropTypes.object.isRequired,
	isLoadingSites: PropTypes.bool.isRequired
};

export default withRouter(connectToStores(DiveSites));
