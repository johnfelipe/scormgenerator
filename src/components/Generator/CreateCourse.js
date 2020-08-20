import React, { useState, useEffect } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';

// handler components
import NavigationHandler from '../Handlers/NavigationHandler';
import CheckBoxInput from '../Handlers/CheckBoxHandler';

//modal
import WarningModal from '../AlertModal/Warning';

// services
import { courseService } from '../../services';

function CreateCourse() {

    const [courses, setCourses] = useState([]);
    const [courseNameExist, setCourseNameExist] = useState(false);

    useEffect(() => {
        courseService.getAll().then(
            courses => {
                console.log(courses);
                setCourses(courses);
            },
            error => {
                console.log(error);
            }
        );
    }, []);

    return (
        <div id="generator-container">
            <Formik
                initialValues={{
                    courseLogo: '',
                    navigationType: '',
                    showProgressbar: '',
                }}

                onSubmit={values => {
                    console.log(values);

                    
                }}

                validationSchema={Yup.object().shape({
                    courseTitle: Yup.string()
                        .required("Course title required"),
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
                        setFieldValue,
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h3>Try it out!</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <input
                                        id="courseTitle"
                                        name="courseTitle"
                                        type="text"
                                        className={(errors.courseTitle && touched.courseTitle && "error form-control") || "form-control"}
                                        value={values.courseTitle}
                                        onBlur={(e) => {
                                                handleBlur(e)

                                                if (e.target.value.trim() === "") {
                                                    setCourseNameExist(false);
                                                }
                                            }
                                        }
                                        onChange={(e) => {
                                                handleChange(e)

                                                if (e.target.value.trim() !== "") {
                                                    this.props.addCourseTitle(values.courseTitle);
                                                    setCourseNameExist(true);
                                                }
                                            }
                                        }
                                        placeholder="Type course name here . . ."
                                    />
                                    {errors.courseTitle && touched.courseTitle && (
                                        <div className="input-feedback">{errors.courseTitle}</div>
                                    )}
                                </div>
                                {
                                    courseNameExist ?
                                        <div className="col-md-3">
                                            <input
                                                id="courseLogo"
                                                name="courseLogo"
                                                type="file"
                                                className="form-control custom-file-input"
                                                onChange={(event) => {setFieldValue("courseLogo", event.currentTarget.files[0])}}
                                                onBlur={handleBlur}
                                                accept="image/x-png,image/jpeg"
                                            />
                                            <label htmlFor="courseLogo" className="custom-file-label" id="custom-form-label"> { values.courseLogo ? values.courseLogo.name : <span>Choose file</span> }</label>
                                        </div>
                                    :
                                        <div className="col-md-3">
                                            <WarningModal 
                                                fieldType="label"
                                                htmlFor="courseLogo"
                                                labelClasses="custom-file-label"
                                                labelId="custom-form-label"
                                                label="Choose file"
                                                modalMessage="Please enter a course name first"
                                            />
                                        </div>
                                }
                            </div>
                            <div className="row">
                                <div className="col-md-4 mt-2">
                                    <NavigationHandler
                                        currentType={values.navigationType}
                                        name="navigationType"
                                        handleChange={handleChange}
                                        courseNameExist={courseNameExist}
                                    />
                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="text-center mt-2">
                                        <CheckBoxInput
                                            currentCbValue={values.showProgressbar}
                                            name="showProgressbar"
                                            label="Progress Bar"
                                            handleChange={handleChange}
                                            onBlur={handleBlur}
                                            courseNameExist={courseNameExist}
                                        />
                                    </div>
                                </div>
                                <div id="save-btn-container" className="col-md-4 mt-2">
                                    <button type="submit" className="btn btn-success float-right"  disabled={isSubmitting}>Create Course</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mt-2">
                                    <div id="lesson-container">
                                        <div className="lesson-container">
                                            {courses.map((course, courseIndex) => (
                                                <div>
                                                    {course.title}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    )
}

export default CreateCourse;
