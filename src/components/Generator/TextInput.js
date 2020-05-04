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
                onSubmit={async (values, { setSubmitting }) => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false)
                }}
            >
                {props => {
                    const {
                    values,
                    isSubmitting,
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
                            placeholder={this.props.placeholder}
                        />
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </form>
                    );
                }}
            </Formik>
        )
    }
}

export default TextInput;
