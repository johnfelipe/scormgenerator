import React, { Component } from 'react';

class CheckBoxInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cbInput: this.props.value,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        console.log(event.target.value);

        this.setState({
            cbInput: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <input
                    id="cbInput"
                    name="cbInput"
                    type="checkbox"
                    value={this.state.cbInput}
                    checked={this.state.cbInput}
                    onChange={this.props.handleChange}
                    onBlur={this.props.onBlur}
                />
                <label htmlFor="cbInput" className="ml-1"> {this.props.label}</label>
            </div>
        )
    }
}

export default CheckBoxInput;
