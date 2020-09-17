import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup';
import { connect } from 'react-redux';

// redux library
import { useDispatch } from 'react-redux';

// actions
import { courseActions, lessonActions } from '../../actions';

function LessonHandler(props) {

    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();

    const onSave = (lessonObj, lid) => {
        if (props.action === "add") {
            // props.addLessonNameChange(lessonObj);
            dispatch(lessonActions.createLesson(lessonObj));
            dispatch(courseActions.courseUpdate({ weight: 0 }, lessonObj.cid));
        } else if (props.action === "edit") {
            const data = {
                title: lessonObj.title,
            }
            dispatch(lessonActions.updateLesson(data, lid));
            dispatch(courseActions.courseUpdate({ weight: 0 }, lessonObj.cid));
            // props.editLessonNameChange(data, lid);
        }
        
        setModalShow(false)
    }

    const lessonModal = (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
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
                        lessonName: props.currentLessonName ? props.currentLessonName : '',
                    }}

                    onSubmit={values => {
                        const data = {
                            cid: props.cid,
                            title: values.lessonName,
                            uid: props.uid,
                            weight: props.lessonWeight,
                        }

                        // onSave(data, props.id);
                        onSave(data, props.lid);

                        // create lesson
                        // uid and cid are temporary
                        // const data = {
                        //     cid: 1,
                        //     title: values.lessonName,
                        //     uid: 1,
                        // }

                        // lessonService.createLesson(data)
                        // .then(
                        //     lessonObj => {
                        //         this.props.createLesson(lessonObj.cid, lessonObj.uid, lessonObj.title);
                        //         this.props.setLessonId(lessonObj.lid);
                        //         console.log(lessonObj);
                        //     },
                        //     error => console.log(error)
                        // );
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
            {props.action === "add" ?
                <div id="add-lesson-btn" className="float-left">
                    <button type="button" className="btn btn-success" onClick={() => setModalShow(true)}>Add Lesson</button>
                </div>
            :
                <div id="edit-lesson-btn" className="d-inline">
                    <button type="button" className="btn btn-link pl-0" onClick={() => setModalShow(true)}>| Edit</button>
                </div>
            }
            {lessonModal}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        lesson: state.lesson,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createLesson: (userId, courseId, title) => dispatch({type: 'CREATE_LESSON', uid: userId, cid: courseId, title: title}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonHandler);
