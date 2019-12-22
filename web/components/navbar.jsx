import {
	Badge,
	Glyphicon,
	MenuItem,
	Nav,
	Navbar,
	NavDropdown,
	NavItem
} from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserActions from '../users/actions/current-user-actions';
import CurrentUserStore from '../users/stores/current-user-store';
import FriendsStore from '../friends/stores/friends-store';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

require('../img/dive-flag-icon.jpg');

class AppNavBar extends React.Component {
	static getStores() {
		return [ CurrentUserStore, FriendsStore ];
	}

	static getPropsFromStores() {
		return {
			...CurrentUserStore.getState(),
			pendingFriendRequests: FriendsStore.getState().requestsToMe.length
		};
	}

	handleLogoutClick() {
		CurrentUserActions.logout();
	}

	renderRightNav() {
		const {
			currentUser,
			pendingFriendRequests
		} = this.props;

		if (!currentUser.isAnonymous) {
			if (currentUser.isRegistrationIncomplete) {
				return (
					<Nav pullRight>
						<NavDropdown title="New User" id="user-nav-dropdown">
							<MenuItem onClick={ this.handleLogoutClick }>Logout</MenuItem>
						</NavDropdown>
					</Nav>
				);
			}

			const title = currentUser.firstName || currentUser.username;
			return (
				<Nav pullRight>
					<LinkContainer to="/friendRequests">
						<NavItem>
							<Glyphicon glyph="user" />
							&nbsp;
							<Badge>{ pendingFriendRequests || 0 }</Badge>
						</NavItem>
					</LinkContainer>
					<NavDropdown title={ title } id="user-nav-dropdown">
						<LinkContainer to="/profile">
							<NavItem>My Profile</NavItem>
						</LinkContainer>
						<LinkContainer to="/changePassword">
							<NavItem>Change Password</NavItem>
						</LinkContainer>
						<MenuItem onClick={ this.handleLogoutClick }>Logout</MenuItem>
					</NavDropdown>
				</Nav>
			);
		}

		return (
			<Nav pullRight>
				<LinkContainer id="nav-signup" to="/signup" exact>
					<NavItem>Sign Up</NavItem>
				</LinkContainer>
				<LinkContainer id="nav-login" to="/login" exact>
					<NavItem>Login</NavItem>
				</LinkContainer>
			</Nav>
		);
	}

	render() {
		const { currentUser } = this.props;
		return (
			<Navbar fixedTop inverse>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">
							<img id="brand-img" src="/img/dive-flag-icon.jpg" />
							Bottom Time
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<LinkContainer to="/" exact>
							<NavItem>Home</NavItem>
						</LinkContainer>
						{
							currentUser.isAnonymous || currentUser.isRegistrationIncomplete
								? null
								: [
									<LinkContainer key="logs" to={ '/logs' }>
										<NavItem>Log Book</NavItem>
									</LinkContainer>,
									<LinkContainer key="friends" to={ '/friends' }>
										<NavItem>Dive Buddies</NavItem>
									</LinkContainer>
								]
						}
						<LinkContainer to="/diveSites">
							<NavItem>Dive Sites</NavItem>
						</LinkContainer>
					</Nav>
					{ this.renderRightNav() }
				</Navbar.Collapse>
			</Navbar>);
	}
}

AppNavBar.propTypes = {
	currentUser: PropTypes.object.isRequired,
	pendingFriendRequests: PropTypes.number
};

export default connectToStores(AppNavBar);
