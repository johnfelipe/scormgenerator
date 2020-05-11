import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";

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
    }

    componentDidUpdate = () => {
        console.log(this.props.resourceFilesData);
        console.log(this.getInitialValues(this.state.inputObject));
        console.log(this.state.inputObject);
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
            const inputObj = { name: 'resourceFile' + currentCount, top: this.state.inputObject[currentCount - 2].top + this.state.top };

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
        inputs.forEach((field, index) => {
            if(!initialValues[field.name]) {
                initialValues[field.name] = this.props.resourceFilesData[field.name] ? this.props.resourceFilesData[field.name] : '';
            }
        });
    
        //return initialValues object
        return initialValues;
    }

    onSave = (object) => {
        this.props.resourceFilesHandler(object);

        this.setModalShow(false)
    }

    render() {
        // const currentCount = this.state.inputCounter;
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
                            console.log(values);
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
                                            <div key={input.name}>
                                                <input
                                                    id={input.name}
                                                    name={input.name}
                                                    type="file"
                                                    className="form-control custom-file-input"
                                                    onChange={(event) => {setFieldValue(input.name, event.currentTarget.files[0]);}}
                                                    onBlur={handleBlur}
                                                    accept="image/x-png,image/gif,image/jpeg"
                                                />
                                                <label htmlFor={input.name} style={{top: input.top}} className={input.name + "-input-label custom-file-label"} id="custom-form-label"> { values[input.name] ? values[input.name].name : <span>Choose file</span> }</label>
                                            </div>
                                        ))}
                                        {/* <input
                                            id="resourceFile1"
                                            name="resourceFile1"
                                            type="file"
                                            className="form-control custom-file-input"
                                            onChange={(event) => {setFieldValue("resourceFile1", event.currentTarget.files[0]);}}
                                            onBlur={handleBlur}
                                            accept="image/x-png,image/gif,image/jpeg"
                                        />
                                        <label htmlFor="resourceFile1" className="resourceFile1-input-label custom-file-label" id="custom-form-label"> { values.resourceFile1 ? values.resourceFile1.name : <span>Choose file</span> }</label> */}
                                        {/* <input
                                            id="resourceFile2"
                                            name="resourceFile2"
                                            type="file"
                                            className="form-control custom-file-input"
                                            onChange={(event) => {setFieldValue("resourceFile2", event.currentTarget.files[0]);}}
                                            onBlur={handleBlur}
                                            accept="image/x-png,image/gif,image/jpeg"
                                        />
                                        <label htmlFor="resourceFile2" className="resourceFile2-input-label custom-file-label" id="custom-form-label"> { values.resourceFile2 ? values.resourceFile2.name : <span>Choose file</span> }</label>
                                        <input
                                            id="resourceFile3"
                                            name="resourceFile3"
                                            type="file"
                                            className="form-control custom-file-input"
                                            onChange={(event) => {setFieldValue("resourceFile3", event.currentTarget.files[0]);}}
                                            onBlur={handleBlur}
                                            accept="image/x-png,image/gif,image/jpeg"
                                        />
                                        <label htmlFor="resourceFile3" className="resourceFile3-input-label custom-file-label" id="custom-form-label"> { values.resourceFile3 ? values.resourceFile3.name : <span>Choose file</span> }</label>
                                        <input
                                            id="resourceFile4"
                                            name="resourceFile4"
                                            type="file"
                                            className="form-control custom-file-input"
                                            onChange={(event) => {setFieldValue("resourceFile4", event.currentTarget.files[0]);}}
                                            onBlur={handleBlur}
                                            accept="image/x-png,image/gif,image/jpeg"
                                        />
                                        <label htmlFor="resourceFile4" className="resourceFile4-input-label custom-file-label" id="custom-form-label"> { values.resourceFile4 ? values.resourceFile4.name : <span>Choose file</span> }</label>
                                        <input
                                            id="resourceFile5"
                                            name="resourceFile5"
                                            type="file"
                                            className="form-control custom-file-input"
                                            onChange={(event) => {setFieldValue("resourceFile5", event.currentTarget.files[0]);}}
                                            onBlur={handleBlur}
                                            accept="image/x-png,image/gif,image/jpeg"
                                        />
                                        <label htmlFor="resourceFile5" className="resourceFile5-input-label custom-file-label" id="custom-form-label"> { values.resourceFile5 ? values.resourceFile5.name : <span>Choose file</span> }</label> */}
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
