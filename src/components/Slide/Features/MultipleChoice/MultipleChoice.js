import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo, faUpload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { objectHelpers } from '../../../../helpers';

// components
import MultipleChoiceAccordion from './MultipleChoiceAccordion';
import ColorPicker from '../../../Common/ColorPicker';
import FeatureTypeWarning from '../../../AlertModal/FeatureTypeWarning';
import { galleryService } from '../../../../services';

// modal
import AltTagForm from '../../../AlertModal/AltTagForm';

function MultipleChoice(props) {

    const [imgUrlPreview, setImgUrlPreview] = useState('');
    const [file, setFile] = useState('');
    const [fileIndex, setFileIndex] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [updateQuestion, setUpdateQuestion] = useState('');
    const [updateQuestionCompareIndex, setUpdateQuestionCompareIndex] = useState('');
    const [isEditQuestion, setIsEditQuestion] = useState(false);
    const [IsAddAnswer, setIsAddAnswer] = useState(false);
    const [filesExist, setFilesExist] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [isFinalQuiz, setIsFinalQuiz] = useState(sessionStorage.getItem('isFinalQuizSet') ? sessionStorage.getItem('isFinalQuizSet') : false);
    const slideItemIdWithFinalQuiz = sessionStorage.getItem('slideItemId') ? sessionStorage.getItem('slideItemId') : '';

    const { contentIndex, currentColumnContentIndex, currentColumn, uid, courseLayout } = props;
    const currentBackgroundColor = currentColumn.content[currentColumnContentIndex][contentIndex].styles.questionBackgroundColor && currentColumn.content[currentColumnContentIndex][contentIndex].styles.questionBackgroundColor;
    const correctAnswers = props.correctAnswers;
    
    const titleTextColor = currentColumn.content[currentColumnContentIndex][contentIndex].styles.titleTextColor && currentColumn.content[currentColumnContentIndex][contentIndex].styles.titleTextColor;
    const titleBoxColor = currentColumn.content[currentColumnContentIndex][contentIndex].styles.titleBoxColor && currentColumn.content[currentColumnContentIndex][contentIndex].styles.titleBoxColor;
    const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);
    const [showTextColorPicker, setShowTextColorPicker] = useState(false);

    const addQuestion = (value) => {
        const currentColumnObj = currentColumn;

        const question = {
            question: value,
            answers: [],
            files: [],
            explanation: { content: '', visibility: 'show' },
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.push(question);

        props.setColumn(currentColumnObj);
    }

    const editQuestion = (value, questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].question = value;

        props.setColumn(currentColumnObj);
    }

    const deleteQuestion = (questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.splice(questionIndex, 1);

        props.setColumn(currentColumnObj);
    }

    const addAnswer = (value, questionIndex, correctAnswer) => {
        const currentColumnObj = currentColumn;

        const answer = {
            answer: value,
            correct: correctAnswer,
        }
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers.push(answer);

        props.setColumn(currentColumnObj);
    }

    const editAnswer = (value, questionIndex, answerIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers[answerIndex].answer = value;

        props.setColumn(currentColumnObj);
    }

    const deleteAnswer = (questionIndex, answerIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers.splice(answerIndex, 1);

        props.setColumn(currentColumnObj);
    }

    const setCorrectAnswer = (value, questionIndex, answerArray) => {
        const currentColumnObj = currentColumn;
        const selectCorrectAnswers = [];

        answerArray.forEach((item) => {
            selectCorrectAnswers.push(parseInt(item.value));
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers[parseInt(item.value)].correct = value;
        });

        const arrayLength = currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers.length;

        for (let i = 0; i < arrayLength; i++) {
            if (!selectCorrectAnswers.includes(i)) {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers[i].correct = false;
            } 
        }

        props.setColumn(currentColumnObj);
    }

    const addImageQuestion = (imgObj, questionIndex) => {
        const currentColumnObj = currentColumn;

        const object = {
            img: imgObj,
            label: '',
            weight: 0,
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files.push(object);

        props.setColumn(currentColumnObj);
    }

    const addAudioQuestion = (audioObj, questionIndex) => {
        const currentColumnObj = currentColumn;

        const object = {
            audio: audioObj,
            label: '',
            weight: 1,
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files.push(object);

        props.setColumn(currentColumnObj);
    }

    const addVideoQuestion = (videoObj, questionIndex) => {
        const currentColumnObj = currentColumn;

        const object = {
            video: videoObj,
            label: '',
            weight: 2,
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files.push(object);

        props.setColumn(currentColumnObj);
    }

    const addVideoQuestionCaption = (captionObj, questionIndex) => {
        const currentColumnObj = currentColumn;
        const doesExist = objectHelpers.doesObjectInArrayExist(currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files, 'video');

        if (doesExist) {
            const index = objectHelpers.findObjectIndexInArray(currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files, 'video');
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[index].video.caption = captionObj;
        } else {
            alert('PLease upload a video first!');
        }

        props.setColumn(currentColumnObj);
    }

    const deleteQuestionFile = (index, questionIndex) => {
        document.getElementById("question-files-uploader").value = "";

        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files.splice(index, 1);

        if (currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files.length === 0) {
            setFilesExist(false);
        }

        props.setColumn(currentColumnObj);
    }

    const deleteQuestionVideoVttFile = (questionIndex) => {
        document.getElementById("question-files-uploader").value = "";

        const currentColumnObj = currentColumn;
        const doesExist = objectHelpers.doesObjectInArrayExist(currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files, 'video');

        if (doesExist) {
            const index = objectHelpers.findObjectIndexInArray(currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files, 'video');
            delete currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[index].video.caption;
        } else {
            alert('PLease upload a video first!');
        }

        props.setColumn(currentColumnObj);
    }

    const setQuestionLabelClass = (labelClass) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.questionLabelClass = labelClass;

        props.setColumn(currentColumnObj);  
    }

    const setQuestionBackgroundColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.questionBackgroundColor = color;

        props.setColumn(currentColumnObj);
    }

    const setMultipleChoiceTextColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.multipleChoiceTextColor = color;

        props.setColumn(currentColumnObj);
    }

    const setQuestionFiles = (questionFilesArray, questionIndex) => {
        const currentColumnObj = currentColumn;
        console.log(questionFilesArray);

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files = questionFilesArray;

        props.setColumn(currentColumnObj);
    }

    const addFileLabel = (value, questionIndex, fileIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[fileIndex].label = value;

        props.setColumn(currentColumnObj);
    }

    const editFileLabel = (value, questionIndex, fileIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[fileIndex].label = value;

        props.setColumn(currentColumnObj);
    }

    const deleteFileLabel = (questionIndex, fileIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].files[fileIndex].label = '';

        props.setColumn(currentColumnObj);
    }

    const setRepeatMechanics = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].mechanics.repeat = value;

        props.setColumn(currentColumnObj);
    }

    const setPassRateMechanics = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].mechanics.passingRate = value;

        props.setColumn(currentColumnObj);
    }

    const setFeatureTypeMechanics = useCallback((value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].mechanics.specificType = value;

        props.setColumn(currentColumnObj);
    }, [contentIndex, currentColumn, currentColumnContentIndex, props])

    const setReturnSlideMechanics = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].mechanics.returnSlide = value;

        props.setColumn(currentColumnObj);
    }

    const setExplanationVisibility = (value, questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].explanation.visibility = value;

        props.setColumn(currentColumnObj);
    }

    const setQuestionAnswers = (questionAnswersArray, questionIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[questionIndex].answers = questionAnswersArray;

        props.setColumn(currentColumnObj);
    }

    const handleImageChange = (e) => {
        let files = e.target.files;
        let reader = new FileReader();

        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
            // setBackgroundImg(files[0].name, reader.result);
            setImgUrlPreview(reader.result);
        }

        setModalShow(true);
        setFile(files);
        setFileIndex(0);
    }

    const handleImageUpload = (mediaAlt, file, fileIndex) => {
        if (modalShow ) { 
            const formData = new FormData();

            formData.append('file', file[fileIndex], file[fileIndex].name.replace(/\s/g,''));
            formData.append('uid', uid);
            formData.append('alt', mediaAlt);

            galleryService.uploadFiles(formData)
            .then(
                fileObject => {
                    console.log(fileObject);
                    setBackgroundImg(fileObject.name, fileObject.image);
                },
                error => console.log(error)
            );
        }
    }

    const setBackgroundImg = (name, url) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.backgroundImg.url = url;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.backgroundImg.name = name;

        props.setColumn(currentColumnObj);
    }
    
    const setTitleBorder = (e) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.titleBoxBorder = e.target.value;

        props.setColumn(currentColumnObj);
    }

    const setTitleTextColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.titleTextColor = color;

        props.setColumn(currentColumnObj);
    }

    const setTitleBoxColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.titleBoxColor = color;

        props.setColumn(currentColumnObj);
    }

    useEffect(() => {
        if (isFinalQuiz && props.slideItemId === slideItemIdWithFinalQuiz) {
            setFeatureTypeMechanics('finalQuiz');
            setIsFinalQuiz(false);
        }
    }, [isFinalQuiz, props.slideItemId, slideItemIdWithFinalQuiz, setFeatureTypeMechanics]);
    
    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions border-top border-gray">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'multipleChoice')}>
                        <FontAwesomeIcon icon={faUndo}/>
                        <span>Reset</span>
                    </button>
                    <button type="button" className="sg-workspace-action-item btn btn-link" onClick={() => props.deleteFeature(contentIndex)}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
            <div className="sg-control sg-control-text-editor">
                <div className="sg-control-header">
                    <label>Question/s Setup</label>
                </div>
                <div className={courseLayout !== "fixed" ? "sg-control-content" : "sg-control-content-override"}>
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Question/s</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <ul style={{ listStyle: 'none' }} className="list-group multiple-choice-question-list">
                                    {currentColumn.content[currentColumnContentIndex][contentIndex].output.length > 0 ? 
                                        <>
                                            {currentColumn.content[currentColumnContentIndex][contentIndex].output.map((item, index) => (
                                                <li key={'number-' + index} className="multiple-choice-question-list-item mb-2">
                                                    {isEditQuestion && updateQuestionCompareIndex === index ?
                                                        <div className="multiple-choice-control-input-wrapper">
                                                            <div className="multiple-choice-control-input-label">
                                                                <span>{index+1}.</span>
                                                            </div>
                                                            <div className="multiple-choice-control-input">
                                                                <input
                                                                    id="question"
                                                                    name="question"
                                                                    type="text"
                                                                    placeholder="Type question here. . ."
                                                                    onChange={(event) => setUpdateQuestion(event.target.value)}
                                                                    value={updateQuestion}
                                                                />
                                                            </div>
                                                            <div className="multiple-choice-control-button">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-primary btn-sm"
                                                                    onClick={() => {
                                                                        const isEmpty = document.getElementById("question");
                                                                        
                                                                        if (isEmpty.value !== "") {
                                                                            editQuestion(updateQuestion, index);
                                                                            setUpdateQuestion('');
                                                                            setIsEditQuestion(false);
                                                                            setUpdateQuestionCompareIndex('');
                                                                        }
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon icon={faPlus}/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    :
                                                        <MultipleChoiceAccordion
                                                            index={index}
                                                            item={item}
                                                            deleteQuestion={deleteQuestion}
                                                            setIsEditQuestion={setIsEditQuestion}
                                                            setUpdateQuestion={setUpdateQuestion}
                                                            setAnswer={setAnswer}
                                                            editAnswer={editAnswer}
                                                            deleteAnswer={deleteAnswer}
                                                            addAnswer={addAnswer}
                                                            setIsAddAnswer={setIsAddAnswer}
                                                            setCorrectAnswer={setCorrectAnswer}
                                                            IsAddAnswer={IsAddAnswer}
                                                            answer={answer}
                                                            addImageQuestion={addImageQuestion}
                                                            addAudioQuestion={addAudioQuestion}
                                                            addVideoQuestion={addVideoQuestion}
                                                            addVideoQuestionCaption={addVideoQuestionCaption}
                                                            deleteQuestionFile={deleteQuestionFile}
                                                            deleteQuestionVideoVttFile={deleteQuestionVideoVttFile}
                                                            setFilesExist={setFilesExist}
                                                            setQuestionFiles={setQuestionFiles}
                                                            addFileLabel={addFileLabel}
                                                            editFileLabel={editFileLabel}
                                                            deleteFileLabel={deleteFileLabel}
                                                            contentIndex={contentIndex}
                                                            setShowTextEditor={props.setShowTextEditor}
                                                            setMChoiceIndex={props.setMChoiceIndex}
                                                            setExplanationVisibility={setExplanationVisibility}
                                                            setUpdateQuestionCompareIndex={setUpdateQuestionCompareIndex}
                                                            setQuestionAnswers={setQuestionAnswers}
                                                            correctAnswers={correctAnswers}
                                                        />
                                                    }
                                                </li>
                                            ))}
                                            {courseLayout !== "fixed" &&
                                                <li className="multiple-choice-question-list-item">
                                                    <div className="multiple-choice-control-input-wrapper">
                                                        <div className="multiple-choice-control-input-label">
                                                            <span>{currentColumn.content[currentColumnContentIndex][contentIndex].output.length+1}.</span>
                                                        </div>
                                                        <div className="multiple-choice-control-input">
                                                            <input
                                                                id="question"
                                                                name="question"
                                                                type="text"
                                                                placeholder="Type question here. . ."
                                                                onChange={(event) => setQuestion(event.target.value)}
                                                                value={question}
                                                            />
                                                        </div>
                                                        <div className="multiple-choice-control-button">
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary btn-sm"
                                                                onClick={() => {
                                                                    const isEmpty = document.getElementById("question");
                                                                    
                                                                    if (isEmpty.value !== "") {
                                                                        addQuestion(question);
                                                                        setQuestion('');
                                                                    }
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faPlus}/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            }
                                        </>
                                    :
                                        <li className="multiple-choice-question-list-item">
                                            <div className="multiple-choice-control-input-wrapper">
                                                <div className="multiple-choice-control-input-label">
                                                    <span>1.</span>
                                                </div>
                                                <div className="multiple-choice-control-input">
                                                    <input
                                                        id="question"
                                                        name="question"
                                                        type="text"
                                                        placeholder="Type question here. . ."
                                                        onChange={(event) => setQuestion(event.target.value)}
                                                        value={question}
                                                    />
                                                </div>
                                                <div className="multiple-choice-control-button">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => {
                                                            const isEmpty = document.getElementById("question");
                                                            
                                                            if (isEmpty.value !== "") {
                                                                addQuestion(question);
                                                                setQuestion('');
                                                            }
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>             
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sg-control sg-control-group">
                <div className="sg-control-header">
                    <label>Mechanics</label>
                </div>
                <div className="sg-control-input sg-control-input mt-3">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label" title="Set the type of feature if it is Knowledge Check or Final Quiz">
                                <span>Feature Type</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].mechanics.specificType}
                                    onChange={(event) => {
                                        if (event.target.value === 'finalQuiz') {
                                            setModalShow(true);

                                            if (isFinalQuiz) {
                                                setFeatureTypeMechanics(event.target.value);
                                                console.log(currentColumn.content[currentColumnContentIndex][contentIndex].mechanics.specificType)
                                            }
                                        } else {
                                            setFeatureTypeMechanics(event.target.value);
                                            sessionStorage.clear();
                                        }
                                    }}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="knowledgeCheck">&nbsp;Knowledge Check</option>
                                    {
                                        !isFinalQuiz && <option value="finalQuiz">&nbsp;Final Quiz</option>
                                    }
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label" title={currentColumn.content[currentColumnContentIndex][contentIndex].mechanics.specificType === 'knowledgeCheck' ? 'How many times Knowledge Check will repeat if student fails.' : 'How many times Final Quiz will repeat if student fails.' }>
                                <span>Repeat the {currentColumn.content[currentColumnContentIndex][contentIndex].mechanics.specificType === 'knowledgeCheck' ? ' Knowledge Check' : ' Final Quiz' }</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <input
                                    type="number"
                                    name="repeatMechanics"
                                    min="0"
                                    onChange={(event) => {
                                        if (event.target.value >= 0 && event.target.value) {
                                            setRepeatMechanics(parseInt(event.target.value))
                                        }
                                    }}
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].mechanics.repeat && currentColumn.content[currentColumnContentIndex][contentIndex].mechanics.repeat}
                                />
                            </div>
                            <div className="sg-control-input-list-label-suffix">
                                <span>&nbsp;times</span>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label" title="The percentage the student needs to get in order to pass.">
                                <span>Passing Rate</span>
                            </div>
                            <div id="percentage-input" className="sg-control-input-list-input">
                                <input
                                    type="number"
                                    name="passRateMechanics"
                                    min="0"
                                    onChange={(event) => {
                                        if (event.target.value >= 0 && event.target.value) {
                                            setPassRateMechanics(parseInt(event.target.value))
                                        }
                                    }}
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].mechanics.passingRate && currentColumn.content[currentColumnContentIndex][contentIndex].mechanics.passingRate}
                                />
                            </div>
                            <div className="sg-control-input-list-label-suffix font-15">
                                <span>&nbsp;%</span>
                            </div>
                        </li>
                        
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label" title="The slide that student returns to after failing.">
                                <span>Return to Slide</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].mechanics.returnSlide}
                                    onChange={(event) => setReturnSlideMechanics(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="0">&nbsp;Sample Slide 1</option>
                                    <option value="1">&nbsp;Sample Slide 2</option>
                                    <option value="2">&nbsp;Sample Slide 3</option>
                                </select>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sg-control sg-control-group">
                <div className="sg-control-header">
                    <label>Customize Question</label>
                </div>
                <div className="sg-control-input sg-control-input mt-3">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Title Border Position</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].styles.titleBoxBorder}
                                    onChange={(event) => setTitleBorder(event, contentIndex)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="border-left">Border-left</option>
                                    <option value="border-top">Border-bottom</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label homepage-color-scheme-label">
                                <span>Title Border Color</span>
                            </div>
                            <div className="sg-control-input-list-input homepage-color-scheme-selector">
                                <div
                                    className="btn border border-secondary rounded text-center w-100"
                                    onClick={() => {
                                        if (showBorderColorPicker) {
                                            setShowBorderColorPicker(false)
                                        } else {
                                            setShowBorderColorPicker(true)
                                            setShowTextColorPicker(false)
                                            setShowPicker(false)
                                        }
                                    }}
                                    style={{ background: titleBoxColor, cursor: 'pointer' }}
                                >
                                    {titleBoxColor === 'transparent' ?
                                        <span className="h-100 w-100 text-black text-uppercase">{titleBoxColor}</span>
                                    :
                                        <span className="h-100 w-100 text-white">{titleBoxColor}</span>
                                    }
                                </div>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label homepage-color-scheme-label">
                                <span>Title Text Color</span>
                            </div>
                            <div className="sg-control-input-list-input homepage-color-scheme-selector">
                                <div
                                    className="btn border border-secondary rounded text-center w-100"
                                    onClick={() => {
                                        if (showTextColorPicker) {
                                            setShowTextColorPicker(false)
                                        } else {
                                            setShowTextColorPicker(true)
                                            setShowBorderColorPicker(false)
                                            setShowPicker(false)
                                        }
                                    }}
                                    style={{ background: titleTextColor, cursor: 'pointer' }}
                                >
                                    {titleBoxColor === 'transparent' ?
                                        <span className="h-100 w-100 text-black text-uppercase">{titleTextColor}</span>
                                    :
                                        <span className="h-100 w-100 text-white">{titleTextColor}</span>
                                    }
                                </div>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                            <div className="sg-control-input-list-label">
                                <span>Background</span>
                            </div>
                            <div className="sg-control-input-list-input input-group">
                                <label className="input-group-btn mb-0">
                                    <span className="btn btn-primary">
                                        <FontAwesomeIcon icon={faUpload}/><input type="file" style={{ display: "none"}} onChange={handleImageChange} accept="image/*"/>
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Choose image"
                                    className="form-control w-50"
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].styles.backgroundImg.name &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].styles.backgroundImg.name
                                    }
                                    readOnly
                                />
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Label Border</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].styles.questionLabelClass}
                                    onChange={(event) => setQuestionLabelClass(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="rounded-circle">&nbsp;Rounded Circle</option>
                                    <option value="rounded">&nbsp;Rounded</option>
                                    <option value="rounded-0">&nbsp;None</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Text Color</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].styles.multipleChoiceTextColor}
                                    onChange={(event) => setMultipleChoiceTextColor(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="text-black">&nbsp;Black</option>
                                    <option value="text-white">&nbsp;White</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label multiple-choice-background-color-label">
                                <span>Background Color</span>
                            </div>
                            <div className="sg-control-input-list-input multiple-choice-background-color-selector">
                                <div
                                    className="btn border border-secondary rounded text-center w-100"
                                    onClick={() => {
                                        if (showPicker) {
                                            setShowPicker(false)
                                        } else {
                                            setShowPicker(true)
                                            setShowBorderColorPicker(false)
                                            setShowTextColorPicker(false)
                                        }
                                    }}
                                    style={{ background: currentBackgroundColor, cursor: 'pointer' }}
                                >
                                    <span className="text-white h-100 w-100">{currentColumn.content[currentColumnContentIndex][contentIndex].styles.questionBackgroundColor}</span>
                                </div>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Element CSS</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <div className="sg-expandable-code-editor">
                                    <div className="sg-workspace-expander">
                                        <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                            <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowCssEditor(true, contentIndex)}>
                                                <span>Add CSS</span>
                                            </button>
                                            <input type="text" value="" disabled className="rounded"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        {filesExist &&
                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                <div className="sg-control-input-list-label">
                                    <span>Files Position</span>
                                </div>
                                <div className="sg-control-input-list-input">
                                    <select
                                        value={currentColumn.content[currentColumnContentIndex][contentIndex].class}
                                        onChange={(event) => props.setFeatureClass(event, contentIndex)}
                                        className="form-control-plaintext border border-secondary rounded"
                                    >
                                        <option value="question-files-left">&nbsp;Left</option>
                                        <option value="question-files-right">&nbsp;Right</option>
                                    </select>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </div>
            <ColorPicker
                classNames="position-absolute multiple-choice-color-picker"
                showPicker={showPicker}
                setBackgroundColor={setQuestionBackgroundColor}
                defaultColor={currentBackgroundColor}
            />
            <ColorPicker
                classNames="position-absolute multiple-choice-border-color-picker"
                showPicker={showBorderColorPicker}
                setBackgroundColor={setTitleBoxColor}
                defaultColor={titleBoxColor}
            />
            <ColorPicker
                classNames="position-absolute multiple-choice-text-color-picker"
                showPicker={showTextColorPicker}
                setBackgroundColor={setTitleTextColor}
                defaultColor={titleTextColor}
            />
            <FeatureTypeWarning
                modalShow={modalShow}
                setModalShow={setModalShow}
                setIsFinalQuiz={setIsFinalQuiz}
                slideItemId={props.slideItemId}
            />
            <AltTagForm
                imgUrlPreview={imgUrlPreview}
                file={file}
                fileIndex={fileIndex}
                handleImageUpload={handleImageUpload}
                modalShow={modalShow}
                setModalShow={setModalShow}
            />
        </div>
    )
}

export default MultipleChoice;
