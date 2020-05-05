import React, { Component } from 'react';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class CheckBoxInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cbInput: '',
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
                    onChange={(event) => this.handleChange(event)}
                />
                <label htmlFor="cbInput" className="ml-1"> Show/Hide Progress Bar</label>
            </div>
        )
    }
}

export default CheckBoxInput;
