import React, { Component } from 'react';
import { Formik } from "formik";

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class TextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textInput: '',
        };
    }

    render() {
        return (
            <Formik
                initialValues={{ textInput: "" }}
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
                            id="textInput"
                            name="textInput"
                            type="text"
                            className="form-control"
                            value={values.textInput}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Type course name here . . ."
                        />
                    </form>
                    );
                }}
            </Formik>
        )
    }
}

export default TextInput;
