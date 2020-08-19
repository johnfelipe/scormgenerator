import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup';

function AltTagForm (props) {

    const { modalShow, imgUrlPreview, file, fileIndex } = props;

    const altTagFormModal = (
        <Modal
            show={modalShow}
            onHide={() => props.setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="gallery-preview-modal w-50"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>Enter alt tag for image</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ 
                        alt: '',
                    }}

                    onSubmit={values => {
                        // setMediaAlt(values.alt);
                        props.setModalShow(false);
                        props.handleImageUpload(values.alt, file, fileIndex);
                    }}

                    validationSchema={Yup.object().shape({
                        alt: Yup.string()
                            .required("Alt is required"),
                        }
                    )}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        } = props;
                        return (
                            <form onSubmit={handleSubmit} className="text-center">
                                <img src={imgUrlPreview} alt={values.alt} className="w-50 h-auto mb-3"/>
                                <input
                                    id="alt"
                                    name="alt"
                                    type="text"
                                    className={(errors.alt && touched.alt && "error form-control") || "form-control"}
                                    onChange={handleChange}
                                    value={values.alt}
                                    onBlur={handleBlur}
                                    placeholder="Type lesson name here . . ."
                                />
                                {errors.alt && touched.alt && (
                                    <div className="input-feedback">{errors.alt}</div>
                                )}
                                <button type="submit" className="btn btn-success float-right mt-4" disabled={isSubmitting}>Submit</button>
                            </form>
                        );
                    }}
                </Formik>
            </Modal.Body>
        </Modal>
    );

    return (
        <>
            {altTagFormModal}
        </>
    );
}

export default AltTagForm;