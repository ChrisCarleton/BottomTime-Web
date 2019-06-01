import agent from '../../agent';
import { Breadcrumb } from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentDiveSiteActions from '../actions/current-site-actions';
import CurrentDiveSiteStore from '../stores/current-site-store';
import EditDiveSite from './edit-dive-site';
import handleError from '../../handle-error';
import { LinkContainer } from 'react-router-bootstrap';
import LoadingSpinner from '../../components/loading-spinner';
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

	constructor(props) {
		super(props);

		const { siteId } = this.props.match.params;
		this.state = {
			isLoading: typeof siteId === 'string',
			title: siteId ? 'Edit Dive Site' : 'New Dive Site'
		};

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
					this.setState({
						...this.state,
						isLoading: false
					});
					handleError(err, this.props.history);
				}
			} else {
				CurrentDiveSiteActions.updateCurrentDiveSite({});
			}
		}, 0);
	}

	renderForm() {
		return <EditDiveSite currentDiveSite={ this.props.currentDiveSite } />;
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
				<PageTitle title={ this.state.title } />
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
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

export default connectToStores(withRouter(DiveSite));
