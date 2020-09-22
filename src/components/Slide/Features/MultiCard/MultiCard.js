import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrashAlt, faUndo, faCaretUp, faCaretDown, faPause, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { galleryService } from '../../../../services';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Accordion, Card } from 'react-bootstrap';
import { arrayHelpers } from '../../../../helpers';

// modal
import AltTagForm from '../../../AlertModal/AltTagForm';

function MultiCard(props) {

    const { contentIndex, currentColumnContentIndex, currentColumn, uid } = props;
    const cardCounter = props.currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter;
    const [modalShow, setModalShow] = useState(false);
    const [imgUrlPreview, setImgUrlPreview] = useState('');
    const [file, setFile] = useState('');
    const [fileIndex, setFileIndex] = useState('');
    const [firstCardCollapse, setFirstCardCollapse] = useState(true);
    const [secondCardCollapse, setSecondCardCollapse] = useState(false);
    const [thirdCardCollapse, setThirdCardCollapse] = useState(false);
    const [fourthCardCollapse, setFourthCardCollapse] = useState(false);
    const [cardNumber, setCardNumber] = useState(0);
    const [play, setPlay] = useState(true);

    const collapseListener = (currentCollapseId, card) => {

        if (card === 'firstCard') {
            if (currentCollapseId) {
                currentCollapseId = false;
            } else {
                currentCollapseId = true;
            }

            setFirstCardCollapse(currentCollapseId);
        } else if (card === 'secondCard') {
            if (currentCollapseId) {
                currentCollapseId = false;
            } else {
                currentCollapseId = true;
            }

            setSecondCardCollapse(currentCollapseId);
        } else if (card === 'thirdCard') {
            if (currentCollapseId) {
                currentCollapseId = false;
            } else {
                currentCollapseId = true;
            }

            setThirdCardCollapse(currentCollapseId);
        } else if (card === 'fourthCard') {
            if (currentCollapseId) {
                currentCollapseId = false;
            } else {
                currentCollapseId = true;
            }

            setFourthCardCollapse(currentCollapseId);
        }
    }

    const setCardCounter = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.cardCounter.push(value);

        props.setColumn(currentColumnObj);
    }

    const setTitle = (e, cardNumber) => {
        const currentColumnObj = currentColumn;

        if (cardNumber === 1) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.title = e.target.value;
        } else if (cardNumber === 2) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.title = e.target.value;
        } else if (cardNumber === 3) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.title = e.target.value;
        } else if (cardNumber === 4) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.title = e.target.value;
        }

        props.setColumn(currentColumnObj);
    }

    const handleImageChange = (e, cardNumber) => {
        let files = e.target.files;
        let reader = new FileReader();

        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
            // setImg(files[0].name, reader.result, files[0].type);
            setImgUrlPreview(reader.result);
        }

        setModalShow(true);
        setFile(files);
        setFileIndex(0);
        setCardNumber(cardNumber);
    }

    const handleImageUpload = (mediaAlt, file, fileIndex) => {
        if (modalShow ) { 
            const formData = new FormData();

            formData.append('file', file[fileIndex]);
            formData.append('uid', uid);
            formData.append('alt', mediaAlt);

            galleryService.uploadFiles(formData)
            .then(
                fileObject => {
                    console.log(fileObject);
                    setImg(fileObject.name, fileObject.image, fileObject.type, cardNumber);
                    // if (!currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.includes(cardNumber)) {
                    //     setCardCounter(cardNumber);
                    // }
                },
                error => console.log(error)
            );
        }
    }

    const setImg = (name, url, type, cardNumber) => {
        const currentColumnObj = currentColumn;

        if (cardNumber === 1) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.img.name = name;
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.img.url = url;
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.img.type = type;
        } else if (cardNumber === 2) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.img.name = name;
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.img.url = url;
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.img.type = type;
        } else if (cardNumber === 3) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.img.name = name;
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.img.url = url;
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.img.type = type;
        } else if (cardNumber === 4) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.img.name = name;
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.img.url = url;
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.img.type = type;
        }

        props.setColumn(currentColumnObj);
    }

    const setImgAlt = (value, cardNumber) => {
        const currentColumnObj = currentColumn;

        if (cardNumber === 1) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.img.alt = value;
        } else if (cardNumber === 2) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.img.alt = value;
        } else if (cardNumber === 3) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.img.alt = value;
        } else if (cardNumber === 4) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.img.alt = value;
        }

        props.setColumn(currentColumnObj);
    }
    
    const setButtonLabel = (e, cardNumber) => {
        const currentColumnObj = currentColumn;

        if (cardNumber === 1) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.button.label = e.target.value;
        } else if (cardNumber === 2) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.button.label = e.target.value;
        } else if (cardNumber === 3) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.button.label = e.target.value;
        } else if (cardNumber === 4) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.button.label = e.target.value;
        }

        props.setColumn(currentColumnObj);
    }

    const setButtonUrl = (e, cardNumber) => {
        const currentColumnObj = currentColumn;

        if (cardNumber === 1) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.button.url = e.target.value;
        } else if (cardNumber === 2) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.button.url = e.target.value;
        } else if (cardNumber === 3) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.button.url = e.target.value;
        } else if (cardNumber === 4) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.button.url = e.target.value;
        }

        props.setColumn(currentColumnObj);
    }

    const setImgShape = (value) => {
        const currentColumnObj = currentColumn;

        currentColumn.content[currentColumnContentIndex][contentIndex].styles.imageShape = value;

        props.setColumn(currentColumnObj);
    }

    const resetCard = (cardNumber) => {
        const currentColumnObj = currentColumn;

        if (cardNumber === 1) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.img.name = '';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.img.url = '';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.img.type = '';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.title = 'Card title';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.content = '<p>No content provided yet.</p>';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.button.label = 'Click me';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.firstCard.button.url = '';
            setFirstCardCollapse(false);
        } else if (cardNumber === 2) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.img.name = '';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.img.url = '';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.img.type = '';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.title = 'Card title';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.content = '<p>No content provided yet.</p>';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.button.label = 'Click me';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.secondCard.button.url = '';
            setSecondCardCollapse(false);
        } else if (cardNumber === 3) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.img.name = '';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.img.url = '';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.img.type = '';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.title = 'Card title';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.content = '<p>No content provided yet.</p>';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.button.label = 'Click me';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.thirdCard.button.url = '';
            setThirdCardCollapse(false);
        } else if (cardNumber === 4) {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.img.name = '';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.img.url = '';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.img.type = '';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.title = 'Card title';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.content = '<p>No content provided yet.</p>';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.button.label = 'Click me';
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.fourthCard.button.url = '';
            setFourthCardCollapse(false);
        }

        if (cardNumber !== 1) {
            const newCardCounter = arrayHelpers.removeElement(currentColumnObj.content[currentColumnContentIndex][contentIndex].output.cardCounter, cardNumber);
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.cardCounter = newCardCounter;
        }

        props.setColumn(currentColumnObj);
    }

    const handleAudioChange = (e) => {
        let files = e.target.files;

        const formData = new FormData();

        formData.append('file', files[0]);
        formData.append('uid', uid);
        formData.append('alt', files[0].name);

        galleryService.uploadFiles(formData)
        .then(
            fileObject => {
                console.log(fileObject);
                setBackgroundMusic(fileObject.name, fileObject.image, fileObject.type);
            },
            error => console.log(error)
        );
    }

    const setBackgroundMusic = (name, url, type) => {
        const audioPlayer = document.getElementById("multi-card-bg-audio");
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.backgroundAudio.url = url;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.backgroundAudio.name = name;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.backgroundAudio.type = type;

        props.setColumn(currentColumnObj);
        
        if (audioPlayer) {
            setPlay(true);
            audioPlayer.load();
        }
    }

    const bgAudioControl = () => {
        const audioPlayer = document.getElementById("multi-card-bg-audio");

        if (audioPlayer) {
            if (play) {
                setPlay(false);
                audioPlayer.pause();
            } else {
                setPlay(true);
                audioPlayer.play();
            }
        }
    }

    const addCardSetup = (cardNumber) => {
        if (!currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.includes(cardNumber) && cardNumber <= 4) {
            setCardCounter(cardNumber);
        } else if ((!currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.includes(cardNumber)) || (!currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.includes(2) && cardNumber <= 4)) {
            setCardCounter(2);
        } else if ((!currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.includes(cardNumber)) || (!currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.includes(3) && cardNumber <= 4)) {
            setCardCounter(3);
        } else if ((!currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.includes(cardNumber)) || (!currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.includes(4) && cardNumber <= 4)) {
            setCardCounter(4);
        }
    }

    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions border-top border-gray">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'multiCard')}>
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
                <div className="sg-control-header d-flex justify-content-between">
                    <label>Card/s Setup</label>
                    {currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.length === 4 ?
                        <OverlayTrigger
                            key="add-card-top"
                            placement="top"
                            overlay={
                                <Tooltip id='add-card-tooltip-top'>
                                    <span>Can only add up to 4 cards.</span>
                                </Tooltip>
                            }
                        >
                            <button type="button" className="btn btn-primary btn-sm webupps-disabled">
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                        </OverlayTrigger>
                    :
                        <OverlayTrigger
                            key="add-card-top"
                            placement="top"
                            overlay={
                                <Tooltip id='add-card-tooltip-top'>
                                    <span>Add card</span>
                                </Tooltip>
                            }
                        >
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => addCardSetup(cardCounter[cardCounter.length - 1] + 1)}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                        </OverlayTrigger>
                    }
                </div>
                {currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.includes(1) &&
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0" className="p-2" onClick={() => collapseListener(firstCardCollapse, 'firstCard')}>
                                <div className="row m-0">
                                    <div className="col-md-9">
                                        <span>First Card</span>
                                    </div>
                                    <div className="col-md-3 webupps-vertical-center justify-content-between pl-0">
                                        <span>
                                            <FontAwesomeIcon icon={firstCardCollapse === true ? faCaretUp : faCaretDown}/>
                                        </span>
                                        <OverlayTrigger
                                            key="first-card-top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id='first-card-tooltip-top'>
                                                    <span>Reset</span>
                                                </Tooltip>
                                            }
                                        >
                                            <button type="button" className="btn btn-primary btn-sm ml-2" onClick={() => {resetCard(1)}}>
                                                <FontAwesomeIcon icon={faUndo}/>
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="p-2">
                                    <div className="sg-control-input">
                                        <ul className="sg-control-input-list">
                                            <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                                                <div className="sg-control-input-list-label">
                                                    <span>Image</span>
                                                </div>
                                                <div className="sg-control-input-list-input input-group">
                                                    <label className="input-group-btn">
                                                        <span className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faUpload}/>
                                                            <input type="file" style={{ display: "none"}} onChange={(e) => {handleImageChange(e, 1)}} accept="image/*"/>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Choose image"
                                                        className="form-control w-50"
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.firstCard.img.name &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.firstCard.img.name
                                                        }
                                                        readOnly
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Alt</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setImgAlt(e.target.value, 1)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.firstCard.img.alt &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.firstCard.img.alt
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Title</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setTitle(e, 1)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.firstCard.title &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.firstCard.title
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Content</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <div className="sg-expandable-code-editor">
                                                        <div className="sg-workspace-expander">
                                                            <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                                                <button
                                                                    type="button"
                                                                    className="input-hover-btn btn btn-light border border-secondary p-1"
                                                                    onClick={() => {
                                                                        props.setShowEditor(true, contentIndex, 'multiCardFirst');
                                                                    }}
                                                                >
                                                                    <span>Edit</span>
                                                                </button>
                                                                <input type="text" value="" disabled className="rounded"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Label</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setButtonLabel(e, 1)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.firstCard.button.label &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.firstCard.button.label
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>URL</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setButtonUrl(e, 1)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.firstCard.button.url &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.firstCard.button.url
                                                        }
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                }
                {currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.includes(2) &&
                    <Accordion className="mt-2">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1" className="p-2" onClick={() => collapseListener(secondCardCollapse, 'secondCard')}>
                                <div className="row m-0">
                                    <div className="col-md-9">
                                        <span>Second Card</span>
                                    </div>
                                    <div className="col-md-3 webupps-vertical-center justify-content-between pl-0">
                                        <span>
                                            <FontAwesomeIcon icon={secondCardCollapse === true ? faCaretUp : faCaretDown}/>
                                        </span>
                                        <OverlayTrigger
                                            key="second-card-top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id='second-card-tooltip-top'>
                                                    <span>Reset</span>
                                                </Tooltip>
                                            }
                                        >
                                            <button type="button" className="btn btn-primary btn-sm ml-2" onClick={() => {resetCard(2)}}>
                                                <FontAwesomeIcon icon={faUndo}/>
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body className="p-2">
                                    <div className="sg-control-input">
                                        <ul className="sg-control-input-list">
                                            <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                                                <div className="sg-control-input-list-label">
                                                    <span>Image</span>
                                                </div>
                                                <div className="sg-control-input-list-input input-group">
                                                    <label className="input-group-btn">
                                                        <span className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faUpload}/>
                                                            <input type="file" style={{ display: "none"}} onChange={(e) => {handleImageChange(e, 2)}} accept="image/*"/>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Choose image"
                                                        className="form-control w-50"
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.secondCard.img.name &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.secondCard.img.name
                                                        }
                                                        readOnly
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Alt</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setImgAlt(e.target.value, 2)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.secondCard.img.alt &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.secondCard.img.alt
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Title</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setTitle(e, 2)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.secondCard.title &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.secondCard.title
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Content</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <div className="sg-expandable-code-editor">
                                                        <div className="sg-workspace-expander">
                                                            <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                                                <button
                                                                    type="button"
                                                                    className="input-hover-btn btn btn-light border border-secondary p-1"
                                                                    onClick={() => {
                                                                        props.setShowEditor(true, contentIndex, 'multiCardSecond');
                                                                    }}
                                                                >
                                                                    <span>Edit</span>
                                                                </button>
                                                                <input type="text" value="" disabled className="rounded"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Label</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setButtonLabel(e, 2)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.secondCard.button.label &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.secondCard.button.label
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>URL</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setButtonUrl(e, 2)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.secondCard.button.url &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.secondCard.button.url
                                                        }
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                }
                {currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.includes(3) &&
                    <Accordion className="mt-2">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2" className="p-2" onClick={() => collapseListener(thirdCardCollapse, 'thirdCard')}>
                                <div className="row m-0">
                                    <div className="col-md-9">
                                        <span>Third Card</span>
                                    </div>
                                    <div className="col-md-3 webupps-vertical-center justify-content-between pl-0">
                                        <span>
                                            <FontAwesomeIcon icon={thirdCardCollapse === true ? faCaretUp : faCaretDown}/>
                                        </span>
                                        <OverlayTrigger
                                            key="third-card-top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id='third-card-tooltip-top'>
                                                    <span>Reset</span>
                                                </Tooltip>
                                            }
                                        >
                                            <button type="button" className="btn btn-primary btn-sm ml-2" onClick={() => {resetCard(3)}}>
                                                <FontAwesomeIcon icon={faUndo}/>
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body className="p-2">
                                    <div className="sg-control-input">
                                        <ul className="sg-control-input-list">
                                            <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                                                <div className="sg-control-input-list-label">
                                                    <span>Image</span>
                                                </div>
                                                <div className="sg-control-input-list-input input-group">
                                                    <label className="input-group-btn">
                                                        <span className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faUpload}/>
                                                            <input type="file" style={{ display: "none"}} onChange={(e) => {handleImageChange(e, 3)}} accept="image/*"/>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Choose image"
                                                        className="form-control w-50"
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.thirdCard.img.name &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.thirdCard.img.name
                                                        }
                                                        readOnly
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Alt</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setImgAlt(e.target.value, 3)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.thirdCard.img.alt &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.thirdCard.img.alt
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Title</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setTitle(e, 3)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.thirdCard.title &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.thirdCard.title
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Content</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <div className="sg-expandable-code-editor">
                                                        <div className="sg-workspace-expander">
                                                            <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                                                <button
                                                                    type="button"
                                                                    className="input-hover-btn btn btn-light border border-secondary p-1"
                                                                    onClick={() => {
                                                                        props.setShowEditor(true, contentIndex, 'multiCardThird');
                                                                    }}
                                                                >
                                                                    <span>Edit</span>
                                                                </button>
                                                                <input type="text" value="" disabled className="rounded"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Label</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setButtonLabel(e, 3)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.thirdCard.button.label &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.thirdCard.button.label
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>URL</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setButtonUrl(e, 3)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.thirdCard.button.url &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.thirdCard.button.url
                                                        }
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                }
                {currentColumn.content[currentColumnContentIndex][contentIndex].output.cardCounter.includes(4) &&
                    <Accordion className="mt-2">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3" className="p-2" onClick={() => collapseListener(fourthCardCollapse, 'fourthCard')}>
                                <div className="row m-0">
                                    <div className="col-md-9">
                                        <span>Fourth Card</span>
                                    </div>
                                    <div className="col-md-3 webupps-vertical-center justify-content-between pl-0">
                                        <span>
                                            <FontAwesomeIcon icon={fourthCardCollapse === true ? faCaretUp : faCaretDown}/>
                                        </span>
                                        <OverlayTrigger
                                            key="fourth-card-top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id='fourth-card-tooltip-top'>
                                                    <span>Reset</span>
                                                </Tooltip>
                                            }
                                        >
                                            <button type="button" className="btn btn-primary btn-sm ml-2" onClick={() => {resetCard(4)}}>
                                                <FontAwesomeIcon icon={faUndo}/>
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body className="p-2">
                                    <div className="sg-control-input">
                                        <ul className="sg-control-input-list">
                                            <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                                                <div className="sg-control-input-list-label">
                                                    <span>Image</span>
                                                </div>
                                                <div className="sg-control-input-list-input input-group">
                                                    <label className="input-group-btn">
                                                        <span className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faUpload}/>
                                                            <input type="file" style={{ display: "none"}} onChange={(e) => {handleImageChange(e, 4)}} accept="image/*"/>
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Choose image"
                                                        className="form-control w-50"
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.fourthCard.img.name &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.fourthCard.img.name
                                                        }
                                                        readOnly
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Alt</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setImgAlt(e.target.value, 4)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.fourthCard.img.alt &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.fourthCard.img.alt
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Title</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setTitle(e, 4)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.fourthCard.title &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.fourthCard.title
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Content</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <div className="sg-expandable-code-editor">
                                                        <div className="sg-workspace-expander">
                                                            <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                                                <button
                                                                    type="button"
                                                                    className="input-hover-btn btn btn-light border border-secondary p-1"
                                                                    onClick={() => {
                                                                        props.setShowEditor(true, contentIndex, 'multiCardFourth');
                                                                    }}
                                                                >
                                                                    <span>Edit</span>
                                                                </button>
                                                                <input type="text" value="" disabled className="rounded"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>Label</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setButtonLabel(e, 4)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.fourthCard.button.label &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.fourthCard.button.label
                                                        }
                                                    />
                                                </div>
                                            </li>
                                            <li className="sg-control-input-list-item sg-control-input-list-item-text">
                                                <div className="sg-control-input-list-label">
                                                    <span>URL</span>
                                                </div>
                                                <div className="sg-control-input-list-input">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        onChange={(e) => setButtonUrl(e, 4)}
                                                        value={
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.fourthCard.button.url &&
                                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.fourthCard.button.url
                                                        }
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                }
            </div>
            <div className="sg-control sg-control-group">
                <div className="sg-control-header">
                    <label>Background Music</label>
                </div>
                <div className="sg-control-input sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id='tooltip-top'>
                                        <span>Upload audio file for background music.</span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Audio</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input input-group">
                                <label className="input-group-btn mb-0">
                                    <span className="btn btn-primary">
                                        <FontAwesomeIcon icon={faUpload}/><input type="file" style={{ display: "none"}} onChange={handleAudioChange} accept="audio/*"/>
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Upload audio"
                                    className="form-control w-50"
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].styles.backgroundAudio.name &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].styles.backgroundAudio.name
                                    }
                                    readOnly
                                />
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id='tooltip-top'>
                                        <span>This control is shown in the editor only.</span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Audio Controls</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input input-group">
                                {currentColumn.content[currentColumnContentIndex][contentIndex].styles.backgroundAudio.url && 
                                    play ?
                                        <OverlayTrigger
                                            key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id='tooltip-top'>
                                                    <span>Pause the audio.</span>
                                                </Tooltip>
                                            }
                                        >
                                            {currentColumn.content[currentColumnContentIndex][contentIndex].styles.backgroundAudio.url !== '' ?
                                                <span type="button" className="btn btn-primary" onClick={() => bgAudioControl()}>
                                                    <FontAwesomeIcon icon={faPause}/>
                                                </span>
                                            :
                                                <span type="button" className="btn btn-primary disabled">
                                                    <FontAwesomeIcon icon={faPause}/>
                                                </span>
                                            }
                                        </OverlayTrigger>
                                    :
                                        <OverlayTrigger
                                            key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id='tooltip-top'>
                                                    <span>Play the audio.</span>
                                                </Tooltip>
                                            }
                                        >
                                            {currentColumn.content[currentColumnContentIndex][contentIndex].styles.backgroundAudio.url !== '' ?
                                                <span type="button" className="btn btn-primary" onClick={() => bgAudioControl()}>
                                                    <FontAwesomeIcon icon={faPlay}/>
                                                </span>
                                            :
                                                <span type="button" className="btn btn-primary disabled">
                                                    <FontAwesomeIcon icon={faPlay}/>
                                                </span>
                                            }
                                        </OverlayTrigger>
                                }
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sg-control sg-control-group">
                <div className="sg-control-header">
                    <label>Customize</label>
                </div>
                <div className="sg-control-input sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <OverlayTrigger
                                key="content-with-picture-top"
                                placement="top"
                                overlay={
                                    <Tooltip id='content-with-picture-tooltip-top'>
                                        <span>
                                            Choose the shape of the image.
                                        </span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Image Shape</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].styles.layout}
                                    onChange={(event) => setImgShape(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="">&nbsp;Default</option>
                                    <option value="circle">&nbsp;Circle</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>ID</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <input
                                    type="text"
                                    placeholder=""
                                    onChange={(event) => props.setFeatureId(event, contentIndex)}
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].id &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].id
                                    }
                                />
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Class</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <input
                                    type="text"
                                    placeholder=""
                                    onChange={(event) => props.setFeatureClass(event, contentIndex)}
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].class &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].class
                                    }
                                />
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
                                            <button type="button" className="input-hover-btn btn btn-light border border-secondary p-1" onClick={() => props.setShowCssEditor(true, props.contentIndex)}>
                                                <span>Add CSS</span>
                                            </button>
                                            <input type="text" value="" disabled className="rounded"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
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

export default MultiCard;
