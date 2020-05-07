import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup';

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
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
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
                            console.log(values);
                        }}

                        validationSchema={Yup.object().shape({
                            lessonName: Yup.string()
                                .required("Lesson name required"),
                            }
                        )}
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
                                        id="resourceFile1"
                                        name="resourceFile1"
                                        type="file"
                                        className="form-control custom-file-input"
                                        onChange={handleChange}
                                        value={values.resourceFile1}
                                        onBlur={handleBlur}
                                        accept="image/x-png,image/gif,image/jpeg"
                                    />
                                    <label htmlFor="resourceFile1" className="resourceFile1-input-label custom-file-label" id="custom-form-label"> { values.resourceFile1 ? values.resourceFile1.replace(/^.*[\\]/, '') : <span>Choose file</span> }</label>
                                    <input
                                        id="resourceFile2"
                                        name="resourceFile2"
                                        type="file"
                                        className="form-control custom-file-input"
                                        onChange={handleChange}
                                        value={values.resourceFile2}
                                        onBlur={handleBlur}
                                        accept="image/x-png,image/gif,image/jpeg"
                                    />
                                    <label htmlFor="resourceFile2" className="resourceFile2-input-label custom-file-label" id="custom-form-label"> { values.resourceFile2 ? values.resourceFile2.replace(/^.*[\\]/, '') : <span>Choose file</span> }</label>
                                    <input
                                        id="resourceFile3"
                                        name="resourceFile3"
                                        type="file"
                                        className="form-control custom-file-input"
                                        onChange={handleChange}
                                        value={values.resourceFile3}
                                        onBlur={handleBlur}
                                        accept="image/x-png,image/gif,image/jpeg"
                                    />
                                    <label htmlFor="resourceFile3" className="resourceFile3-input-label custom-file-label" id="custom-form-label"> { values.resourceFile3 ? values.resourceFile3.replace(/^.*[\\]/, '') : <span>Choose file</span> }</label>
                                    <input
                                        id="resourceFile4"
                                        name="resourceFile4"
                                        type="file"
                                        className="form-control custom-file-input"
                                        onChange={handleChange}
                                        value={values.resourceFile4}
                                        onBlur={handleBlur}
                                        accept="image/x-png,image/gif,image/jpeg"
                                    />
                                    <label htmlFor="resourceFile4" className="resourceFile4-input-label custom-file-label" id="custom-form-label"> { values.resourceFile4 ? values.resourceFile4.replace(/^.*[\\]/, '') : <span>Choose file</span> }</label>
                                    <input
                                        id="resourceFile5"
                                        name="resourceFile5"
                                        type="file"
                                        className="form-control custom-file-input"
                                        onChange={handleChange}
                                        value={values.resourceFile5}
                                        onBlur={handleBlur}
                                        accept="image/x-png,image/gif,image/jpeg"
                                    />
                                    <label htmlFor="resourceFile5" className="resourceFile5-input-label custom-file-label" id="custom-form-label"> { values.resourceFile5 ? values.resourceFile5.replace(/^.*[\\]/, '') : <span>Choose file</span> }</label>
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
