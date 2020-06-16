import React, { Component } from 'react';

class CheckBoxHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressbar: this.props.value,
        };
    }

    render() {
        return (
            <div>
                <input
                    id={this.props.name}
                    name={this.props.name}
                    type="checkbox"
                    value={this.props.currentCbValue}
                    checked={this.props.currentCbValue}
                    onChange={this.props.handleChange}
                    onBlur={this.props.onBlur}
                    disabled={!this.props.courseNameExist}
                />
                <label htmlFor={this.props.name} className="ml-1"> {this.props.label}</label>
            </div>
        )
    }
}

export default CheckBoxHandler;
