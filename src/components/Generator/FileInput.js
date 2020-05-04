import React, { Component } from 'react';
import { Formik } from "formik";

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class FileInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileInput: '',
        };
    }

    render() {
        return (
            <Formik
                initialValues={{ fileInput: "" }}
                onSubmit={async values => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {props => {
                    const {
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    } = props;
                    return (
                    <form onSubmit={handleSubmit}>
                        <input
                            id="fileInput"
                            name="fileInput"
                            type="file"
                            className="form-control"
                            value={values.fileInput}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            accept="image/x-png,image/gif,image/jpeg"
                        />
                    </form>
                    );
                }}
            </Formik>
        )
    }
}

export default FileInput;
