import React, { Component } from 'react';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class SelectInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectInput: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        console.log(event.target.value);

        this.setState({
            fileInput: event.target.value,
        })
    }
    
    render() {
        return (
            <div>
                <label htmlFor="selectInput" className="mr-1">Choose Navigation Type:</label>
                <select id="selectInput" className="form-control d-inline w-25" value={this.state.selectInput} onChange={(event) => this.handleChange(event)}>
                    <option value={0}>Sidebar</option>
                    <option value={1}>Dropdown Select</option>
                    <option value={2}>Hamburger Menu</option>
                </select>
            </div>
        )
    }
}

export default SelectInput;
