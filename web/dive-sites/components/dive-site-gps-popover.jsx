import { Button, Glyphicon, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import React from 'react';

const HidePopoverDelay = 3000;

class GpsPopover extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showLatitudeCopied: false,
			showLongitudeCopied: false
		};

		this.onLatitudeCopied = this.onLatitudeCopied.bind(this);
		this.onLongitudeCopied = this.onLongitudeCopied.bind(this);
	}

	onLatitudeCopied() {
		this.setState({
			...this.state,
			showLatitudeCopied: true
		});

		setTimeout(() => {
			this.setState({
				...this.state,
				showLatitudeCopied: false
			});
		}, HidePopoverDelay);
	}

	onLongitudeCopied() {
		this.setState({
			...this.state,
			showLongitudeCopied: true
		});

		setTimeout(() => {
			this.setState({
				...this.state,
				showLongitudeCopied: false
			});
		}, HidePopoverDelay);
	}

	render() {
		const { controlId, coordinates } = this.props;
		const latitudeTooltip = (
			<Tooltip id="latitude_tip">
				{
					this.state.showLatitudeCopied
						? 'Copied!'
						: 'Copy to clipboard'
				}
			</Tooltip>
		);
		const longitudeTooltip = (
			<Tooltip id="latitude_tip">
				{
					this.state.showLongitudeCopied
						? 'Copied!'
						: 'Copy to clipboard'
				}
			</Tooltip>
		);

		const overlay = (
			<Popover id={ controlId }>
				<dl>
					<dt>Latitude</dt>
					<dd>
						<span>{ coordinates.lat }</span>
						<OverlayTrigger placement="top" overlay={ latitudeTooltip }>
							<CopyToClipboard
								text={ coordinates.lat }
								onCopy={ this.onLatitudeCopied }
							>
								<Button bsStyle="link" bsSize="sm">
									<Glyphicon glyph="copy" />
								</Button>
							</CopyToClipboard>
						</OverlayTrigger>
					</dd>

					<dt>Longitude</dt>
					<dd>
						<span>{ coordinates.lon }</span>
						<OverlayTrigger placement="top" overlay={ longitudeTooltip }>
							<CopyToClipboard
								text={ coordinates.lon }
								onCopy={ this.onLongitudeCopied }
							>
								<Button bsStyle="link" bsSize="sm">
									<Glyphicon glyph="copy" />
								</Button>
							</CopyToClipboard>
						</OverlayTrigger>
					</dd>
				</dl>
				<a
					target="_blank"
					rel="noreferrer noopener"
					href={ `http://www.google.com/maps/place/${ coordinates.lat },${ coordinates.lon }` }
				>
					<small>
						<Glyphicon glyph="new-window" />
						&nbsp;
						Show map in new window
					</small>
				</a>
			</Popover>
		);

		return (
			<OverlayTrigger trigger="click" placement="right" overlay={ overlay }>
				<Button bsStyle="link">GPS</Button>
			</OverlayTrigger>
		);
	}
}

GpsPopover.propTypes = {
	controlId: PropTypes.string.isRequired,
	coordinates: PropTypes.object.isRequired
};

export default GpsPopover;
