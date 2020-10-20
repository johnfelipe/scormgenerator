import React from 'react';
import { Navbar, NavLink, Dropdown } from 'react-bootstrap';
import Preferences from '../Settings/Preferences';

function NavigationHeader() {

    return (
        <header>
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
                        <li className="nav-item">
                            <Dropdown
                                alignRight
                            >
                                <Dropdown.Toggle variant="link" className="nav-link text-white">
                                    Settings
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Preferences/>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default NavigationHeader;
