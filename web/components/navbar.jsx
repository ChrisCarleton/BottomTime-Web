import React from 'react';

import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class AppNavBar extends React.Component {
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
						<LinkContainer to ="/" exact>
							<NavItem>Home</NavItem>
						</LinkContainer>
						<LinkContainer to="/logs">
							<NavItem>My Logs</NavItem>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>);
	}
}

export default AppNavBar;
