import { Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

class DiveSiteDetails extends React.Component {
	render() {
		const details = [];
		const { diveSite } = this.props;

		if (diveSite.water) {
			details.push(
				<li key="water">
					<Glyphicon title="Water" glyph="tint" />
					&nbsp;
					{
						diveSite.water === 'salt'
							? 'Salt water'
							: 'Fresh water'
					}
				</li>
			);
		}

		if (diveSite.accessibility) {
			details.push(
				<li key="accessibility">
					<Glyphicon title="Accessibility" glyph="transfer" />
					&nbsp;
					{
						diveSite.accessibility === 'shore'
							? 'Shore dive'
							: 'Boat dive'
					}
				</li>
			);
		}

		if (diveSite.entryFee || diveSite.entryFee === false) {
			details.push(
				<li key="entryFee">
					<Glyphicon title="Entry fee" glyph="piggy-bank" />
					&nbsp;
					{
						diveSite.entryFee ? 'Entry fee required' : 'Free to dive'
					}
				</li>
			);
		}

		if (diveSite.difficulty) {
			details.push(
				<li key="difficulty">
					<Glyphicon glyph="alert" />
					&nbsp;
					<span>Difficulty: <em>{ diveSite.difficulty.toFixed(1) }</em> / 5.0</span>
				</li>
			);
		}

		if (details.length === 0) {
			return <em>None</em>;
		}

		return (
			<ul className="list-inline">
				{ details }
			</ul>
		);
	}
}

DiveSiteDetails.propTypes = {
	diveSite: PropTypes.object.isRequired
};

export default DiveSiteDetails;
