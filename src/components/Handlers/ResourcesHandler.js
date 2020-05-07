import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class ResourcesHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            resourceFile1: '',
            resourceFile2: '',
            resourceFile3: '',
            resourceFile4: '',
            resourceFile5: '',
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    onSave = (object) => {
        this.props.resourceFilesHandler(object);

        this.setModalShow(false)
    }

    render() {
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
                        initialValues={{ 
                            resourceFile1: this.state.resourceFile1 ? this.state.resourceFile1 : '',
                            resourceFile2: this.state.resourceFile2 ? this.state.resourceFile2 : '',
                            resourceFile3: this.state.resourceFile3 ? this.state.resourceFile3 : '',
                            resourceFile4: this.state.resourceFile4 ? this.state.resourceFile4 : '',
                            resourceFile5: this.state.resourceFile5 ? this.state.resourceFile5 : '',
                        }}

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
                                <form onSubmit={handleSubmit}>
                                    <input
                                        id="resourceFile1"
                                        name="resourceFile1"
                                        type="file"
                                        className="form-control custom-file-input"
                                        onChange={(event) => {setFieldValue("resourceFile1", event.currentTarget.files[0]);}}
                                        onBlur={handleBlur}
                                        accept="image/x-png,image/gif,image/jpeg"
                                    />
                                    <label htmlFor="resourceFile1" className="resourceFile1-input-label custom-file-label" id="custom-form-label"> { values.resourceFile1 ? values.resourceFile1.name : <span>Choose file</span> }</label>
                                    <input
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
                                    <label htmlFor="resourceFile5" className="resourceFile5-input-label custom-file-label" id="custom-form-label"> { values.resourceFile5 ? values.resourceFile5.name : <span>Choose file</span> }</label>
                                    <button type="submit" className="btn btn-success float-right mt-5" disabled={isSubmitting}>Save</button>
                                </form>
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
