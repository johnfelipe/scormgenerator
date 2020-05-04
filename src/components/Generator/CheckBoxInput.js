import React, { Component } from 'react';
import { Formik } from "formik";

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class CheckBoxInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cbInput: '',
        };
    }

    render() {
        return (
            <Formik
                initialValues={{ cbInput: "" }}
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
                            id="cbInput"
                            name="cbInput"
                            type="checkbox"
                            value={values.cbInput}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label for="cbInput" className="ml-1"> Show/Hide Progress Bar</label>
                    </form>
                    );
                }}
            </Formik>
        )
    }
}

export default CheckBoxInput;
