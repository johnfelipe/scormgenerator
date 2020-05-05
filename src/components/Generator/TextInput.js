import React, { Component } from 'react';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class TextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textInput: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        console.log(event.target.value);

        this.setState({
            textInput: event.target.value,
        })
    }

    render() {
        return (
            <input
                id="textInput"
                name="textInput"
                type="text"
                className="form-control"
                value={this.state.textInput}
                onChange={(event) => this.handleChange(event)}
                placeholder={this.props.placeholder}
            />
        )
    }
}

export default TextInput;
