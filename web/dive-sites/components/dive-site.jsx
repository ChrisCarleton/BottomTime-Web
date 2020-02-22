import agent from '../../agent';
import { Breadcrumb } from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentDiveSiteActions from '../actions/current-site-actions';
import CurrentDiveSiteStore from '../stores/current-site-store';
import CurrentUserStore from '../../users/stores/current-user-store';
import EditDiveSite from './edit-dive-site';
import errorHandler from '../../components/error-handler';
import { LinkContainer } from 'react-router-bootstrap';
import LoadingSpinner from '../../components/loading-spinner';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';
import ViewDiveSite from './view-dive-site';

class DiveSite extends React.Component {
	static getStores() {
		return [ CurrentDiveSiteStore, CurrentUserStore ];
	}

	static getPropsFromStores() {
		return {
			currentUser: CurrentUserStore.getState().currentUser,
			...CurrentDiveSiteStore.getState()
		};
	}

	constructor(props) {
		super(props);

		const { siteId } = this.props.match.params;
		this.state = {
			isLoading: typeof siteId === 'string'
		};

		this.isReadOnly = this.isReadOnly.bind(this);
		this.renderForm = this.renderForm.bind(this);
	}

	componentDidMount() {
		const { siteId } = this.props.match.params;
		setTimeout(async () => {
			if (siteId) {
				try {
					const { body } = await agent.get(`/api/diveSites/${ siteId }`);
					CurrentDiveSiteActions.updateCurrentDiveSite(body);
					this.setState({
						...this.state,
						isLoading: false
					});
				} catch (err) {
					this.props.handleError(err);
				}
			} else {
				CurrentDiveSiteActions.updateCurrentDiveSite({});
			}
		}, 0);
	}

	isReadOnly() {
		const {
			currentDiveSite,
			currentUser
		} = this.props;
		const { siteId } = this.props.match.params;

		if (!siteId) {
			return false;
		}

		if (currentUser.isAnonymous) {
			return true;
		}

		if (currentUser.role === 'admin' || currentDiveSite.owner === currentUser.username) {
			return false;
		}

		return true;
	}

	renderForm() {
		return this.isReadOnly()
			? <ViewDiveSite currentDiveSite={ this.props.currentDiveSite } />
			: <EditDiveSite currentDiveSite={ this.props.currentDiveSite } />;
	}

	render() {
		const { siteId } = this.props.match.params;
		let title = null;

		if (siteId) {
			if (this.isReadOnly()) {
				title = this.props.currentDiveSite.name || 'View Dive Site';
			} else {
				title = 'Edit Dive Site';
			}
		} else {
			title = 'New Dive Site';
		}

		return (
			<div>
				<Breadcrumb>
					<LinkContainer to="/">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
					</LinkContainer>
					<LinkContainer to="/diveSites">
						<Breadcrumb.Item>Dive Sites</Breadcrumb.Item>
					</LinkContainer>
					<Breadcrumb.Item active>{ title }</Breadcrumb.Item>
				</Breadcrumb>
				<PageTitle title={ title } />
				{
					this.state.isLoading
						? <LoadingSpinner message="Loading dive site..." />
						: this.renderForm()
				}
			</div>
		);
	}
}

DiveSite.propTypes = {
	currentDiveSite: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	handleError: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired
};

export default errorHandler(connectToStores(DiveSite));
