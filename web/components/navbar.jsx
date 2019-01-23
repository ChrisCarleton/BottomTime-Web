import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserActions from '../users/actions/current-user-actions';
import CurrentUserStore from '../users/stores/current-user-store';
import PropTypes from 'prop-types';
import React from 'react';

import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

require('../img/dive-flag-icon.jpg');

class AppNavBar extends React.Component {
	static getStores() {
		return [ CurrentUserStore ];
	}

	static getPropsFromStores() {
		return CurrentUserStore.getState();
	}

	handleLogoutClick() {
		CurrentUserActions.logout();
	}

	renderRightNav() {
		if (!this.props.currentUser.isAnonymous) {
			const title = this.props.currentUser.firstName || this.props.currentUser.username;
			return (
				<Nav pullRight>
					<NavDropdown title={ title } id="user-nav-dropdown">
						<LinkContainer to="/profile">
							<NavItem>My Profile</NavItem>
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
						<LinkContainer to={ '/logs' }>
							<NavItem>My Logs</NavItem>
						</LinkContainer>
					</Nav>
					{ this.renderRightNav() }
				</Navbar.Collapse>
			</Navbar>);
	}
}

AppNavBar.propTypes = {
	currentUser: PropTypes.object.isRequired
};

export default connectToStores(AppNavBar);
