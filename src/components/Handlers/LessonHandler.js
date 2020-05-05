import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class AddLesson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            lessonName: this.props.currentLessonName,
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    onSave = (lessonName, id) => {
        if (this.props.action === "add") {
            this.props.addLessonNameChange(lessonName);
        } else if (this.props.action === "edit") {
            this.props.editLessonNameChange(lessonName, id);
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
                        Lesson Name
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ 
                            lessonName: this.state.lessonName ? this.state.lessonName : '',
                        }}

                        onSubmit={values => {
                            console.log(values.lessonName);
                            this.onSave(values.lessonName, this.props.id);
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
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <input
                                        id="lessonName"
                                        name="lessonName"
                                        type="text"
                                        className={(errors.lessonName && touched.lessonName && "error form-control") || "form-control"}
                                        onChange={handleChange}
                                        value={values.lessonName}
                                        onBlur={handleBlur}
                                        placeholder="Type lesson name here . . ."
                                    />
                                    {errors.lessonName && touched.lessonName && (
                                        <div className="input-feedback">{errors.lessonName}</div>
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
            <div id="lesson-handler-container" className="d-inline">
                {this.props.action === "add" ?
                    <div id="add-lesson-btn" className="float-left">
                        <button type="button" className="btn btn-success" onClick={() => this.setModalShow(true)}>Add Lesson</button>
                    </div>
                :
                    <div id="edit-lesson-btn" className="d-inline">
                        <button type="button" className="btn btn-link pl-0" onClick={() => this.setModalShow(true)}>| Edit</button>
                    </div>
                }
                {lessonModal}
            </div>
        )
    }
}

export default AddLesson;
