import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

class ResourcesHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            inputCounter: 1,
            inputObject: [
                {name: 'resourceFile1', top: 0}
            ],
            top: 45,
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.onSave = this.onSave.bind(this);
        this.addInput = this.addInput.bind(this);
        this.getInitialValues = this.getInitialValues.bind(this);
        this.deleteFileInputField = this.deleteFileInputField.bind(this);
    }

    componentDidUpdate = () => {
        console.log(this.props.resourceFilesData);
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    addInput = () => {
        let currentCount = this.state.inputCounter;
        currentCount += 1;

        if (!(currentCount === 6)) {
            // const inputObj = { name: 'resourceFile' + currentCount, top: this.state.inputObject[currentCount - 2].top + this.state.top };
            const inputObj = { name: 'resourceFile' + currentCount };

            this.setState({
                inputCounter: currentCount,
                inputObject: [...this.state.inputObject, inputObj],
            });
        } else {
            alert("Already limit!");
        }
    }

    getInitialValues = (inputs) => {
        //declare an empty initialValues object
        const initialValues = {};
        //loop loop over fields array
        //if prop does not exit in the initialValues object,
        // pluck off the name and value props and add it to the initialValues object;
        inputs.forEach((field) => {
            if(!initialValues[field.name]) {
                initialValues[field.name] = this.props.resourceFilesData[field.name] ? this.props.resourceFilesData[field.name] : '';
            }
        });
    
        //return initialValues object
        return initialValues;
    }

    deleteFileInputField = (index) => {
        const inputObj = [...this.state.inputObject];
        inputObj.splice(index, 1);

        const currentCount = inputObj.length;

        this.setState({
            inputCounter: currentCount,
            inputObject: inputObj,
        });
    }

    onSave = (object) => {
        this.props.resourceFilesHandler(object);

        this.setModalShow(false)
    }

    render() {
        const initialValues = this.getInitialValues(this.state.inputObject);
        const resourcesModal = (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="resources-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Upload Resources
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues= {initialValues}

                        onSubmit={values => {
                            this.onSave(values);
                        }}
                    >
                        {props => {
                            const {
                            values,
                            isSubmitting,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
                            } = props;
                            return (
                                <div>
                                    <button type="button" className="btn btn-success" onClick={this.addInput}>Add File</button>
                                    <form onSubmit={handleSubmit}>
                                        {this.state.inputObject.map((input, index) => (
                                            <div key={input.name} className="row mt-2">
                                                <div className="col-md-11">
                                                    <input
                                                        id={input.name}
                                                        name={input.name}
                                                        type="file"
                                                        className="form-control custom-file-input"
                                                        onChange={(event) => {setFieldValue(input.name, event.currentTarget.files[0]);}}
                                                        onBlur={handleBlur}
                                                    />
                                                    <label htmlFor={input.name} className={input.name + "-input-label custom-file-label"} id="custom-form-label"> { values[input.name] ? values[input.name].name : <span>Choose file</span> }</label>
                                                </div>
                                                <div className="col-md-1">
                                                    <button className="btn btn-danger float-right remove-file-input-row" title="Remove" onClick={() => this.deleteFileInputField(index)}><FontAwesomeIcon icon={faWindowClose} /></button>
                                                </div>
                                            </div>
                                        ))}
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
            <div id="resources-btn-container">
                <label htmlFor="resourcesBtn" className="mr-2">Upload Resources (Optional):</label>
                <button type="button" className="btn btn-outline-dark" onClick={() => this.setModalShow(true)}>Resources</button>
                {resourcesModal}
            </div>
        )
    }
}

export default ResourcesHandler;
