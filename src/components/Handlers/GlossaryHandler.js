import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

// redux library
import { useDispatch } from 'react-redux';

// actions
import { coursemetaActions } from '../../actions';

function GlossaryHandler(props) {

    const { cid, glossaryData } = props;
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const [inputCounter, setInputCounter] = useState(glossaryData.length > 0 ? glossaryData.length : 1);
    const [inputObject, setInputObject] = useState([{key: 'glossaryKey1', value: 'glossaryValue1'}]);

    useEffect(() => {
        let inputObj = [];
        let i = 0;

        if (glossaryData.length > 0) {
            for (; i < glossaryData.length; i++) {
                inputObj.push({key: 'glossaryKey' + (i + 1), value: 'glossaryValue' + (i + 1), cmid: glossaryData[i].cmid});
            }

            setInputCounter(i);
            setInputCounter(glossaryData.length);
            setInputObject(inputObj);
        }
    }, [glossaryData]);
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         modalShow: false,
    //         inputCounter: 1,
    //         inputObject: [
    //             {key: 'glossaryKey1', value: 'glossaryValue1'}
    //         ],
    //     };
    //     this.setModalShow = this.setModalShow.bind(this);
    //     this.onSave = this.onSave.bind(this);
    //     this.addInput = this.addInput.bind(this);
    //     this.getInitialValues = this.getInitialValues.bind(this);
    //     this.deleteRowInputField = this.deleteRowInputField.bind(this);
    // }

    // componentDidUpdate = () => {
    //     // console.log(this.props.glossaryData);
    // }

    // setModalShow = (value) => {
    //     this.setState({
    //         modalShow: value,
    //     });
    // }

    const getInitialValues = (inputs) => {
        //declare an empty initialValues object
        const initialValues = {};
        //loop loop over fields array
        //if prop does not exit in the initialValues object,
        // pluck off the name and value props and add it to the initialValues object;
        inputs.forEach((field, index) => {
            if (glossaryData[index]) {
                const rvalue = JSON.parse(glossaryData[index].rvalue);
                if(!initialValues[field.key]) {
                    initialValues[field.key] = glossaryData[index] ? rvalue.key : '';
                    initialValues[field.value] = glossaryData[index] ? rvalue.value : '';
                }
            }
        });
    
        //return initialValues object
        return initialValues;
    }

    const addInput = () => {
        let currentCount = inputCounter;
        currentCount += 1;

        const inputObj = { key: 'glossaryKey' + currentCount, value: 'glossaryValue' + currentCount };

        setInputCounter(currentCount);
        setInputObject([...inputObject, inputObj]);

        // this.setState({
        //     inputCounter: currentCount,
        //     inputObject: [...this.state.inputObject, inputObj],
        // });
    }

    const deleteRowInputField = (index) => {
        const inputObj = [...inputObject];
        inputObj.splice(index, 1);

        const currentCount = inputObj.length;

        setInputCounter(currentCount);
        setInputObject(inputObj);

        // this.setState({
        //     inputCounter: currentCount,
        //     inputObject: inputObj,
        // });
    }

    const onSave = (object) => {
        console.log(object);
        let glossaryArr = [];

        let keyCount = 1;
        let valueCount = 1;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                if (key.includes("glossaryKey")) {
                    if (object[key] !== "") {
                        if (inputObject[keyCount-1].cmid) {
                            glossaryArr[keyCount-1] = { ...glossaryArr[keyCount-1], key: object[key], cmid: inputObject[keyCount-1].cmid };
                        } else {
                            glossaryArr[keyCount-1] = { ...glossaryArr[keyCount-1], key: object[key] };
                        }
                        keyCount++;
                    } else {
                        keyCount++;
                    }
                } else if (key.includes("glossaryValue")){
                    if (object[key] !== "") {
                        if (inputObject[valueCount-1].cmid) {
                            glossaryArr[valueCount-1] = { ...glossaryArr[valueCount-1], value: object[key], cmid: inputObject[valueCount-1].cmid };
                        } else {
                            glossaryArr[valueCount-1] = { ...glossaryArr[valueCount-1], value: object[key] };
                        }
                        valueCount++;
                    } else {
                        valueCount++;
                    }
                }
            }
        }

        console.log(glossaryArr);

        for ( let i = 0; i < glossaryArr.length; i++) {
            if(glossaryArr[i].cmid) {
                const data = {
                    rvalue: JSON.stringify(glossaryArr[i]),
                }
                
                dispatch(coursemetaActions.updateCoursemeta(data, glossaryArr[i].cmid));
            } else {
                const data = {
                    cid: cid,
                    rkey: 'glossary',
                    rvalue: JSON.stringify(glossaryArr[i]),
                }
            
                dispatch(coursemetaActions.createCoursemeta(data));
            }
        }
        
        // this.props.glossaryHandler(glossaryArr);
        // this.props.addGlossaryEntries(glossaryArr);
        setModalShow(false)
    }

    const initialValues = getInitialValues(inputObject);
    console.log(initialValues);

    const glossaryModal = (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="glossary-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Glossary
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues= {initialValues}

                    onSubmit={values => {
                        console.log(values);
                        console.log(inputObject);
                        onSave(values);
                    }}
                >
                    {props => {
                        const {
                        values,
                        isSubmitting,
                        handleBlur,
                        handleSubmit,
                        handleChange,
                        } = props;
                        return (
                            <div>
                                <button type="button" className="btn btn-success" onClick={addInput}>Add Entry</button>
                                <form onSubmit={handleSubmit}>
                                    <div className="glossary-input-container mt-2">
                                        {inputObject.map((input, index) => (
                                            <div key={input.key + input.value} className="key-value-container row mr-0 ml-0">
                                                <div className="col-md-3 mt-1 mb-1">
                                                    <input
                                                        id={input.key}
                                                        name={input.key}
                                                        type="text"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values[input.key]}
                                                        onBlur={handleBlur}
                                                        placeholder="Term"
                                                    />
                                                </div>
                                                <div className="col-md-8 mt-1 mb-1 pl-0">
                                                    <input
                                                        id={input.value}
                                                        name={input.value}
                                                        type="text"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values[input.value]}
                                                        onBlur={handleBlur}
                                                        placeholder="Definition"
                                                    />
                                                </div>
                                                <div className="col-md-1 mt-1 mb-1 pl-0 pr-0 text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger remove-file-input-row"
                                                        title="Remove"
                                                        onClick={() => {
                                                            deleteRowInputField(index);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faWindowClose} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
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
        <div id="add-glossary-container" className="float-right">
            <label htmlFor="glossaryBtn" className="mr-2">Add Glossary (Optional):</label>
            <button type="button" className="btn btn-outline-dark" onClick={() => setModalShow(true)}>Glossary</button>
            {glossaryModal}
        </div>
    );
}

export default GlossaryHandler;
