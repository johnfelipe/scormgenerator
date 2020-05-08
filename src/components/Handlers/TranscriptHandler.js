import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";

class TranscriptHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidUpdate = () => {
        console.log(this.props.transcriptFileData);
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    onSave = (object) => {
        this.props.transcriptFileHandler(object);

        this.setModalShow(false)
    }

    render() {
        const transcriptModal = (
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
                        Upload Transcript
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ 
                            transcriptFile: this.props.transcriptFileData.transcriptFile ? this.props.transcriptFileData.transcriptFile : '',
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
                                        id="transcriptFile"
                                        name="resourceFtranscriptFileile1"
                                        type="file"
                                        className="form-control custom-file-input"
                                        onChange={(event) => {setFieldValue("transcriptFile", event.currentTarget.files[0]);}}
                                        onBlur={handleBlur}
                                        accept="image/x-png,image/gif,image/jpeg"
                                    />
                                    <label htmlFor="transcriptFile" className="custom-input-label custom-file-label" id="custom-form-label"> { values.transcriptFile ? values.transcriptFile.name : <span>Choose file</span> }</label>
                                    <button type="submit" className="btn btn-success float-right mt-1" disabled={isSubmitting}>Save</button>
                                </form>
                            );
                        }}
                    </Formik>
                </Modal.Body>
            </Modal>
        );

        return (
            <div id="transcript-btn-container">
                <label htmlFor="transcriptBtn" className="mr-2">Upload Transcript (Optional):</label>
                <button type="button" className="btn btn-outline-dark" onClick={() => this.setModalShow(true)}>Transcript</button>
                {transcriptModal}
            </div>
        )
    }
}

export default TranscriptHandler;
