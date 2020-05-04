import React, { Component } from 'react';
import { Formik } from "formik";

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class SelectInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectInput: '',
        };
    }

    render() {
        return (
            <Formik
                initialValues={{ selectInput: "" }}
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
                        <label htmlFor="selectInput" className="mr-1">Choose Navigation Type:</label>
                        <select id="selectInput" className="form-control d-inline w-25" value={values.selectInput} onChange={handleChange} onBlur={handleBlur}>
                            <option value="sidebar">Sidebar</option>
                            <option value="dropdownSelect">Dropdown Select</option>
                            <option value="hamburgerMenu">Hamburger Menu</option>
                        </select>
                    </form>
                    );
                }}
            </Formik>
        )
    }
}

export default SelectInput;
