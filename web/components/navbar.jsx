import CurrentUserStore from '../users/stores/current-user-store';
import React from 'react';

import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

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

	renderRightNav() {
		if (this.state.currentUser && !this.state.currentUser.isAnonymous) {
			return (
				<Nav pullRight>
					<NavItem>Welcome, { this.state.currentUser.firstName || this.state.currentUser.username }</NavItem>
				</Nav>
			);
		}

		return (
			<Nav pullRight>
				<LinkContainer to="/signup" exact>
					<NavItem>Sign Up</NavItem>
				</LinkContainer>
				<LinkContainer to="/login" exact>
					<NavItem>Login</NavItem>
				</LinkContainer>
			</Nav>
		);
	}

	render() {
		return (
			<Navbar fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">Bottom Time</Link>
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
