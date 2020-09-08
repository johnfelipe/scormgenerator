import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

// redux library
import { useDispatch } from 'react-redux';

// actions
import { coursemetaActions } from '../../actions';

// services
import { galleryService } from '../../services';

function ResourcesHandler(props) {

    const { cid, resourceFilesData, uid } = props;
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const [inputCounter, setInputCounter] = useState(resourceFilesData.length > 0 ? resourceFilesData.length : 1);
    const [inputObject, setInputObject] = useState([{name: 'resourceFile1'}]);
    const [toBeDeleted, setToBeDeleted] = useState([]);

    useEffect(() => {
        let inputObj = [];
        let i = 0;

        if (resourceFilesData.length > 0) {
            for (; i < resourceFilesData.length; i++) {
                inputObj.push({name: 'resourceFile' + (i + 1)});
            }

            setInputCounter(i);
            setInputCounter(resourceFilesData.length);
            setInputObject(inputObj);
        }
    }, [resourceFilesData]);

    const addInput = () => {
        let currentCount = inputCounter;
        currentCount += 1;

        if (!(currentCount === 6)) {
            const inputObj = { name: 'resourceFile' + currentCount };

            setInputCounter(currentCount);
            setInputObject([...inputObject, inputObj]);
        } else {
            alert("Already limit!");
        }
    }

    const getInitialValues = (inputs) => {
        //declare an empty initialValues object
        const initialValues = {};
        //loop loop over fields array
        //if prop does not exit in the initialValues object,
        // pluck off the name and value props and add it to the initialValues object;
        inputs.forEach((field, index) => {
            if(!initialValues[field.name]) {
                initialValues[field.name] = resourceFilesData[index] ? resourceFilesData[index] : '';
            }
        });
    
        //return initialValues object
        return initialValues;
    }

    const deleteFileInputField = (index, resourceObj) => {
        setToBeDeleted([...toBeDeleted, {cmid: resourceObj.cmid, index: index}]);

        const inputObj = [...inputObject];
        inputObj.splice(index, 1);

        const currentCount = inputObj.length;

        setInputCounter(currentCount);
        setInputObject(inputObj);
    }

    const onSave = (object) => {

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                if (object[key].file) {
                    const cmid = object[key].cmid;
                    const formData = new FormData();

                    formData.append('file', object[key].file);
                    formData.append('uid', uid);
                    formData.append('alt', object[key].file.name);

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
                } else if (object[key].name) {
                    const formData = new FormData();

                    formData.append('file', object[key]);
                    formData.append('uid', uid);
                    formData.append('alt', object[key].name);

                    galleryService.uploadFiles(formData)
                    .then(
                        fileObject => {
                            console.log(fileObject);
                            const data = {
                                cid: cid,
                                rkey: 'resources',
                                rvalue: fileObject.url,
                            }
                            
                            dispatch(coursemetaActions.createCoursemeta(data));
                        },
                        error => console.log(error)
                    );
                }
            }
        }

        if (toBeDeleted.length > 0) {
            for (var index in toBeDeleted) {
                dispatch(coursemetaActions.deleteCoursemeta(toBeDeleted[index].cmid));
            }
        }

        setModalShow(false)
    }

    const initialValues = getInitialValues(inputObject);

    const resourcesModal = (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
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
                    initialValues= {initialValues}

                    onSubmit={values => {
                        onSave(values);
                        console.log(values);
                        console.log(resourceFilesData);
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
                            <div>
                                <button type="button" className="btn btn-success" onClick={addInput}>Add File</button>
                                <form onSubmit={handleSubmit}>
                                    {inputObject.map((input, index) => (
                                        <div key={input.name} className="row mt-2">
                                            <div className="col-md-11">
                                                <input
                                                    id={input.name}
                                                    name={input.name}
                                                    type="file"
                                                    className="form-control custom-file-input"
                                                    onChange={(event) => {
                                                        values[input.name] && values[input.name].rvalue ?
                                                            setFieldValue(input.name, {cmid: values[input.name].cmid, file: event.currentTarget.files[0]})
                                                        :
                                                            setFieldValue(input.name, event.currentTarget.files[0])
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <label
                                                    htmlFor={input.name}
                                                    className={input.name + "-input-label custom-file-label"}
                                                    id="custom-form-label"
                                                >
                                                    {values[input.name] ?
                                                        values[input.name].rvalue ?
                                                            values[input.name].rvalue.split('/')[5]
                                                        :
                                                            values[input.name].file ?
                                                                values[input.name].file.name
                                                            :
                                                                values[input.name].name
                                                    :
                                                        <span>Choose file</span>
                                                    }
                                                </label>
                                            </div>
                                            <div className="col-md-1">
                                                <button
                                                    className="btn btn-danger float-right remove-file-input-row"
                                                    title="Remove"
                                                    onClick={() => {
                                                        deleteFileInputField(index, values[input.name]);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faWindowClose} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="submit" className="btn btn-success float-right mt-5" disabled={isSubmitting}>Save</button>
                                </form>
                            </div>
                        );
                    }}
                </Formik>
            </Modal.Body>
        </Modal>
    );

    return (
        <div id="resources-btn-container">
            <label htmlFor="resourcesBtn" className="mr-2">Upload Resources (Optional):</label>
            <button type="button" className="btn btn-outline-dark" onClick={() => setModalShow(true)}>Resources</button>
            {resourcesModal}
        </div>
    )
}

export default ResourcesHandler;
