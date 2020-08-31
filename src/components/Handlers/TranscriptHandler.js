import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup';

// redux library
import { useDispatch } from 'react-redux';

// actions
import { coursemetaActions } from '../../actions';

// services
import { galleryService } from '../../services';

function TranscriptHandler(props) {

    const { cid, transcriptFileData, uid } = props;
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const SUPPORTED_FORMATS = [
        "application/pdf"
    ];

    const onSave = (object) => {
        if (object['transcriptFile'].name) {
            const formData = new FormData();

            formData.append('file', object['transcriptFile']);
            formData.append('uid', uid);
            formData.append('alt', object['transcriptFile'].name);

            galleryService.uploadFiles(formData)
            .then(
                fileObject => {
                    console.log(fileObject);
                    const data = {
                        cid: cid,
                        rkey: 'transcript',
                        rvalue: fileObject.url,
                    }
                    
                    dispatch(coursemetaActions.createCoursemeta(data));
                },
                error => console.log(error)
            );
        } else if (object['transcriptFile'].file) {
            const cmid = object['transcriptFile'].cmid;
            const formData = new FormData();

            formData.append('file', object['transcriptFile'].file);
            formData.append('uid', uid);
            formData.append('alt', object['transcriptFile'].file.name);

            galleryService.uploadFiles(formData)
            .then(
                fileObject => {
                    console.log(fileObject);
                    const data = {
                        rvalue: fileObject.url,
                    }
                    
                    dispatch(coursemetaActions.updateCoursemeta(data, cmid));
                },
                error => console.log(error)
            );
        } 

        setModalShow(false)
    }

    const transcriptModal = (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
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
                        transcriptFile: transcriptFileData[0] ? transcriptFileData[0] : '',
                    }}

                    validationSchema={Yup.object().shape({
                        transcriptFile: Yup.mixed()
                            .required("A file is required")
                            .test(
                                "fileFormat",
                                "Unsupported Format",
                                value => value.type ?
                                   SUPPORTED_FORMATS.includes(value.type)
                                :
                                    value.file && SUPPORTED_FORMATS.includes(value.file.type)
                            )
                        }
                    )}

                    onSubmit={values => {
                        onSave(values);
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
                                    // onChange={(event) => {setFieldValue("transcriptFile", event.currentTarget.files[0]);}}
                                    onChange={(event) => {
                                        values.transcriptFile && values.transcriptFile.rvalue ?
                                            setFieldValue('transcriptFile', {cmid: values.transcriptFile.cmid, file: event.currentTarget.files[0]})
                                        :
                                            setFieldValue('transcriptFile', event.currentTarget.files[0])
                                    }}
                                    onBlur={handleBlur}
                                    accept="application/pdf"
                                />
                                <label 
                                    htmlFor="transcriptFile"
                                    className={
                                        (errors.transcriptFile && touched.transcriptFile && "error custom-input-label custom-file-label") ||
                                        "custom-input-label custom-file-label"
                                    }
                                    id="custom-form-label"
                                >
                                    {/* {values.transcriptFile ?
                                        values.transcriptFile.name
                                    :
                                        <span>Choose file</span>
                                    } */}
                                    {values.transcriptFile ?
                                        values.transcriptFile.rvalue ?
                                            values.transcriptFile.rvalue.split('/')[5]
                                        :
                                            values.transcriptFile.file ?
                                                values.transcriptFile.file.name
                                            :
                                                values.transcriptFile.name
                                    :
                                        <span>Choose file</span>
                                    }
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
            <button type="button" className="btn btn-outline-dark" onClick={() => setModalShow(true)}>Transcript</button>
            {transcriptModal}
        </div>
    );
}

export default TranscriptHandler;
