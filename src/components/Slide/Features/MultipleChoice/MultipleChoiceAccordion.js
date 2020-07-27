import React, { useState } from 'react';
import { Accordion, Card, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faEdit, faTrash, faCheck, faCaretUp, faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function MultipleChoiceAccordion(props) {

    const index = props.index;
    let item = props.item;
    item.files = item.files.sort((a, b) => (a.weight > b.weight) ? 1 : -1);
    const IsAddAnswer = props.IsAddAnswer;
    const answer = props.answer;

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
    };

    const onDragEnd = result => {
        const { source, destination } = result;
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {

            const reorderedFiles = reorder(
                item.files,
                source.index,
                destination.index
            );

            let files = reorderedFiles;

            for (let key in files) {
                files[key].weight = parseInt(key);
            }

            props.setQuestionFiles(files, index);
        }
    };

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

    return (
        <Accordion key={'accordion-multiple-choicequestion-' + index}>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={index} className="p-2" onClick={() => collapseListener(collapseId)} style={{ cursor: 'pointer' }}>
                    <span>Question no.</span>
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
                                        <div className="multiple-choicecontrol-input-wrapper mb-1 mt-3 mb-3">
                                            <div className="multiple-choicecontrol-input-label">
                                                <span>Add:&nbsp;</span>
                                            </div>
                                            <div className="multiple-choicecontrol-input">
                                                <input
                                                    id="answer"
                                                    name="answer"
                                                    type="text"
                                                    placeholder="Type answer here. . ."
                                                    onChange={(event) => props.setAnswer(event.target.value)}
                                                    value={answer}
                                                />
                                            </div>
                                            <div className="multiple-choicecontrol-button">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        const isEmpty = document.getElementById("answer");
                                                        
                                                        if (isEmpty.value !== "") {
                                                            props.addAnswer(answer, index);
                                                            props.setAnswer('');
                                                            props.setIsAddAnswer(false);
                                                        }
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                                                </button>
                                            </div>
                                        </div>
                                    :
                                        <div className="multiple-choicequestion-action-button mt-3 mb-3">
                                            <button
                                                type="button"
                                                className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                onClick={() => {
                                                    props.setIsAddAnswer(true);
                                                }}
                                            >
                                                Add answers
                                            </button>
                                        </div>
                                }
                                {
                                    item.answers.length > 0 ?
                                        <ul className="multiple-choicequestion-list">
                                            {item.answers.map((item, answerIndex) => (
                                                <li key={Math.random()} className="multiple-choicequestion-list-item mb-3">
                                                    <span key={'multiple-choicefeature-answer-list-item-span-' + answerIndex}>
                                                        <span key={'multiple-choicefeature-answer-list-item-' + answerIndex}>
                                                            {item.answer}&nbsp;
                                                                {
                                                                    item.correct === '' ?
                                                                        <button
                                                                            title="Mark as answer"
                                                                            className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1"
                                                                            onClick={() => {
                                                                                props.setCorrectAnswer(true, index, answerIndex)
                                                                            }}
                                                                        >
                                                                            <FontAwesomeIcon icon={faCheck}/>
                                                                        </button>
                                                                    :
                                                                        item.correct &&
                                                                        <span><FontAwesomeIcon icon={faCheck}/></span>
                                                                }
                                                        </span>
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    :
                                        <div><span>No answer/s added.</span></div>
                                }
                            </Tab>
                            <Tab eventKey="files" title="Files">
                                <div className="multiple-choicequestion-action-button mt-3">
                                    <label className="input-group-btn" style={{ cursor: 'pointer' }}>
                                        <span className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1">
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
                                                        <ul className="multiple-choicequestion-files-list list-unstyled">
                                                            {item.files.map((file, fileIndex) => (
                                                                <Draggable
                                                                    key={'multiple-choicequestion-files-list-item-key-' + fileIndex}
                                                                    draggableId={'multiple-choicequestion-files-list-item-' + fileIndex}
                                                                    index={fileIndex}>
                                                                    {(provided) => (
                                                                        <li
                                                                            className="multiple-choicequestion-files-list-item mt-2"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            {/* <Accordion key={Math.random()}>
                                                                                <Card> */}
                                                                                    <div id="multiple-choicequestion-file-item" className="row mb-0 border rounded-top" onClick={() => accordionClick(collapseAccordion, file)}>
                                                                                        <div className="p-0 col-md-11 pl-0">
                                                                                            {/* <Accordion.Toggle
                                                                                                as={Button}
                                                                                                variant="link"
                                                                                                eventKey="0"
                                                                                                className="text-left p-0 font-15 multiple-choicequestion-file-item-label"
                                                                                            > */}
                                                                                                {file.video && file.video.name}
                                                                                                {file.img && file.img.name}
                                                                                                {file.audio && file.audio.name}
                                                                                            {/* </Accordion.Toggle> */}
                                                                                        </div>
                                                                                        <div
                                                                                            className="col-md-1 p-0 multiple-choicequestion-file-item-delete"
                                                                                            onClick={() => {props.deleteQuestionFile(fileIndex, index); resetLocalStates(file);}}
                                                                                        >
                                                                                            <span><FontAwesomeIcon icon={faTimes}/></span>
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* <Accordion.Collapse eventKey="0">
                                                                                        <Card.Body className="p-1"> */}
                                                                                            {file.video && <label className="input-group-btn" style={{ cursor: 'pointer' }}><span type="button" className="btn btn-primary btn-sm p-0 pl-1 pr-1 ml-2 mb-1">
                                                                                                Add vtt<input type="file" style={{ display: "none"}} onChange={(e) => uploadVtt(e, index)}/>
                                                                                            </span></label>
                                                                                            }
                                                                                            {file.label === "" ?
                                                                                                <>
                                                                                                    {imgAddLabel && file.img ?
                                                                                                        <div className={imgCollapse ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
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
                                                                                                        file.label === "" && file.img &&<div className={imgCollapse ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
                                                                                                            <button type="button" className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1" onClick={() => setImgAddLabel(true)}>Add Label</button>
                                                                                                        </div>
                                                                                                    }
                                                                                                    {audioAddLabel && file.audio ?
                                                                                                        <div className={audioCollapse ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
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
                                                                                                        file.label === "" && file.audio &&<div className={audioCollapse ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
                                                                                                            <button type="button" className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1" onClick={() => setAudioAddLabel(true)}>Add Label</button>
                                                                                                        </div>
                                                                                                    }
                                                                                                    {videoAddLabel && file.video ?
                                                                                                        <div className={videoCollapse ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
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
                                                                                                        <div className={videoCollapse ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
                                                                                                            <button type="button" className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1" onClick={() => setVideoAddLabel(true)}>Add Label</button>
                                                                                                        </div>
                                                                                                    }
                                                                                                </>
                                                                                            :
                                                                                                file.label !== "" &&
                                                                                                <>
                                                                                                    {imgAddLabel && file.img ?
                                                                                                        <div className={imgCollapse ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
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
                                                                                                        <button type="button" className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1" onClick={() => setImgAddLabel(true)}>Add Label</button>
                                                                                                    }
                                                                                                    {audioAddLabel && file.audio ?
                                                                                                        <div className={audioCollapse ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
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
                                                                                                        <button type="button" className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1" onClick={() => setAudioAddLabel(true)}>Add Label</button>
                                                                                                    }
                                                                                                    {videoAddLabel && file.video ?
                                                                                                        <div className={videoCollapse ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
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
                                                                                                        <button type="button" className="btn btn-success btn-sm p-0 pl-1 pr-1 ml-2 mb-1" onClick={() => setVideoAddLabel(true)}>Add Label</button>
                                                                                                    }
                                                                                                </>
                                                                                            }
                                                                                            {file.video && file.video.caption &&
                                                                                                <ul className={collapseAccordion ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
                                                                                                    <li className="multiple-choicequestion-file-item-list-item">
                                                                                                        <div className="row">
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
                                                                                                    <ul className={imgCollapse ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
                                                                                                        <li className="multiple-choicequestion-file-item-list-item">
                                                                                                            <div className="row">
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
                                                                                                    <ul className={audioCollapse ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
                                                                                                        <li className="multiple-choicequestion-file-item-list-item">
                                                                                                            <div className="row">
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
                                                                                                    <ul className={videoCollapse ? "sg-accordion multiple-choicequestion-action-button border border-top-0 py-3 px-1" : "d-none multiple-choicequestion-action-button border py-3 px-1"}>
                                                                                                        <li className="multiple-choicequestion-file-item-list-item">
                                                                                                            <div className="row">
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
                                                                                        {/* </Card.Body> */}
                                                                                    {/* </Accordion.Collapse> */}
                                                                                {/* </Card> */}
                                                                            {/* </Accordion> */}
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
