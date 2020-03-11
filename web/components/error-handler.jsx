/* eslint no-console: 0 */

import CurrentUserActions from '../users/actions/current-user-actions';
import ErrorActions from '../actions/error-actions';
import React from 'react';

import Forbidden from '../home/components/forbidden';
import NotFound from '../home/components/not-found';
import ServerError from '../home/components/server-error';

const NormalStatus = 200;
const BadRequestStatus = 400;
const UnauthorizedStatus = 401;
const ForbiddenStatus = 403;
const NotFoundStatus = 404;
const ServerErrorStatus = 500;

export default function (page) {
	class ErrorHandler extends React.Component {
		constructor(props) {
			super(props);

			this.PageComponent = page;
			this.state = { status: NormalStatus };

			this.onErrorResponse = this.onErrorResponse.bind(this);
		}

		onErrorResponse(err) {
			if (err.response) {
				switch (err.response.status) {
				case BadRequestStatus:
					console.error(
						'Validation Error:',
						err.response.body.details.isJoi
							? err.response.body.details.details
							: err.response.body
					);
					ErrorActions.showError(
						'Your request failed',
						'There was a problem with your something you input. Check your form fields and try again.'
					);
					this.setState({ status: NormalStatus });
					break;

				case UnauthorizedStatus:
					CurrentUserActions.logout();
					break;

				case ForbiddenStatus:
					this.setState({ status: ForbiddenStatus });
					break;

				case NotFoundStatus:
					this.setState({ status: NotFoundStatus });
					break;

				case ServerErrorStatus:
					console.error('Server error occurred. Log ID:', err.response.body.logId);
					this.setState({ status: ServerErrorStatus });
					break;

				default:
					console.error('Unknown error response:', JSON.stringify(err.response.body));
					this.setState({ status: NormalStatus });
					break;
				}
			}
		}

		render() {
			switch (this.state.status) {
			case ForbiddenStatus:
				return <Forbidden />;

			case NotFoundStatus:
				return <NotFound />;

			case ServerErrorStatus:
				return <ServerError />;

			default:
				return <this.PageComponent handleError={ this.onErrorResponse } { ...this.props } />;
			}
		}
	}

	return ErrorHandler;
}
