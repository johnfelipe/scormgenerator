import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class SlideHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            slideName: this.props.currentLessonName,
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    onSave = (slideName, id) => {
        if (this.props.action === "add") {
            this.props.addLessonNameChange(slideName);
        } else if (this.props.action === "edit") {
            this.props.editLessonNameChange(slideName, id);
        }
        
        this.setModalShow(false)
    }

    render() {
        const lessonModal = (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Slide
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ 
                            slideName: this.state.slideName ? this.state.slideName : '',
                        }}

                        onSubmit={values => {
                            console.log(values.slideName);
                            this.onSave(values.slideName, this.props.id);
                        }}

                        validationSchema={Yup.object().shape({
                            slideName: Yup.string()
                                .required("Lesson name required"),
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
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="slideName">Slide Name:</label>
                                    <input
                                        id="slideName"
                                        name="slideName"
                                        type="text"
                                        className={(errors.slideName && touched.slideName && "error form-control d-inline") || "form-control d-inline"}
                                        onChange={handleChange}
                                        value={values.slideName}
                                        onBlur={handleBlur}
                                        placeholder="Type lesson name here . . ."
                                    />
                                    {errors.slideName && touched.slideName && (
                                        <div className="input-feedback">{errors.slideName}</div>
                                    )}
                                    <button type="submit" className="btn btn-success float-right mt-4" disabled={isSubmitting}>Save</button>
                                </form>
                            );
                        }}
                    </Formik>
                </Modal.Body>
            </Modal>
        );

        return (
            <div id="lesson-handler-container">
                {this.props.action === "add" ?
                    <button type="button" className="btn btn-success" onClick={() => this.setModalShow(true)}>Add Slide</button>
                :
                    <button type="button" className="btn btn-link pl-0" onClick={() => this.setModalShow(true)}>| Edit</button>
                }
                {lessonModal}
            </div>
        )
    }
}

export default SlideHandler;
