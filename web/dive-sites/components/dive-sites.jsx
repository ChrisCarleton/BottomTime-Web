import agent from '../../agent';
import {
	Breadcrumb,
	Button,
	ButtonGroup,
	ButtonToolbar,
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
import Formsy from 'formsy-react';
import handleError from '../../handle-error';
import { LinkContainer } from 'react-router-bootstrap';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import RadioList from '../../components/radio-list';
import React from 'react';
import SearchBox from '../../components/search-box';
import Slider from '../../components/slider';
import { withRouter } from 'react-router-dom';

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
		this.handleSearch = this.handleSearch.bind(this);
		this.searchPanelToggle = this.searchPanelToggle.bind(this);
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
				.query(model);
			DiveSitesActions.updateSites(body);
		} catch (err) {
			DiveSitesActions.finishLoadingSites();
			handleError(err, this.props.history);
		}
	}

	searchPanelToggle() {
		this.setState({
			...this.state,
			searchExpanded: !this.state.searchExpanded
		});
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
						<Col sm={ 12 } md={ 6 } lg={ 4 }>
							<CheckBox
								controlId="owner"
								name="owner"
								label="Show only my dive sites"
								value={ false }
							/>
						</Col>
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
				<DiveSitesList
					diveSites={ this.props.diveSites }
					isLoadingSites={ this.props.isLoadingSites }
				/>
			</div>
		);
	}
}

DiveSites.propTypes = {
	currentUser: PropTypes.object.isRequired,
	diveSites: PropTypes.arrayOf(PropTypes.object).isRequired,
	history: PropTypes.object.isRequired,
	isLoadingSites: PropTypes.bool.isRequired
};

export default withRouter(connectToStores(DiveSites));
