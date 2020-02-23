import agent from '../../agent';
import {
	Alert,
	Breadcrumb,
	Button,
	ButtonGroup,
	ButtonToolbar,
	Glyphicon,
	Panel
} from 'react-bootstrap';
import { Col, Row } from 'react-flexbox-grid';
import CheckBox from '../../components/check-box';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import DiveSitesActions from '../actions/dive-sites-actions';
import DiveSitesList from './dive-sites-list';
import DiveSitesStore from '../stores/dive-sites-store';
import DiveSiteUtils from '../utils/dive-site-utils';
import errorHandler from '../../components/error-handler';
import Formsy from 'formsy-react';
import { LinkContainer } from 'react-router-bootstrap';
import LoadMore from '../../components/load-more';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import RadioList from '../../components/radio-list';
import React from 'react';
import SearchBox from '../../components/search-box';
import Slider from '../../components/slider';

class DiveSites extends React.Component {
	static getStores() {
		return [ CurrentUserStore, DiveSitesStore ];
	}

	static getPropsFromStores() {
		return {
			currentUser: CurrentUserStore.getState().currentUser,
			...DiveSitesStore.getState()
		};
	}

	constructor(props) {
		super(props);

		this.state = {
			searchExpanded: false
		};
		this.lastSearch = {
			count: 100
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.handleLoadMore = this.handleLoadMore.bind(this);
		this.searchPanelToggle = this.searchPanelToggle.bind(this);
		this.renderDiveSitesList = this.renderDiveSitesList.bind(this);
	}

	async handleSearch(model) {
		this.lastSearch = model;
		DiveSitesActions.beginLoadingSites();
		try {
			const { body } = await agent
				.get('/api/diveSites')
				.query(model);
			DiveSitesActions.updateSites(body);
		} catch (err) {
			DiveSitesActions.finishLoadingSites();
			this.props.handleError(err);
		}
	}

	async handleLoadMore(done) {
		try {
			const { body } = await agent
				.get('/api/diveSites')
				.query({
					...this.lastSearch,
					skip: this.props.diveSites.length
				});

			DiveSitesActions.appendSites(body);
			return done(null, body.length < 100);
		} catch (err) {
			return done(err);
		}
	}

	searchPanelToggle() {
		this.setState({
			...this.state,
			searchExpanded: !this.state.searchExpanded
		});
	}

	renderDiveSitesList() {
		const {
			diveSites,
			isPristine
		} = this.props;

		if (isPristine) {
			return (
				<Alert bsStyle="info">
					<p>
						<Glyphicon glyph="info-sign" />
						&nbsp;
						Perform a search above to list dive sites.
					</p>
				</Alert>
			);
		}

		if (diveSites.length === 0) {
			return (
				<Alert bsStyle="info">
					<p>
						<Glyphicon glyph="info-sign" />
						&nbsp;
						No dive sites match your search criteria.
						Click <strong>Create New Dive Site</strong> above to add dive sites or modify your
						search criteria.
					</p>
				</Alert>
			);
		}

		return (
			<div>
				<DiveSitesList />
				<LoadMore
					load={ this.handleLoadMore }
					handleError={ this.props.handleError }
				/>
			</div>
		);
	}

	renderSearchForm() {
		return (
			<Formsy onValidSubmit={ this.handleSearch } mapping={ DiveSiteUtils.mapQueryParameters }>
				<SearchBox autoFocus controlId="query" name="query" />
				<Panel.Toggle componentClass="a">
					{
						this.state.searchExpanded
							? 'Show fewer search options'
							: 'Show more search options'
					}
				</Panel.Toggle>
				<Panel.Collapse>
					<Row>
						<Col sm={ 12 } md={ 6 } lg={ 4 }>
							<RadioList
								controlId="water"
								name="water"
								label="Type of water"
								inline
								value=""
							>
								{
									[
										{ text: 'Any', value: '' },
										{ text: 'Salt water', value: 'salt' },
										{ text: 'Fresh water', value: 'fresh' }
									]
								}
							</RadioList>
						</Col>
						<Col sm={ 12 } md={ 6 } lg={ 4 }>
							<RadioList
								controlId="accessibility"
								name="accessibility"
								label="Accessibiliity"
								inline
								value=""
							>
								{
									[
										{ text: 'Any', value: '' },
										{ text: 'Shore dives', value: 'shore' },
										{ text: 'Boat dives', value: 'boat' }
									]
								}
							</RadioList>
						</Col>
						<Col sm={ 12 } md={ 6 } lg={ 4 }>
							<Slider
								controlId="minRating"
								name="minRating"
								label="Minimum rating"
								min={ 1.0 }
								max={ 5.0 }
								step={ 0.5 }
								value={ 1.0 }
								lowEndCaption="Any rating"
								highEndCaption="5 stars"
							/>
						</Col>
						<Col sm={ 12 } md={ 6 } lg={ 4 }>
							<Slider
								controlId="maxDifficulty"
								name="maxDifficulty"
								label="Maximum difficulty"
								min={ 1.0 }
								max={ 5.0 }
								step={ 0.5 }
								value={ 5.0 }
								lowEndCaption="1.0"
								highEndCaption="Any difficulty"
							/>
						</Col>
						<Col sm={ 12 } md={ 6 } lg={ 4 }>
							<CheckBox
								controlId="avoidEntryFee"
								name="avoidEntryFee"
								label="Avoid entry fees"
								value={ false }
							/>
						</Col>
						{
							this.props.currentUser.isAnonymous
								? null
								: (
									<Col sm={ 12 } md={ 6 } lg={ 4 }>
										<CheckBox
											controlId="owner"
											name="owner"
											label="Show only my dive sites"
											value={ false }
										/>
									</Col>
								)
						}
					</Row>
				</Panel.Collapse>
			</Formsy>
		);
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
					<ButtonGroup>
						{
							this.props.currentUser.isAnonymous
								? null
								: (
									<LinkContainer to="/diveSites/new">
										<Button bsStyle="primary">Create New Dive Site</Button>
									</LinkContainer>
								)
						}
					</ButtonGroup>
				</ButtonToolbar>
				<Panel expanded={ this.state.searchExpanded } onToggle={ this.searchPanelToggle }>
					<Panel.Body>{ this.renderSearchForm() }</Panel.Body>
				</Panel>
				{ this.renderDiveSitesList() }
			</div>
		);
	}
}

DiveSites.propTypes = {
	currentUser: PropTypes.object.isRequired,
	diveSites: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleError: PropTypes.func.isRequired,
	isPristine: PropTypes.bool.isRequired
};

export default errorHandler(connectToStores(DiveSites));
