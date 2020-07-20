import React, { useState } from 'react';
import { objectHelpers } from '../../../helpers';
import ReactAudioPlayer from 'react-audio-player';
import { Player, ControlBar, ClosedCaptionButton } from 'video-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faTimes } from '@fortawesome/free-solid-svg-icons';

function QuizMultipleLayout(props) {
    
    const quiz = props.quiz;
    const quizClass = props.quizClass;
    const alpbahet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const quizStyles = props.quizStyles;
    const currentColumn = props.currentColumn;
    const contentIndex = props.contentIndex;
    const currentColumnContentIndex = props.currentColumnContentIndex;
    const [imgAddLabel, setImgAddLabel] = useState(false);
    const [audioAddLabel, setAudioAddLabel] = useState(false);
    const [videoAddLabel, setVideoAddLabel] = useState(false);
    const [imgLabel, setImgLabel] = useState('');
    const [audioLabel, setAudioLabel] = useState('');
    const [videoLabel, setVideoLabel] = useState('');

    const addImageLabel = (value, fileIndex, questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[fileIndex].label = value;

        props.setColumn(currentColumnObj);
        setImgLabel('');
    }

    const addAudioLabel = (value, fileIndex, questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[fileIndex].label = value;

        props.setColumn(currentColumnObj);
        setAudioLabel('');
    }

    const addVideoLabel = (value, fileIndex, questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[fileIndex].label = value;

        props.setColumn(currentColumnObj);
        setVideoLabel('');
    }

    const content = (item, quizClass, itemIndex) => {
        if (quizClass === 'question-files-left') {
            if ((objectHelpers.doesObjectInArrayExist(item.files, 'audio') === true) && (objectHelpers.doesObjectInArrayExist(item.files, 'img') === true)) {
                const audioIndex = objectHelpers.findObjectIndexInArray(item.files, 'audio');
                const imgIndex = objectHelpers.findObjectIndexInArray(item.files, 'img');
                
                return (
                    <>
                        <div className="col-md-4">
                            {
                                item.files[imgIndex].weight === 0 || item.files[audioIndex].weight === 1 ?
                                    <>
                                        <img src={item.files[imgIndex].img.url} className="w-100 h-auto" alt={item.files[imgIndex].label}/>
                                        {
                                            item.files[imgIndex].label ?
                                                <div className="mt-2 text-center">
                                                    <span className="font-15">{item.files[imgIndex].label}</span>
                                                </div>
                                            :
                                                imgAddLabel ? 
                                                    <div className="img-add-label-wrapper mt-2">
                                                        <div className="img-add-label-label d-inline mr-3">
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
                                                                className="btn btn-success btn-sm"
                                                                onClick={() => {
                                                                    addImageLabel(imgLabel, imgIndex, itemIndex);
                                                                    setImgAddLabel(false);
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-16"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm ml-2"
                                                                onClick={() => {
                                                                    setImgAddLabel(false);
                                                                    setImgLabel('');
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faTimes} className="fa-w-16"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                :
                                                    <button type="button" className="btn btn-success btn-sm my-2" onClick={() => setImgAddLabel(true)}>Add Label</button>
                                        }
                                        <ReactAudioPlayer
                                            src={item.files[audioIndex].audio.url}
                                            controls
                                            title={item.files[audioIndex].audio.name}
                                            className="mt-3 w-100"
                                            id="audio-question-player"
                                        />
                                        {
                                            item.files[audioIndex].label ?
                                                <div className="mt-2 text-center">
                                                    <span className="font-15">{item.files[audioIndex].label}</span>
                                                </div>
                                            :
                                                audioAddLabel ? 
                                                    <div className="audio-add-label-wrapper mt-2">
                                                        <div className="audio-add-label-label d-inline mr-3">
                                                            <span>Label:</span>
                                                        </div>
                                                        <div className="audio-add-label-input d-inline">
                                                            <input
                                                                id="audioLabel"
                                                                name="audioLabel"
                                                                type="text"
                                                                placeholder="Type label here. . ."
                                                                onChange={(event) => setAudioLabel(event.target.value)}
                                                                value={audioLabel}
                                                            />
                                                        </div>
                                                        <div className="audio-add-label-button d-inline ml-2">
                                                            <button
                                                                type="button"
                                                                className="btn btn-success btn-sm"
                                                                onClick={() => {
                                                                    addAudioLabel(audioLabel, audioIndex, itemIndex);
                                                                    setAudioAddLabel(false);
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-16"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm ml-2"
                                                                onClick={() => {
                                                                    setAudioAddLabel(false);
                                                                    setAudioLabel('');
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faTimes} className="fa-w-16"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                :
                                                    <button type="button" className="btn btn-success btn-sm my-2" onClick={() => setAudioAddLabel(true)}>Add Label</button>
                                        }
                                    </>
                                :
                                    <>
                                        <ReactAudioPlayer
                                            src={item.files[audioIndex].audio.url}
                                            controls
                                            title={item.files[audioIndex].audio.name}
                                            className="mt-3 w-100"
                                            id="audio-question-player"
                                        />
                                        {
                                            item.files[audioIndex].label ?
                                                <div className="mt-2 text-center">
                                                    <span className="font-15">{item.files[audioIndex].label}</span>
                                                </div>
                                            :
                                                audioAddLabel ? 
                                                    <div className="audio-add-label-wrapper mt-2">
                                                        <div className="audio-add-label-label d-inline mr-3">
                                                            <span>Label:</span>
                                                        </div>
                                                        <div className="audio-add-label-input d-inline">
                                                            <input
                                                                id="audioLabel"
                                                                name="audioLabel"
                                                                type="text"
                                                                placeholder="Type label here. . ."
                                                                onChange={(event) => setAudioLabel(event.target.value)}
                                                                value={audioLabel}
                                                            />
                                                        </div>
                                                        <div className="audio-add-label-button d-inline ml-2">
                                                            <button
                                                                type="button"
                                                                className="btn btn-success btn-sm"
                                                                onClick={() => {
                                                                    addAudioLabel(audioLabel, audioIndex, itemIndex);
                                                                    setAudioAddLabel(false);
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-16"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm ml-2"
                                                                onClick={() => {
                                                                    setAudioAddLabel(false);
                                                                    setAudioLabel('');
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faTimes} className="fa-w-16"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                :
                                                    <button type="button" className="btn btn-success btn-sm my-2" onClick={() => setAudioAddLabel(true)}>Add Label</button>
                                        }
                                        <img src={item.files[imgIndex].img.url} className="w-100 h-auto" alt={item.files[imgIndex].label}/>
                                        {
                                            item.files[imgIndex].label ?
                                                <div className="mt-2 text-center">
                                                    <span className="font-15">{item.files[imgIndex].label}</span>
                                                </div>
                                            :
                                                imgAddLabel ? 
                                                    <div className="img-add-label-wrapper mt-2">
                                                        <div className="img-add-label-label d-inline mr-3">
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
                                                                className="btn btn-success btn-sm"
                                                                onClick={() => {
                                                                    addImageLabel(imgLabel, imgIndex, itemIndex);
                                                                    setImgAddLabel(false);
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-16"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm ml-2"
                                                                onClick={() => {
                                                                    setImgAddLabel(false);
                                                                    setImgLabel('');
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faTimes} className="fa-w-16"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                :
                                                    <button type="button" className="btn btn-success btn-sm my-2" onClick={() => setImgAddLabel(true)}>Add Label</button>
                                        }
                                    </>
                            }
                        </div>
                        <div className="col-md-8">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="quiz-choices mb-2 row m-0">
                                                <div className={"quiz-label text-center " + quizStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="quiz-choice-text">
                                                    <span>{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                );
            } else if (objectHelpers.doesObjectInArrayExist(item.files, 'img')) {
                const imgIndex = objectHelpers.findObjectIndexInArray(item.files, 'img');

                return (
                    <>
                        <div className="col-md-4">
                            <img src={item.files[imgIndex].img.url} className="w-100 h-auto" alt={item.files[imgIndex].label}/>
                            {
                                item.files[imgIndex].label ?
                                    <div className="mt-2 text-center">
                                        <span className="font-15">{item.files[imgIndex].label}</span>
                                    </div>
                                :
                                    imgAddLabel ? 
                                        <div className="img-add-label-wrapper mt-2">
                                            <div className="img-add-label-label d-inline mr-3">
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
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        addImageLabel(imgLabel, imgIndex, itemIndex);
                                                        setImgAddLabel(false);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-16"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm ml-2"
                                                    onClick={() => {
                                                        setImgAddLabel(false);
                                                        setImgLabel('');
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTimes} className="fa-w-16"/>
                                                </button>
                                            </div>
                                        </div>
                                    :
                                        <button type="button" className="btn btn-success btn-sm my-2" onClick={() => setImgAddLabel(true)}>Add Label</button>
                            }
                        </div>
                        <div className="col-md-8">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="quiz-choices mb-2 row m-0">
                                                <div className={"quiz-label text-center " + quizStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="quiz-choice-text">
                                                    <span>{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                );
            } else if (objectHelpers.doesObjectInArrayExist(item.files, 'audio')) {
                const audioIndex = objectHelpers.findObjectIndexInArray(item.files, 'audio');

                return (
                    <>
                        <div className="col-md-12">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="quiz-choices mb-2 row m-0">
                                                <div className={"quiz-label text-center " + quizStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="quiz-choice-text">
                                                    <span>{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-12">
                            <ReactAudioPlayer
                                src={item.files[audioIndex].audio.url}
                                controls
                                title={item.files[audioIndex].audio.name}
                                id="audio-question-player"
                            />
                            {
                                item.files[audioIndex].label ?
                                    <div className="mt-2 text-center">
                                        <span className="font-15">{item.files[audioIndex].label}</span>
                                    </div>
                                :
                                    audioAddLabel ? 
                                        <div className="audio-add-label-wrapper mt-2">
                                            <div className="audio-add-label-label d-inline mr-3">
                                                <span>Label:</span>
                                            </div>
                                            <div className="audio-add-label-input d-inline">
                                                <input
                                                    id="audioLabel"
                                                    name="audioLabel"
                                                    type="text"
                                                    placeholder="Type label here. . ."
                                                    onChange={(event) => setAudioLabel(event.target.value)}
                                                    value={audioLabel}
                                                />
                                            </div>
                                            <div className="audio-add-label-button d-inline ml-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        addAudioLabel(audioLabel, audioIndex, itemIndex);
                                                        setAudioAddLabel(false);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-16"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm ml-2"
                                                    onClick={() => {
                                                        setAudioAddLabel(false);
                                                        setAudioLabel('');
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTimes} className="fa-w-16"/>
                                                </button>
                                            </div>
                                        </div>
                                    :
                                        <button type="button" className="btn btn-success btn-sm my-2" onClick={() => setAudioAddLabel(true)}>Add Label</button>
                            }
                        </div>
                    </>
                );
            } else if (objectHelpers.doesObjectInArrayExist(item.files, 'video')) {
                const videoIndex = objectHelpers.findObjectIndexInArray(item.files, 'video');

                return (
                    <>
                        <div className="col-md-6">
                            <Player>
                                <source src={item.files[videoIndex].video.url} />
                                <track
                                    kind="captions"
                                    src={item.files[videoIndex].video.caption && item.files[videoIndex].video.caption.url}
                                    srcLang="en"
                                    label="English"
                                    default
                                />
                                <ControlBar autoHide={true}>
                                    <ClosedCaptionButton order={7} />
                                </ControlBar>
                            </Player>
                            {
                                item.files[videoIndex].label ?
                                    <div className="mt-2 text-center">
                                        <span className="font-15">{item.files[videoIndex].label}</span>
                                    </div>
                                :
                                    videoAddLabel ? 
                                        <div className="img-add-label-wrapper mt-2">
                                            <div className="img-add-label-label d-inline mr-3">
                                                <span>Label:</span>
                                            </div>
                                            <div className="img-add-label-input d-inline">
                                                <input
                                                    id="imgLabel"
                                                    name="imgLabel"
                                                    type="text"
                                                    placeholder="Type label here. . ."
                                                    onChange={(event) => setVideoLabel(event.target.value)}
                                                    value={videoLabel}
                                                />
                                            </div>
                                            <div className="img-add-label-button d-inline ml-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        addVideoLabel(videoLabel, videoIndex, itemIndex);
                                                        setVideoAddLabel(false);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-16"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm ml-2"
                                                    onClick={() => {
                                                        setVideoAddLabel(false);
                                                        setVideoLabel('');
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTimes} className="fa-w-16"/>
                                                </button>
                                            </div>
                                        </div>
                                    :
                                        <button type="button" className="btn btn-success btn-sm my-2" onClick={() => setVideoAddLabel(true)}>Add Label</button>
                            }
                        </div>
                        <div className="col-md-6">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="quiz-choices mb-2 row m-0">
                                                <div className={"quiz-label text-center " + quizStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="quiz-choice-text">
                                                    <span className="font-15 ml-2">{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                );
            } else {
                return (
                    <div className="col-md-12 ml-2">
                        <ul className="quiz-question-answers list-unstyled">
                            {
                                item.answers.map((answer, answerIndex) => (
                                    <li key={"quiz-question-answer" + answerIndex}>
                                        <div className="quiz-choices mb-2 row m-0">
                                            <div className={"quiz-label text-center " + quizStyles.questionLabelClass}>
                                                <span><strong>{alpbahet[answerIndex]}</strong></span>
                                            </div>
                                            <div className="quiz-choice-text">
                                                <span>{answer.answer}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                );
            }
        } else if (quizClass === 'question-files-right') {
            if ((objectHelpers.doesObjectInArrayExist(item.files, 'audio') === true) && (objectHelpers.doesObjectInArrayExist(item.files, 'img') === true)) {
                const audioIndex = objectHelpers.findObjectIndexInArray(item.files, 'audio');
                const imgIndex = objectHelpers.findObjectIndexInArray(item.files, 'img');

                return (
                    <>
                        <div className="col-md-8">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="quiz-choices mb-2 row m-0">
                                                <div className={"quiz-label text-center " + quizStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="quiz-choice-text">
                                                    <span>{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <img src={item.files[imgIndex].img.url} className="w-100 h-auto" alt={item.files[imgIndex].label}/>
                            {
                                item.files[imgIndex].label ?
                                    <div className="mt-2 text-center">
                                        <span className="font-15">{item.files[imgIndex].label}</span>
                                    </div>
                                :
                                    imgAddLabel ? 
                                        <div className="img-add-label-wrapper mt-2">
                                            <div className="img-add-label-label d-inline mr-3">
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
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        addImageLabel(imgLabel, imgIndex, itemIndex);
                                                        setImgAddLabel(false);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-16"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm ml-2"
                                                    onClick={() => {
                                                        setImgAddLabel(false);
                                                        setImgLabel('');
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTimes} className="fa-w-16"/>
                                                </button>
                                            </div>
                                        </div>
                                    :
                                        <button type="button" className="btn btn-success btn-sm my-2" onClick={() => setImgAddLabel(true)}>Add Label</button>
                            }
                            <ReactAudioPlayer
                                src={item.files[audioIndex].audio.url}
                                controls
                                title={item.files[audioIndex].audio.name}
                                className="mt-3 w-100"
                                id="audio-question-player"
                            />
                            {
                                item.files[audioIndex].label ?
                                    <div className="mt-2 text-center">
                                        <span className="font-15">{item.files[audioIndex].label}</span>
                                    </div>
                                :
                                    audioAddLabel ? 
                                        <div className="audio-add-label-wrapper mt-2">
                                            <div className="audio-add-label-label d-inline mr-3">
                                                <span>Label:</span>
                                            </div>
                                            <div className="audio-add-label-input d-inline">
                                                <input
                                                    id="audioLabel"
                                                    name="audioLabel"
                                                    type="text"
                                                    placeholder="Type label here. . ."
                                                    onChange={(event) => setAudioLabel(event.target.value)}
                                                    value={audioLabel}
                                                />
                                            </div>
                                            <div className="audio-add-label-button d-inline ml-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        addAudioLabel(audioLabel, audioIndex, itemIndex);
                                                        setAudioAddLabel(false);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-16"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm ml-2"
                                                    onClick={() => {
                                                        setAudioAddLabel(false);
                                                        setAudioLabel('');
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTimes} className="fa-w-16"/>
                                                </button>
                                            </div>
                                        </div>
                                    :
                                        <button type="button" className="btn btn-success btn-sm my-2" onClick={() => setAudioAddLabel(true)}>Add Label</button>
                            }
                        </div>
                    </>
                );
            } else if (objectHelpers.doesObjectInArrayExist(item.files, 'img')) {
                const imgIndex = objectHelpers.findObjectIndexInArray(item.files, 'img');

                return (
                    <>
                        <div className="col-md-8">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="quiz-choices mb-2 row m-0">
                                                <div className={"quiz-label text-center " + quizStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="quiz-choice-text">
                                                    <span>{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <img src={item.files[imgIndex].img.url} className="w-100 h-auto" alt={item.files[imgIndex].label}/>
                            {
                                item.files[imgIndex].label ?
                                    <div className="mt-2 text-center">
                                        <span className="font-15">{item.files[imgIndex].label}</span>
                                    </div>
                                :
                                    imgAddLabel ? 
                                        <div className="img-add-label-wrapper mt-2">
                                            <div className="img-add-label-label d-inline mr-3">
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
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        addImageLabel(imgLabel, imgIndex, itemIndex);
                                                        setImgAddLabel(false);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-16"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm ml-2"
                                                    onClick={() => {
                                                        setImgAddLabel(false);
                                                        setImgLabel('');
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTimes} className="fa-w-16"/>
                                                </button>
                                            </div>
                                        </div>
                                    :
                                        <button type="button" className="btn btn-success btn-sm my-2" onClick={() => setImgAddLabel(true)}>Add Label</button>
                            }
                        </div>
                    </>
                );
            } else if (objectHelpers.doesObjectInArrayExist(item.files, 'audio')) {
                const audioIndex = objectHelpers.findObjectIndexInArray(item.files, 'audio');

                return (
                    <>
                        <div className="col-md-12">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="quiz-choices mb-2 row m-0">
                                                <div className={"quiz-label text-center " + quizStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="quiz-choice-text">
                                                    <span>{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-12">
                            <ReactAudioPlayer
                                src={item.files[audioIndex].audio.url}
                                controls
                                title={item.files[audioIndex].audio.name}
                                id="audio-question-player"
                            />
                            {
                                item.files[audioIndex].label ?
                                    <div className="mt-2 text-center">
                                        <span className="font-15">{item.files[audioIndex].label}</span>
                                    </div>
                                :
                                    audioAddLabel ? 
                                        <div className="audio-add-label-wrapper mt-2">
                                            <div className="audio-add-label-label d-inline mr-3">
                                                <span>Label:</span>
                                            </div>
                                            <div className="audio-add-label-input d-inline">
                                                <input
                                                    id="audioLabel"
                                                    name="audioLabel"
                                                    type="text"
                                                    placeholder="Type label here. . ."
                                                    onChange={(event) => setAudioLabel(event.target.value)}
                                                    value={audioLabel}
                                                />
                                            </div>
                                            <div className="audio-add-label-button d-inline ml-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        addAudioLabel(audioLabel, audioIndex, itemIndex);
                                                        setAudioAddLabel(false);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-16"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm ml-2"
                                                    onClick={() => {
                                                        setAudioAddLabel(false);
                                                        setAudioLabel('');
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTimes} className="fa-w-16"/>
                                                </button>
                                            </div>
                                        </div>
                                    :
                                        <button type="button" className="btn btn-success btn-sm my-2" onClick={() => setAudioAddLabel(true)}>Add Label</button>
                            }
                        </div>
                    </>
                );
            } else if (objectHelpers.doesObjectInArrayExist(item.files, 'video')) {
                const videoIndex = objectHelpers.findObjectIndexInArray(item.files, 'video');

                return (
                    <>
                        <div className="col-md-6">
                            <ul className="quiz-question-answers list-unstyled">
                                {
                                    item.answers.map((answer, answerIndex) => (
                                        <li key={"quiz-question-answer" + answerIndex}>
                                            <div className="quiz-choices mb-2 row m-0">
                                                <div className={"quiz-label text-center " + quizStyles.questionLabelClass}>
                                                    <span><strong>{alpbahet[answerIndex]}</strong></span>
                                                </div>
                                                <div className="quiz-choice-text">
                                                    <span className="font-15 ml-2">{answer.answer}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <Player>
                                <source src={item.files[videoIndex].video.url} />
                                <track
                                    kind="captions"
                                    src={item.files[videoIndex].video.caption && item.files[videoIndex].video.caption.url}
                                    srcLang="en"
                                    label="English"
                                    default
                                />
                                <ControlBar autoHide={true}>
                                    <ClosedCaptionButton order={7} />
                                </ControlBar>
                            </Player>
                            {
                                item.files[videoIndex].label ?
                                    <div className="mt-2 text-center">
                                        <span className="font-15">{item.files[videoIndex].label}</span>
                                    </div>
                                :
                                    videoAddLabel ? 
                                        <div className="img-add-label-wrapper mt-2">
                                            <div className="img-add-label-label d-inline mr-3">
                                                <span>Label:</span>
                                            </div>
                                            <div className="img-add-label-input d-inline">
                                                <input
                                                    id="imgLabel"
                                                    name="imgLabel"
                                                    type="text"
                                                    placeholder="Type label here. . ."
                                                    onChange={(event) => setVideoLabel(event.target.value)}
                                                    value={videoLabel}
                                                />
                                            </div>
                                            <div className="img-add-label-button d-inline ml-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        addVideoLabel(videoLabel, videoIndex, itemIndex);
                                                        setVideoAddLabel(false);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="fa-w-16"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm ml-2"
                                                    onClick={() => {
                                                        setVideoAddLabel(false);
                                                        setVideoLabel('');
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTimes} className="fa-w-16"/>
                                                </button>
                                            </div>
                                        </div>
                                    :
                                        <button type="button" className="btn btn-success btn-sm my-2" onClick={() => setVideoAddLabel(true)}>Add Label</button>
                            }
                        </div>
                    </>
                );
            } else {
                return (
                    <div className="col-md-12 ml-2">
                        <ul className="quiz-question-answers list-unstyled">
                            {
                                item.answers.map((answer, answerIndex) => (
                                    <li key={"quiz-question-answer" + answerIndex}>
                                        <div className="quiz-choices mb-2 row m-0">
                                            <div className={"quiz-label text-center " + quizStyles.questionLabelClass}>
                                                <span><strong>{alpbahet[answerIndex]}</strong></span>
                                            </div>
                                            <div className="quiz-choice-text">
                                                <span>{answer.answer}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                );
            }
        }
    }
    
    return (
        <div id="quiz-multiple-layout" className={"w-100 h-100 p-3 " + quizStyles.quizTextColor} style={{ background: quizStyles.questionBackgroundColor, }}>
            {
                quiz.length > 0 ?
                    quiz.map((item, itemIndex) => (
                        <div key={"quiz-question-" + itemIndex} className={"question-group row mb-4 " + quizClass}>
                            <div className="col-md-12">
                                <p className="font-20"><span>{(itemIndex+1) + '. ' + item.question}</span></p>
                            </div>
                            {content(item, quizClass, itemIndex)}
                        </div>
                    ))
                :
                    <div>
                        <span>No questions added.</span>
                    </div>
            }
        </div>
    );
}

export default QuizMultipleLayout;
