import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup';

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
        let transcriptArr = [];

        transcriptArr[0] = object;

        this.props.transcriptFileHandler(transcriptArr);

        this.setModalShow(false)
    }

    render() {
        const SUPPORTED_FORMATS = [
            "application/pdf"
        ];
        const transcriptModal = (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="transcript-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Upload Transcript
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ 
                            transcriptFile: this.props.transcriptFileData[0] ? this.props.transcriptFileData[0].transcriptFile : '',
                        }}

                        validationSchema={Yup.object().shape({
                            transcriptFile: Yup.mixed()
                                .required("A file is required")
                                .test(
                                    "fileFormat",
                                    "Unsupported Format",
                                    value => value && SUPPORTED_FORMATS.includes(value.type)
                                )
                            }
                        )}

                        onSubmit={values => {
                            this.onSave(values);
                        }}
                    >
                        {props => {
                            const {
                            values,
                            touched,
                            errors,
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
                                        accept="application/pdf"
                                    />
                                    <label 
                                        htmlFor="transcriptFile"
                                        className={(errors.transcriptFile && touched.transcriptFile && "error custom-input-label custom-file-label") || "custom-input-label custom-file-label"}
                                        id="custom-form-label"
                                    >
                                        { values.transcriptFile ? values.transcriptFile.name : <span>Choose file</span> }
                                    </label>
                                    {errors.transcriptFile && touched.transcriptFile && (
                                        <div className="input-feedback">{errors.transcriptFile}</div>
                                    )}
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
