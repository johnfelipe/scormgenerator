import React, { useState, useEffect } from 'react';
import { Accordion, Card, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEdit, faTrash, faCaretUp, faCaretDown, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import MultiSelect from "react-multi-select-component";

function MultipleChoiceAccordion(props) {

    let item = props.item;
    item.files = item.files.sort((a, b) => (a.weight > b.weight) ? 1 : -1);
    const { index, IsAddAnswer, answer, contentIndex, correctAnswers } = props;

    const [editAnswer, setEditAnswer] = useState('');
    const [editAnswerCompareIndex, setEditAnswerCompareIndex] = useState('');
    const [isEditAnswer, setIsEditAnswer] = useState(false);
    const [imgAddLabel, setImgAddLabel] = useState(false);
    const [imgLabel, setImgLabel] = useState('');
    const [audioAddLabel, setAudioAddLabel] = useState(false);
    const [audioLabel, setAudioLabel] = useState('');
    const [videoAddLabel, setVideoAddLabel] = useState(false);
    const [videoLabel, setVideoLabel] = useState('');
    const [collapseId, setCollapseId] = useState(false);
    const [collapseAccordion,  setCollapseAccordion] = useState(false);
    const [imgCollapse,  setImgCollapse] = useState(false);
    const [audioCollapse,  setAudioCollapse] = useState(false);
    const [videoCollapse,  setVideoCollapse] = useState(false);
    // const [isCorrectAnswerSet, setIsCorrectAnswerSet] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState(correctAnswers ? correctAnswers : []);

    const collapseListener = (currentCollapseId) => {

        if (currentCollapseId) {
            currentCollapseId = false;
        } else {
            currentCollapseId = true;
        }

        setCollapseId(currentCollapseId);
    }

    const handleFileChange = (e, index) => {
        e.preventDefault();
        let files = e.target.files;
        let reader = new FileReader();

        if (files[0] !== undefined) {
            reader.readAsDataURL(files[0])
            reader.onloadend = () => {

                if (~files[0].type.indexOf('image')) {
                    const imgObj = {
                        name: files[0].name,
                        size: files[0].size,
                        type: files[0].type,
                        url: reader.result,
                        lastModified: files[0].lastModified,
                    }
        
                    props.addImageQuestion(imgObj, index);
                } else if (~files[0].type.indexOf('audio')) {
                    const audioObj = {
                        name: files[0].name,
                        size: files[0].size,
                        type: files[0].type,
                        url: reader.result,
                        lastModified: files[0].lastModified,
                    }
        
                    props.addAudioQuestion(audioObj, index);
                } else if (~files[0].type.indexOf('video')) {
                    const videoObj = {
                        name: files[0].name,
                        size: files[0].size,
                        type: files[0].type,
                        url: reader.result,
                        lastModified: files[0].lastModified,
                        caption: '',
                    }
        
                    props.addVideoQuestion(videoObj, index);
                } else if (files[0].type === "") {
                    const fileExt = files[0].name.split(".");

                    if (fileExt[1] === 'vtt') {
                        // const captionUrl = reader.result;
            
                        // props.addVideoQuestionCaption(captionUrl, index);

                        alert("Cannot upload .vtt files here.")
                    }
                }

                props.setFilesExist(true);
            }
        }
    }

    const uploadVtt = (e, index) => {
        e.preventDefault();
        let files = e.target.files;
        let reader = new FileReader();

        reader.readAsDataURL(files[0])
        reader.onloadend = () => {

            if (files[0].type === "") {
                const fileExt = files[0].name.split(".");

                if (fileExt[1] === 'vtt') {
                    const captionObj = {
                        name: files[0].name,
                        size: files[0].size,
                        type: fileExt[1],
                        url: reader.result,
                        lastModified: files[0].lastModified,
                    }
        
                    props.addVideoQuestionCaption(captionObj, index);
                }
            }
        }
    }

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    }

    const onDragEnd = result => {
        const { source, destination } = result;
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            let reorderedFiles;

            if ((source.droppableId === 'files-droppable') && (destination.droppableId === 'files-droppable')) {
                reorderedFiles = reorder(
                    item.files,
                    source.index,
                    destination.index
                );

                let files = reorderedFiles;

                for (let key in files) {
                    files[key].weight = parseInt(key);
                }

                props.setQuestionFiles(files, index);
            } else if ((source.droppableId === 'answers-droppable') && (destination.droppableId === 'answers-droppable')) {
                reorderedFiles = reorder(
                    item.answers,
                    source.index,
                    destination.index
                );

                let answers = reorderedFiles;

                props.setQuestionAnswers(answers, index);
            }

            
        }
    }

    const resetLocalStates = (file) => {
        if (file.img) {
            setImgAddLabel(false);
            setImgLabel('');
        } else if (file.audio) {
            setAudioAddLabel(false);
            setAudioLabel('');
        } else if (file.video) {
            setVideoAddLabel(false);
            setVideoLabel('');
        }
    }

    const accordionClick = (value, file) => {

        if (file.img) {
            if (value) {
                value = false;
            } else {
                value = true;
            }
            setImgCollapse(value);
        } else if (file.audio) {
            if (value) {
                value = false;
            } else {
                value = true;
            }
            setAudioCollapse(value);
        } else if (file.video) {
            if (value) {
                value = false;
            } else {
                value = true;
            }
            setVideoCollapse(value);
        }

        setCollapseAccordion(value);
    }

    const answerOptions = () => {
        const options = [];
        const answerArray = item.answers;

        for (let key in answerArray) {
            options.push({label: answerArray[key].answer, value: key});
        }

        return options;

        // setSelectOptions(options);
    }
    
    const selectOptions = answerOptions();

    useEffect(() => {
        let list = document.getElementsByClassName("dropdown-heading-value");
        if (list[0]) {
            list[0].innerHTML = "Select answer";
        }
    });

    return (
        <Accordion key={'accordion-multiple-choice-question-' + index}>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={index} className="p-2" onClick={() => collapseListener(collapseId)} style={{ cursor: 'pointer' }}>
                    <span>Question </span>
                    <span>&nbsp;{index+1}</span>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm p-0 pl-1 pr-1 ml-2 mb-1 float-right"
                        onClick={() => {
                            props.deleteQuestion(index)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1 float-right"
                        onClick={() => {
                            props.setIsEditQuestion(true);
                            props.setUpdateQuestion(item.question);
                            props.setUpdateQuestionCompareIndex(index);
                        }}
                    >
                        <FontAwesomeIcon icon={faEdit}/>
                    </button>
                    <span className="float-right mr-2">
                        <FontAwesomeIcon icon={collapseId === true ? faCaretUp : faCaretDown}/>
                    </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                    <Card.Body className="p-2">
                        <span>Question: <strong>{item.question}</strong></span>
                        <Tabs defaultActiveKey="answers" id="question-answers-files-tabs">
                            <Tab eventKey="answers" title="Answers">
                                {
                                    IsAddAnswer ?
                                        <div className="multiple-choice-control-input-wrapper mb-1 mt-3 mb-3">
                                            <div className="multiple-choice-control-input-label">
                                                <span>Add:&nbsp;</span>
                                            </div>
                                            <div className="multiple-choice-control-input">
                                                <input
                                                    id="answer"
                                                    name="answer"
                                                    type="text"
                                                    placeholder="Type answer here. . ."
                                                    onChange={(event) => props.setAnswer(event.target.value)}
                                                    value={answer}
                                                />
                                            </div>
                                            <div className="multiple-choice-control-button">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm mr-1"
                                                    onClick={() => {
                                                        const isEmpty = document.getElementById("answer");
                                                        
                                                        if (isEmpty.value !== "") {
                                                            // if (isCorrectAnswerSet) {
                                                                // props.addAnswer(answer, index, false);
                                                            // } else {
                                                                props.addAnswer(answer, index, false);
                                                            // }
                                                            props.setAnswer('');
                                                            props.setIsAddAnswer(false);
                                                        }
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => {
                                                        props.setAnswer('');
                                                        props.setIsAddAnswer(false);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTimes}/>
                                                </button>
                                            </div>
                                        </div>
                                    :
                                        <div className="multiple-choice-question-action-button m-0 mt-2 mb-2 row">
                                            <div className="col-md-6 p-0">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        props.setIsAddAnswer(true);
                                                    }}
                                                >
                                                    Add answers
                                                </button>
                                            </div>
                                            <div className="col-md-6 p-0">
                                                {item.answers.length > 0 &&
                                                    <OverlayTrigger
                                                        key="top"
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id='tooltip-top'>
                                                                <span>Select one or more correct answer.</span>
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <MultiSelect
                                                            options={selectOptions}
                                                            value={selectedAnswers}
                                                            onChange={(e) => {
                                                                setSelectedAnswers(e);
                                                                props.setCorrectAnswer(true, index, e);
                                                                sessionStorage.setItem("selectedAnswers", JSON.stringify(e));
                                                            }}
                                                            labelledBy={"Select"}
                                                            disableSearch={true}
                                                        />
                                                    </OverlayTrigger>
                                                }
                                            </div>
                                        </div>
                                }
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="answers-droppable">
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {
                                                    item.answers.length > 0 ?
                                                        <ul className="multiple-choice-question-list list-unstyled">
                                                            {item.answers.map((item, answerIndex) => (
                                                                <Draggable
                                                                    key={'multiple-choice-question-answers-list-item-key-' + answerIndex}
                                                                    draggableId={'multiple-choice-question-answers-list-item-' + answerIndex}
                                                                    index={answerIndex}
                                                                >
                                                                    {(provided) => (
                                                                        <li
                                                                            className="multiple-choice-question-list-item mb-3"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            {
                                                                                isEditAnswer && editAnswerCompareIndex === answerIndex ?
                                                                                    <div className="multiple-choice-control-input-wrapper mb-1 mt-3 mb-3">
                                                                                        <div className="multiple-choice-control-input-label">
                                                                                            <span>Edit:&nbsp;</span>
                                                                                        </div>
                                                                                        <div className="multiple-choice-control-input">
                                                                                            <input
                                                                                                id="answer"
                                                                                                name="answer"
                                                                                                type="text"
                                                                                                placeholder="Type answer here. . ."
                                                                                                onChange={(event) => setEditAnswer(event.target.value)}
                                                                                                value={editAnswer}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="multiple-choice-control-button">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-success btn-sm mr-1"
                                                                                                onClick={() => {
                                                                                                    const isEmpty = document.getElementById("answer");
                                                                                                    
                                                                                                    if (isEmpty.value !== "") {
                                                                                                        props.editAnswer(editAnswer, index, answerIndex);
                                                                                                        setEditAnswer('');
                                                                                                        setIsEditAnswer(false);
                                                                                                        setEditAnswerCompareIndex('');
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                                                            </button>
                                                                                            {/* <button
                                                                                                type="button"
                                                                                                className="btn btn-danger btn-sm"
                                                                                                onClick={() => {
                                                                                                    const isEmpty = document.getElementById("answer");
                                                                                                    
                                                                                                    if (isEmpty.value !== "") {
                                                                                                        setEditAnswer('');
                                                                                                        setIsEditAnswer(false);
                                                                                                        setEditAnswerCompareIndex('');
                                                                                                    }
                                                                                                }}
                                                                                            >
                                                                                                <FontAwesomeIcon icon={faTimes}/>
                                                                                            </button> */}
                                                                                        </div>
                                                                                    </div>
                                                                                :
                                                                                    <div id="multiple-choice-feature-answer-list-item" className="row mb-0 border rounded">
                                                                                        <div id="multiple-choice-feature-answer-list-item-answer" className="p-0 col-md-7" title={item.answer}>
                                                                                            {item.answer}
                                                                                        </div>
                                                                                        <div className="col-md-5 p-0 multiple-choice-feature-answer-list-item-action-buttons text-right">
                                                                                            {/* {
                                                                                                item.correct === '' ?
                                                                                                    <button
                                                                                                        title="Mark as answer"
                                                                                                        className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                                                                        type="button"
                                                                                                        onClick={() => {
                                                                                                            props.setCorrectAnswer(true, index, answerIndex);
                                                                                                            setIsCorrectAnswerSet(true);
                                                                                                        }}
                                                                                                    >
                                                                                                        <FontAwesomeIcon icon={faCheck}/>
                                                                                                    </button>
                                                                                                :
                                                                                                    item.correct &&
                                                                                                    <span title="Marked correct answer"><FontAwesomeIcon icon={faCheck}/></span>
                                                                                            } */}
                                                                                            <button
                                                                                                className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                                                                type="button"
                                                                                                onClick={() => {
                                                                                                    setEditAnswer(item.answer);
                                                                                                    setIsEditAnswer(true);
                                                                                                    setEditAnswerCompareIndex(answerIndex);
                                                                                                }}
                                                                                            >
                                                                                                <FontAwesomeIcon icon={faEdit}/>
                                                                                            </button>
                                                                                            <button
                                                                                                className="btn btn-danger btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                                                                type="button"
                                                                                                onClick={() => {
                                                                                                    props.deleteAnswer(index, answerIndex);
                                                                                                }}
                                                                                            >
                                                                                                <FontAwesomeIcon icon={faTrash}/>
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                            }
                                                                        </li>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                        </ul>
                                                    :
                                                        <div><span>No answer/s added.</span></div>
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </Tab>
                            <Tab eventKey="explanation" title="Explanation">
                                {
                                    item.explanation.content ?
                                        <div className="mt-2">
                                            <div id="explanation-action-buttons" className="mb-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        props.setShowTextEditor(true, contentIndex, 'mChoiceExplanation');
                                                        props.setMChoiceIndex(index);
                                                    }}
                                                >
                                                    Edit explanation
                                                </button>
                                                {
                                                    item.explanation.visibility === 'show' ?
                                                        <button
                                                            title="Hide"
                                                            type="button"
                                                            className="btn btn-primary btn-sm float-right"
                                                            onClick={() => {
                                                                props.setExplanationVisibility('hide', index);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faEyeSlash}/>
                                                        </button>
                                                    :
                                                        <button
                                                            title="Show"
                                                            type="button"
                                                            className="btn btn-primary btn-sm float-right"
                                                            onClick={() => {
                                                                props.setExplanationVisibility('show', index);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faEye}/>
                                                        </button>
                                                }
                                            </div>
                                            <span>{item.explanation.content}</span>
                                        </div>
                                    :
                                        <div className="multiple-choice-explanation-action-button mt-2 mb-2">
                                            <button
                                                type="button"
                                                className="btn btn-success btn-sm mb-2"
                                                onClick={() => {
                                                    props.setShowTextEditor(true, contentIndex, 'mChoiceExplanation');
                                                    props.setMChoiceIndex(index);
                                                }}
                                            >
                                                Add explanation
                                            </button>
                                            <div>
                                                <span>No explanation added.</span>
                                            </div>
                                        </div>
                                }
                            </Tab>
                            <Tab eventKey="files" title="Files">
                                <div className="multiple-choice-question-action-button mt-2">
                                    <label className="input-group-btn" style={{ cursor: 'pointer' }}>
                                        <span className="btn btn-primary btn-sm">
                                            Add files<input type="file" id="question-files-uploader" style={{ display: "none"}} onChange={(e) => handleFileChange(e, index)}/>
                                        </span>
                                    </label>
                                </div>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="files-droppable">
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {
                                                    item.files.length > 0 ?
                                                        <ul className="multiple-choice-question-files-list list-unstyled">
                                                            {item.files.map((file, fileIndex) => (
                                                                <Draggable
                                                                    key={'multiple-choice-question-files-list-item-key-' + fileIndex}
                                                                    draggableId={'multiple-choice-question-files-list-item-' + fileIndex}
                                                                    index={fileIndex}
                                                                >
                                                                    {(provided) => (
                                                                        <li
                                                                            className="multiple-choice-question-files-list-item mt-2"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            <div id="multiple-choice-question-file-item" className="row mb-0 border rounded-top" onClick={() => accordionClick(collapseAccordion, file)}>
                                                                                <div className="p-0 col-md-11 pl-0">
                                                                                    {file.video && file.video.name}
                                                                                    {file.img && file.img.name}
                                                                                    {file.audio && file.audio.name}
                                                                                </div>
                                                                                <div
                                                                                    className="col-md-1 p-0 multiple-choice-question-file-item-delete"
                                                                                    onClick={() => {props.deleteQuestionFile(fileIndex, index); resetLocalStates(file);}}
                                                                                >
                                                                                    <span><FontAwesomeIcon icon={faTimes}/></span>
                                                                                </div>
                                                                            </div>
                                                                            {file.video && <label className="input-group-btn" style={{ cursor: 'pointer' }}><span type="button" className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1">
                                                                                Add vtt<input type="file" style={{ display: "none"}} onChange={(e) => uploadVtt(e, index)}/>
                                                                            </span></label>
                                                                            }
                                                                            {file.label === "" ?
                                                                                <>
                                                                                    {imgAddLabel && file.img ?
                                                                                        <div className={imgCollapse ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                            <div className="img-add-label-wrapper text-center">
                                                                                                <div className="img-add-label-label d-inline mr-2">
                                                                                                    <span>Label:</span>
                                                                                                </div>
                                                                                                <div className="img-add-label-input d-inline">
                                                                                                    <input
                                                                                                        id="imgLabel"
                                                                                                        name="imgLabel"
                                                                                                        type="text"
                                                                                                        placeholder="Type label here. . ."
                                                                                                        onChange={(event) => setImgLabel(event.target.value)}
                                                                                                        value={imgLabel}
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="img-add-label-button d-inline ml-2">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-success btn-sm pl-1 pr-1"
                                                                                                        onClick={() => {
                                                                                                            props.addFileLabel(imgLabel, index, fileIndex);
                                                                                                            setImgAddLabel(false);
                                                                                                            setImgLabel('');
                                                                                                        }}
                                                                                                    >
                                                                                                        <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-12"/>
                                                                                                    </button>
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-danger btn-sm ml-2 pl-1 pr-1"
                                                                                                        onClick={() => {
                                                                                                            setImgAddLabel(false);
                                                                                                            setImgLabel('');
                                                                                                        }}
                                                                                                    >
                                                                                                        <FontAwesomeIcon icon={faTimes} className="fa-w-12"/>
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    :
                                                                                        file.label === "" && file.img &&<div className={imgCollapse ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                            <button type="button" className="btn btn-success btn-sm ml-2" onClick={() => setImgAddLabel(true)}>Add Label</button>
                                                                                        </div>
                                                                                    }
                                                                                    {audioAddLabel && file.audio ?
                                                                                        <div className={audioCollapse ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                            <div className="img-add-label-wrapper text-center">
                                                                                            <div className="img-add-label-label d-inline mr-2">
                                                                                                <span>Label:</span>
                                                                                            </div>
                                                                                            <div className="img-add-label-input d-inline">
                                                                                                <input
                                                                                                    id="audioLabel"
                                                                                                    name="audioLabel"
                                                                                                    type="text"
                                                                                                    placeholder="Type label here. . ."
                                                                                                    onChange={(event) => setAudioLabel(event.target.value)}
                                                                                                    value={audioLabel}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="img-add-label-button d-inline ml-2">
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="btn btn-success btn-sm pl-1 pr-1"
                                                                                                    onClick={() => {
                                                                                                        props.addFileLabel(audioLabel, index, fileIndex);
                                                                                                        setAudioAddLabel(false);
                                                                                                        setAudioLabel('');
                                                                                                    }}
                                                                                                >
                                                                                                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-12"/>
                                                                                                </button>
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="btn btn-danger btn-sm ml-2 pl-1 pr-1"
                                                                                                    onClick={() => {
                                                                                                        setAudioAddLabel(false);
                                                                                                        setAudioLabel('');
                                                                                                    }}
                                                                                                >
                                                                                                    <FontAwesomeIcon icon={faTimes} className="fa-w-12"/>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        </div>
                                                                                    :
                                                                                        file.label === "" && file.audio &&<div className={audioCollapse ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                            <button type="button" className="btn btn-success btn-sm ml-2" onClick={() => setAudioAddLabel(true)}>Add Label</button>
                                                                                        </div>
                                                                                    }
                                                                                    {videoAddLabel && file.video ?
                                                                                        <div className={videoCollapse ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                            <div className="img-add-label-wrapper text-center">
                                                                                            <div className="img-add-label-label d-inline mr-2">
                                                                                                <span>Label:</span>
                                                                                            </div>
                                                                                            <div className="img-add-label-input d-inline">
                                                                                                <input
                                                                                                    id="videoLabel"
                                                                                                    name="videoLabel"
                                                                                                    type="text"
                                                                                                    placeholder="Type label here. . ."
                                                                                                    onChange={(event) => setVideoLabel(event.target.value)}
                                                                                                    value={videoLabel}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="img-add-label-button d-inline ml-2">
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="btn btn-success btn-sm pl-1 pr-1"
                                                                                                    onClick={() => {
                                                                                                        props.addFileLabel(videoLabel, index, fileIndex);
                                                                                                        setVideoAddLabel(false);
                                                                                                        setVideoLabel('');
                                                                                                    }}
                                                                                                >
                                                                                                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-12"/>
                                                                                                </button>
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="btn btn-danger btn-sm ml-2 pl-1 pr-1"
                                                                                                    onClick={() => {
                                                                                                        setVideoAddLabel(false);
                                                                                                        setVideoLabel('');
                                                                                                    }}
                                                                                                >
                                                                                                    <FontAwesomeIcon icon={faTimes} className="fa-w-12"/>
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                        </div>
                                                                                    :
                                                                                        file.label === "" && file.video &&
                                                                                        <div className={videoCollapse ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                            <button type="button" className="btn btn-success btn-sm ml-1" onClick={() => setVideoAddLabel(true)}>Add Label</button>
                                                                                        </div>
                                                                                    }
                                                                                </>
                                                                            :
                                                                                file.label !== "" &&
                                                                                <>
                                                                                    {imgAddLabel && file.img ?
                                                                                        <div className={imgCollapse ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                            <div className="img-add-label-wrapper text-center">
                                                                                                <div className="img-add-label-label d-inline mr-2">
                                                                                                    <span>Label:</span>
                                                                                                </div>
                                                                                                <div className="img-add-label-input d-inline">
                                                                                                    <input
                                                                                                        id="imgLabel"
                                                                                                        name="imgLabel"
                                                                                                        type="text"
                                                                                                        placeholder="Type label here. . ."
                                                                                                        onChange={(event) => setImgLabel(event.target.value)}
                                                                                                        value={imgLabel}
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="img-add-label-button d-inline ml-2">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-success btn-sm pl-1 pr-1"
                                                                                                        onClick={() => {
                                                                                                            props.editFileLabel(imgLabel, index, fileIndex);
                                                                                                            setImgAddLabel(false);
                                                                                                            setImgLabel('');
                                                                                                        }}
                                                                                                    >
                                                                                                        <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-12"/>
                                                                                                    </button>
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-danger btn-sm ml-2 pl-1 pr-1"
                                                                                                        onClick={() => {
                                                                                                            setImgAddLabel(false);
                                                                                                            setImgLabel('');
                                                                                                        }}
                                                                                                    >
                                                                                                        <FontAwesomeIcon icon={faTimes} className="fa-w-12"/>
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    :
                                                                                        file.label === "" && file.img && 
                                                                                        <button type="button" className="btn btn-success btn-sm ml-2" onClick={() => setImgAddLabel(true)}>Add Label</button>
                                                                                    }
                                                                                    {audioAddLabel && file.audio ?
                                                                                        <div className={audioCollapse ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                            <div className="img-add-label-wrapper text-center">
                                                                                                <div className="img-add-label-label d-inline mr-2">
                                                                                                    <span>Label:</span>
                                                                                                </div>
                                                                                                <div className="img-add-label-input d-inline">
                                                                                                    <input
                                                                                                        id="audioLabel"
                                                                                                        name="audioLabel"
                                                                                                        type="text"
                                                                                                        placeholder="Type label here. . ."
                                                                                                        onChange={(event) => setAudioLabel(event.target.value)}
                                                                                                        value={audioLabel}
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="img-add-label-button d-inline ml-2">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-success btn-sm pl-1 pr-1"
                                                                                                        onClick={() => {
                                                                                                            props.addFileLabel(audioLabel, index, fileIndex);
                                                                                                            setAudioAddLabel(false);
                                                                                                            setAudioLabel('');
                                                                                                        }}
                                                                                                    >
                                                                                                        <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-12"/>
                                                                                                    </button>
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-danger btn-sm ml-2 pl-1 pr-1"
                                                                                                        onClick={() => {
                                                                                                            setAudioAddLabel(false);
                                                                                                            setAudioLabel('');
                                                                                                        }}
                                                                                                    >
                                                                                                        <FontAwesomeIcon icon={faTimes} className="fa-w-12"/>
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    :
                                                                                        file.label === "" && file.audio && 
                                                                                        <button type="button" className="btn btn-success btn-sm ml-2" onClick={() => setAudioAddLabel(true)}>Add Label</button>
                                                                                    }
                                                                                    {videoAddLabel && file.video ?
                                                                                        <div className={videoCollapse ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                            <div className="img-add-label-wrapper text-center">
                                                                                                <div className="img-add-label-label d-inline mr-2">
                                                                                                    <span>Label:</span>
                                                                                                </div>
                                                                                                <div className="img-add-label-input d-inline">
                                                                                                    <input
                                                                                                        id="videoLabel"
                                                                                                        name="videoLabel"
                                                                                                        type="text"
                                                                                                        placeholder="Type label here. . ."
                                                                                                        onChange={(event) => setVideoLabel(event.target.value)}
                                                                                                        value={videoLabel}
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="img-add-label-button d-inline ml-2">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-success btn-sm pl-1 pr-1"
                                                                                                        onClick={() => {
                                                                                                            props.addFileLabel(videoLabel, index, fileIndex);
                                                                                                            setVideoAddLabel(false);
                                                                                                            setVideoLabel('');
                                                                                                        }}
                                                                                                    >
                                                                                                        <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-12"/>
                                                                                                    </button>
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-danger btn-sm ml-2 pl-1 pr-1"
                                                                                                        onClick={() => {
                                                                                                            setVideoAddLabel(false);
                                                                                                            setVideoLabel('');
                                                                                                        }}
                                                                                                    >
                                                                                                        <FontAwesomeIcon icon={faTimes} className="fa-w-12"/>
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    :
                                                                                        file.label === "" && file.video && 
                                                                                        <button type="button" className="btn btn-success btn-sm ml-2" onClick={() => setVideoAddLabel(true)}>Add Label</button>
                                                                                    }
                                                                                </>
                                                                            }
                                                                            {file.video && file.video.caption &&
                                                                                <ul className={collapseAccordion ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                    <li className="multiple-choice-question-file-item-list-item">
                                                                                        <div className="row m-0">
                                                                                            <div className="col-md-10">{file.video.caption.name}</div>
                                                                                            <div className="col-md-2 pl-2" onClick={() => {props.deleteQuestionVideoVttFile(index)}}>
                                                                                                <span><FontAwesomeIcon icon={faTimes}/></span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            }
                                                                            {file.label &&
                                                                                <>
                                                                                    {file.img && imgAddLabel === false &&
                                                                                    <ul className={imgCollapse ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                        <li className="multiple-choice-question-file-item-list-item">
                                                                                            <div className="row m-0">
                                                                                                <div className="col-md-8">{file.label}</div>
                                                                                                <div
                                                                                                    className="col-md-2 pl-2 pr-2"
                                                                                                    onClick={() => {
                                                                                                        if (file.img) { 
                                                                                                            setImgAddLabel(true);
                                                                                                            setImgLabel(file.label);
                                                                                                        } else if (file.audio) { 
                                                                                                            setAudioAddLabel(true);
                                                                                                            setAudioLabel(file.label);
                                                                                                        } else if (file.video) { 
                                                                                                            setVideoAddLabel(true);
                                                                                                            setVideoLabel(file.label);
                                                                                                        }
                                                                                                    }}
                                                                                                >
                                                                                                    <span><FontAwesomeIcon icon={faEdit}/></span>
                                                                                                </div>
                                                                                                <div className="col-md-2 pl-2 pr-2" onClick={() => {props.deleteFileLabel(index, fileIndex)}}>
                                                                                                    <span><FontAwesomeIcon icon={faTrash}/></span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                    </ul>
                                                                                    }
                                                                                    {file.audio && audioAddLabel === false &&
                                                                                    <ul className={audioCollapse ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                        <li className="multiple-choice-question-file-item-list-item">
                                                                                            <div className="row m-0">
                                                                                                <div className="col-md-8">{file.label}</div>
                                                                                                <div
                                                                                                    className="col-md-2 pl-2 pr-2"
                                                                                                    onClick={() => {
                                                                                                        if (file.img) { 
                                                                                                            setImgAddLabel(true);
                                                                                                            setImgLabel(file.label);
                                                                                                        } else if (file.audio) { 
                                                                                                            setAudioAddLabel(true);
                                                                                                            setAudioLabel(file.label);
                                                                                                        } else if (file.video) { 
                                                                                                            setVideoAddLabel(true);
                                                                                                            setVideoLabel(file.label);
                                                                                                        }
                                                                                                    }}
                                                                                                >
                                                                                                    <span><FontAwesomeIcon icon={faEdit}/></span>
                                                                                                </div>
                                                                                                <div className="col-md-2 pl-2 pr-2" onClick={() => {props.deleteFileLabel(index, fileIndex)}}>
                                                                                                    <span><FontAwesomeIcon icon={faTrash}/></span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                    </ul>
                                                                                    }
                                                                                    {file.video && videoAddLabel === false &&
                                                                                    <ul className={videoCollapse ? "sg-accordion multiple-choice-question-action-button border border-top-0 py-2 px-1" : "d-none multiple-choice-question-action-button border py-2 px-1"}>
                                                                                        <li className="multiple-choice-question-file-item-list-item">
                                                                                            <div className="row m-0">
                                                                                                <div className="col-md-8">{file.label}</div>
                                                                                                <div
                                                                                                    className="col-md-2 pl-2 pr-2"
                                                                                                    onClick={() => {
                                                                                                        if (file.img) { 
                                                                                                            setImgAddLabel(true);
                                                                                                            setImgLabel(file.label);
                                                                                                        } else if (file.audio) { 
                                                                                                            setAudioAddLabel(true);
                                                                                                            setAudioLabel(file.label);
                                                                                                        } else if (file.video) { 
                                                                                                            setVideoAddLabel(true);
                                                                                                            setVideoLabel(file.label);
                                                                                                        }
                                                                                                    }}
                                                                                                >
                                                                                                    <span><FontAwesomeIcon icon={faEdit}/></span>
                                                                                                </div>
                                                                                                <div className="col-md-2 pl-2 pr-2" onClick={() => {props.deleteFileLabel(index, fileIndex)}}>
                                                                                                    <span><FontAwesomeIcon icon={faTrash}/></span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                    </ul>
                                                                                    }
                                                                                </>
                                                                            }
                                                                        </li>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                        </ul>
                                                    :
                                                        <div><span>No file/s added.</span></div>
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default MultipleChoiceAccordion;
