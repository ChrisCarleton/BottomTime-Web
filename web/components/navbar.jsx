import CurrentUserActions from '../users/actions/current-user-actions';
import CurrentUserStore from '../users/stores/current-user-store';
import React from 'react';

import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

require('../img/dive-flag-icon.jpg');

class AppNavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = CurrentUserStore.getState();
		this.handleStoreChanged = this.handleStoreChanged.bind(this);
	}

	componentDidMount() {
		CurrentUserStore.listen(this.handleStoreChanged);
	}

	componentWillUnmount() {
		CurrentUserStore.unlisten(this.handleStoreChanged);
	}

	handleStoreChanged() {
		this.setState(CurrentUserStore.getState());
	}

	handleLogoutClick() {
		CurrentUserActions.logout();
	}

	renderRightNav() {
		if (this.state.currentUser && !this.state.currentUser.isAnonymous) {
			const title = this.state.currentUser.firstName || this.state.currentUser.username;
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
						<LinkContainer to="/logs">
							<NavItem>My Logs</NavItem>
						</LinkContainer>
					</Nav>
					{ this.renderRightNav() }
				</Navbar.Collapse>
			</Navbar>);
	}
}

export default AppNavBar;
