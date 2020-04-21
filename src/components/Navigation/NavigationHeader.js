import React, { Component } from 'react';
import { Navbar, NavLink } from 'react-bootstrap';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class NavigationHeader extends Component {

    render() {
        return (
            <header>
                <div className="container-fluid">
                    <Navbar bg="dark" expand="lg">
                        <NavLink href={'/'} className="navbar-brand text-white">Scorm Generator</NavLink>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink href='/about' className="nav-link text-white">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink href='/contact' className="nav-link text-white">Contact</NavLink>
                                </li>
                            </ul>
                        </Navbar.Collapse>
                    </Navbar>
                    
                </div>
            </header>
        )
    }
}

export default NavigationHeader;
