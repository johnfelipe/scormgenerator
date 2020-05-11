import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";

class GlossaryHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            inputCounter: 1,
            inputObject: [
                {key: 'glossaryKey1', value: 'glossaryValue1', top: 0}
            ],
            top: 45,
        };
        this.setModalShow = this.setModalShow.bind(this);
        // this.onSave = this.onSave.bind(this);
        this.addInput = this.addInput.bind(this);
        this.getInitialValues = this.getInitialValues.bind(this);
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    getInitialValues = (inputs) => {
        //declare an empty initialValues object
        const initialValues = {};
        //loop loop over fields array
        //if prop does not exit in the initialValues object,
        // pluck off the name and value props and add it to the initialValues object;
        inputs.forEach((field, index) => {
            if(!initialValues[field.key]) {
                initialValues[field.key] = '';
                initialValues[field.value] = '';
            }
        });
    
        //return initialValues object
        return initialValues;
    }

    addInput = () => {
        let currentCount = this.state.inputCounter;
        currentCount += 1;

        const inputObj = { key: 'glossaryKey' + currentCount, value: 'glossaryValue' + currentCount, top: this.state.inputObject[currentCount - 2].top + this.state.top };

        this.setState({
            inputCounter: currentCount,
            inputObject: [...this.state.inputObject, inputObj],
        });
    }

    render() {
        const initialValues = this.getInitialValues(this.state.inputObject);
        const glossaryModal = (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="glossary-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Glossary
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues= {initialValues}

                        onSubmit={values => {
                            // this.onSave(values);
                            console.log(values);
                            this.setModalShow(false)
                        }}
                    >
                        {props => {
                            const {
                            values,
                            isSubmitting,
                            handleBlur,
                            handleSubmit,
                            handleChange,
                            } = props;
                            return (
                                <div>
                                    <button type="button" className="btn btn-success" onClick={this.addInput}>Add Entry</button>
                                    <form onSubmit={handleSubmit}>
                                        <div className="glossary-input-container mt-2">
                                            {this.state.inputObject.map((input, index) => (
                                                <div key={input.key + input.value} className="key-value-container row">
                                                    <div className="col-md-4 mt-1">
                                                        <input
                                                            id={input.key}
                                                            name={input.key}
                                                            type="text"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            value={values[input.key]}
                                                            onBlur={handleBlur}
                                                            placeholder="Key"
                                                        />
                                                    </div>
                                                    <div className="col-md-8 mt-1">
                                                        <input
                                                            id={input.value}
                                                            name={input.value}
                                                            type="text"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            value={values[input.value]}
                                                            onBlur={handleBlur}
                                                            placeholder="Value"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button type="submit" className="btn btn-success float-right mt-5" disabled={isSubmitting}>Save</button>
                                    </form>
                                </div>
                            );
                        }}
                    </Formik>
                </Modal.Body>
            </Modal>
        );

        return (
            <div id="add-glossary-container" className="float-right">
                <label htmlFor="glossaryBtn" className="mr-2">Add Glossary (Optional):</label>
                <button type="button" className="btn btn-outline-dark" onClick={() => this.setModalShow(true)}>Glossary</button>
                {glossaryModal}
            </div>
        )
    }
}

export default GlossaryHandler;
