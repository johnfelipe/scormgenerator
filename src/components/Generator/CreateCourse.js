import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt, faArrowCircleRight, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// formik and related libraries
import { Formik } from "formik";
import * as Yup from 'yup';

// redux library
import { useDispatch, useSelector } from 'react-redux';

// handler components
import NavigationHandler from '../Handlers/NavigationHandler';
import CheckBoxInput from '../Handlers/CheckBoxHandler';
import SgDropdownSelect from '../WebuppsComponents/SgDropdownSelect';

//modal
import WarningModal from '../AlertModal/Warning';

// actions
import { courseActions } from '../../actions';

// services
import { galleryService } from '../../services';

function CreateCourse() {

    const dispatch = useDispatch();
    const [courseNameExist, setCourseNameExist] = useState(false);
    const courses = useSelector(state => state.course.courses ? state.course.courses : []);
    const currentCourse = useSelector(state => state.course.currentCourse);
    const courseTypeOptions = [
        {label: 'Scorm 1.2', value: 'Scorm 1.2'},
        {label: 'Scorm 2004', value: 'Scorm 2004'},
    ];
    const courseLayoutOptions = [
        {label: 'Fixed', value: 'fixed'},
        {label: 'Fluid', value: 'fluid'},
    ];

    const courseUpdateMsg = () => (
        <span className="p-2">
            <FontAwesomeIcon icon={faCheck}/>&nbsp;
            Course updated successfully
        </span>
    );
    const updateToast = () => toast.success(courseUpdateMsg);

    const courseCreateMsg = () => (
        <span className="p-2">
            <FontAwesomeIcon icon={faCheck}/>&nbsp;
            Course created successfully
        </span>
    );
    const createToast = () => toast.success(courseCreateMsg);

    useEffect(() => {
        dispatch(courseActions.getAll());
    }, [dispatch, currentCourse]);

    useEffect(() => {
        const courseAction = sessionStorage.getItem('courseAction');
        if (courseAction === "update") {
            updateToast();
        } else if (courseAction === "create") {
            createToast();
        }
        sessionStorage.clear();
    });

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    const onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if ((source.droppableId === "courses") && (destination.droppableId === "courses") && (source.droppableId === destination.droppableId)) {
            const courseList = courses;

            const reordered_courses = reorder(
                courseList,
                source.index,
                destination.index
            );

            let updatedCourseList = reordered_courses;

            for (let i = 0; i < updatedCourseList.length; i++) {
                const data = {
                    weight: i
                }
                updatedCourseList[i].weight = i;
                dispatch(courseActions.updateCourse(data, updatedCourseList[i].cid));

                // roles = roles.sort((a, b) => (a.weight > b.weight) ? 1 : -1);
            }

            updatedCourseList = updatedCourseList.sort((a, b) => (a.weight > b.weight) ? 1 : -1);

            dispatch(courseActions.updateCourseList(updatedCourseList));
        }
    }

    return (
        <div id="generator-container">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                transition={Slide}
            />

            <Breadcrumb bsPrefix="breadcrumb bg-white p-2">
                <Breadcrumb.Item active={true} linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
            </Breadcrumb>

            <Formik
                initialValues={{
                    courseTitle: '',
                    courseLogo: '',
                    navigationType: 0,
                    courseType: "Scorm 1.2",
                    courseLayout: "fixed",
                    showProgressbar: false,
                }}

                onSubmit={(values, {setSubmitting, resetForm}) => {
                    try {
                        console.log(values);
                        const data = {
                            title: values.courseTitle,
                            logo: values.courseLogo.url,
                            navigation: values.navigationType,
                            progressbar: values.showProgressbar ? 1 : 0,
                            status: 1,
                            type: values.courseType,
                            layout: values.courseLayout,
                            uid: 1,
                            weight: 0,
                        }

                        sessionStorage.setItem('courseAction', 'create');

                        dispatch(courseActions.createCourse(data));
                        resetForm({})
                    } catch (error) {
                        setSubmitting(false)
                    }
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
                                <div className="col-md-9 pr-0">
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
                                                    // this.props.addCourseTitle(values.courseTitle);
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
                                            {/* <label htmlFor="courseLogo" className="position-absolute ml-4-5 mt-1">Logo:</label> */}
                                            <input
                                                id="courseLogo"
                                                name="courseLogo"
                                                type="file"
                                                className="form-control custom-file-input"
                                                onChange={(event) => {
                                                    // setFieldValue("courseLogo", event.currentTarget.files[0]);
                                                    const formData = new FormData();

                                                    formData.append('file', event.currentTarget.files[0]);
                                                    formData.append('uid', 1);
                                                    formData.append('alt', event.currentTarget.files[0].name);

                                                    galleryService.uploadFiles(formData)
                                                    .then(
                                                        fileObject => {
                                                            console.log(fileObject);
                                                            setFieldValue("courseLogo", fileObject);
                                                        },
                                                        error => console.log(error)
                                                    );
                                                }}
                                                onBlur={handleBlur}
                                                accept="image/*"
                                            />
                                            <label htmlFor="courseLogo" className="course-logo mr-3" id="custom-form-label"> { values.courseLogo ? values.courseLogo.name : <span>Choose file</span> }</label>
                                        </div>
                                    :
                                        <div className="col-md-3">
                                            <WarningModal 
                                                fieldType="label"
                                                htmlFor="courseLogo"
                                                labelClasses="course-logo mr-3"
                                                labelId="custom-form-label"
                                                label="Choose file"
                                                modalMessage="Please enter a course name first"
                                            />
                                        </div>
                                }
                            </div>
                            <div className="row">
                                <div className="col-md-3 mt-2">
                                    <NavigationHandler
                                        currentType={values.navigationType}
                                        name="navigationType"
                                        handleChange={handleChange}
                                        courseNameExist={courseNameExist}
                                    />
                                </div>
                                <div className="col-md-3 mt-2">
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
                                <div className="col-md-3 mt-2">
                                    <div className="text-center">
                                        <SgDropdownSelect
                                            selectTitle="Type"
                                            currentValue={values.courseType}
                                            defaultValue="Scorm 1.2"
                                            onChangeHandler={handleChange}
                                            selectId="courseType"
                                            selectHtmlFor="courseType"
                                            selectOptions={courseTypeOptions}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 mt-2">
                                    <div className="text-right">
                                        <SgDropdownSelect
                                            selectTitle="Layout"
                                            currentValue={values.courseLayout}
                                            defaultValue="fixed"
                                            onChangeHandler={handleChange}
                                            selectId="courseLayout"
                                            selectHtmlFor="courseLayout"
                                            selectOptions={courseLayoutOptions}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mt-2">
                                    <div id="course-container">
                                        <DragDropContext onDragEnd={onDragEnd}>
                                            <Droppable droppableId="courses">
                                                {(provided) => (
                                                    <div
                                                        className="course-container"
                                                        ref={provided.innerRef}
                                                    >
                                                        {courses.map((course, courseIndex) => (
                                                            <Draggable
                                                                key={'courses-' + courseIndex}
                                                                draggableId={'courses-' + courseIndex}
                                                                index={courseIndex}>
                                                                {(provided) => (
                                                                    <div
                                                                        key={"course-" + courseIndex}
                                                                        className="course-item p-2 rounded"
                                                                        data-course-id={course.cid}
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                    >
                                                                        <div className="row m-0">
                                                                            <div className="col-md-10 py-2">
                                                                                <span
                                                                                    className={
                                                                                        course.layout === "fixed" ?
                                                                                            "fixed-layout-text-color font-weight-bold"
                                                                                        : 
                                                                                            "fluid-layout-text-color font-weight-bold"
                                                                                    }
                                                                                >
                                                                                    {course.title}
                                                                                </span>
                                                                            </div>
                                                                            <div className="col-md-2 sg-vertical-center justify-content-end">
                                                                                <OverlayTrigger
                                                                                    key="draggable-top"
                                                                                    placement="top"
                                                                                    overlay={
                                                                                        <Tooltip id='draggable-tooltip-top'>
                                                                                            <span>Drag Handle</span>
                                                                                        </Tooltip>
                                                                                    }
                                                                                >
                                                                                    <span
                                                                                        {...provided.dragHandleProps}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faArrowsAlt}/>
                                                                                    </span>
                                                                                </OverlayTrigger>
                                                                                <OverlayTrigger
                                                                                    key="duplicate-top"
                                                                                    placement="top"
                                                                                    overlay={
                                                                                        <Tooltip id='duplicate-tooltip-top'>
                                                                                            <span>Duplicate course</span>
                                                                                        </Tooltip>
                                                                                    }
                                                                                >
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-primary ml-3"
                                                                                        onClick={() => {
                                                                                            dispatch(courseActions.duplicateCourse(course.cid));
                                                                                        }}
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faCopy}/>
                                                                                    </button>
                                                                                </OverlayTrigger>
                                                                                <OverlayTrigger
                                                                                    key="goto-top"
                                                                                    placement="top"
                                                                                    overlay={
                                                                                        <Tooltip id='goto-tooltip-top'>
                                                                                            <span>Go to course</span>
                                                                                        </Tooltip>
                                                                                    }
                                                                                >
                                                                                    <Link
                                                                                        to={"/course/" + course.cid}
                                                                                        className="btn btn-primary ml-3"
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faArrowCircleRight}/>
                                                                                    </Link>
                                                                                </OverlayTrigger>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    </div>
                                </div>
                            </div> 
                            <div className="row">                                                      
                                <div id="save-btn-container" className="col-md-12 mt-2">
                                    <button type="submit" className="btn btn-success float-right"  disabled={courseNameExist ? isSubmitting : true}>Create Course</button>
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
