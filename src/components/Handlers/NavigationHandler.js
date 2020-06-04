import React, { Component } from 'react';

class NavigationHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigationType: '',
        };
    }
    
    render() {
        return (
            <div>
                <label htmlFor={this.props.name} className="mr-1">Choose Navigation Type:</label>
                <select id={this.props.name} className="form-control d-inline w-50" value={this.props.currentType} onChange={this.props.handleChange}>
                    <option value={0}>Sidebar</option>
                    <option value={1}>Dropdown Select</option>
                    <option value={2}>Hamburger Menu</option>
                </select>
            </div>
        )
    }
}

export default NavigationHandler;
