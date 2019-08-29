import agent from '../../agent';
import {
	Alert,
	Button,
	ButtonGroup,
	Col,
	Glyphicon,
	Media,
	Panel,
	Row
} from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentDiveSiteActions from '../actions/current-site-actions';
import CurrentDiveSiteStore from '../stores/current-site-store';
import CurrentUserStore from '../../users/stores/current-user-store';
import DiveSiteRating from './dive-site-rating';
import ErrorActions from '../../actions/error-actions';
import Formsy from 'formsy-react';
import handleError from '../../handle-error';
import LoadingSpinner from '../../components/loading-spinner';
import PropTypes from 'prop-types';
import React from 'react';
import StarRating from '../../components/star-rating';
import TextArea from '../../components/text-area';
import { withRouter } from 'react-router-dom';

class DiveSiteRatings extends React.Component {
	static getStores() {
		return [ CurrentDiveSiteStore, CurrentUserStore ];
	}

	static getPropsFromStores() {
		return {
			...CurrentUserStore.getState(),
			...CurrentDiveSiteStore.getState()
		};
	}

	constructor(props) {
		super(props);

		this.addRatingForm = React.createRef();

		this.onResetRating = this.onResetRating.bind(this);
		this.renderSubmitRating = this.renderSubmitRating.bind(this);
		this.onSubmitRating = this.onSubmitRating.bind(this);
	}

	componentDidMount() {
		const { currentDiveSite } = this.props;
		if (currentDiveSite && currentDiveSite.siteId) {
			setTimeout(async () => {
				try {
					const { body } = await agent
						.get(`/api/diveSites/${ currentDiveSite.siteId }/ratings`)
						.query({
							count: 200,
							sortBy: 'date'
						});
					CurrentDiveSiteActions.loadRatings(body);
				} catch (err) {
					CurrentDiveSiteActions.endLoadingRatings();
					handleError(err, this.props.history);
				}
			}, 0);
		}
	}

	onResetRating() {
		this.addRatingForm.current.reset();
	}

	async onSubmitRating(model, reset) {
		try {
			const { body } = await agent
				.post(`/api/diveSites/${ this.props.currentDiveSite.siteId }/ratings`)
				.send(model);
			reset();
			CurrentDiveSiteActions.addRating(body);
			ErrorActions.showSuccess('Thanks! Your rating has been submitted!');
		} catch (err) {
			handleError(err, this.props.history);
		}
	}

	renderRatings() {
		const { currentSiteRatings, currentUser } = this.props;
		if (currentSiteRatings.length === 0) {
			return (
				<Alert bsStyle="info">
					<p>
						<Glyphicon glyph="info-sign" />
						&nbsp;
						This dive site has not been rated yet.
					</p>
					{
						currentUser.isAnonymous
							? null
							: (
								<p>Be the first to rate this site by adding your review above!</p>
							)
					}
				</Alert>
			);
		}

		return currentSiteRatings.map(
			(r, i) => <DiveSiteRating key={ i } rating={ r } />
		);
	}

	renderSubmitRating() {
		if (this.props.currentUser.isAnonymous || !this.props.currentDiveSite.siteId) {
			return null;
		}

		return (
			<Formsy ref={ this.addRatingForm } onValidSubmit={ this.onSubmitRating }>
				<Panel>
					<Panel.Heading>
						<Panel.Title>Rate This Dive Site</Panel.Title>
					</Panel.Heading>
					<Panel.Body>
						<Row>
							<Col sm={ 12 } md={ 4 }>
								<StarRating
									controlId="rating"
									name="rating"
									label="Rating"
									required
								/>
							</Col>
							<Col sm={ 12 } md={ 8 }>
								<TextArea
									controlId="comments"
									name="comments"
									label="Review this site"
									placeholder="Comment on the site here."
									maxLength={ 1000 }
								/>
							</Col>
						</Row>
						<Row>
							<Col sm={ 12 }>
								<ButtonGroup>
									<Button bsStyle="primary" type="submit">
										Rate Site
									</Button>
									<Button onClick={ this.onResetRating }>
										Cancel
									</Button>
								</ButtonGroup>
							</Col>
						</Row>
					</Panel.Body>
				</Panel>
			</Formsy>
		);
	}

	render() {
		return (
			<div>
				<h3>Ratings</h3>
				{ this.renderSubmitRating() }
				{
					this.props.isLoadingRatings
						? <LoadingSpinner message="Retrieving dive site ratings..." />
						: (
							<Media.List>
								{ this.renderRatings() }
							</Media.List>
						)
				}
			</div>
		);
	}
}

DiveSiteRatings.propTypes = {
	currentDiveSite: PropTypes.object,
	currentSiteRatings: PropTypes.arrayOf(PropTypes.object).isRequired,
	currentUser: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	isLoadingRatings: PropTypes.bool.isRequired
};

export default withRouter(connectToStores(DiveSiteRatings));
