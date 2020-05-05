import React, { Component } from 'react';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class FileInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileInput: '',
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
            <input
                id="fileInput"
                name="fileInput"
                type="file"
                className="form-control"
                value={this.state.fileInput}
                onChange={(event) => this.handleChange(event)}
                accept="image/x-png,image/gif,image/jpeg"
            />
        )
    }
}

export default FileInput;
