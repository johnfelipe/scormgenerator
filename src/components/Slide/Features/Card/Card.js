import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrashAlt, faUndo } from '@fortawesome/free-solid-svg-icons';
import ColorPicker from '../../../Common/ColorPicker';

function Card(props) {

    const currentColumn = props.currentColumn;
    const currentColumnContentIndex = props.currentColumnContentIndex;
    const contentIndex = props.contentIndex;
    const [showPicker, setShowPicker] = useState(false);
    const titleBoxColor = currentColumn.content[currentColumnContentIndex][contentIndex].styles.titleBoxColor && currentColumn.content[currentColumnContentIndex][contentIndex].styles.titleBoxColor;

    const setTitle = (e) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.title = e.target.value;

        props.setColumn(currentColumnObj);
    }

    const setSubTitle = (e) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.subtitle = e.target.value;

        props.setColumn(currentColumnObj);
    }

    const setDate = (e) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.date = e.target.value;

        props.setColumn(currentColumnObj);
    }

    const setCourseId = (e) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseId = e.target.value;

        props.setColumn(currentColumnObj);
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        let files = e.target.files;
        let reader = new FileReader();

        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
            setBackgroundImg(files[0].name, reader.result);
        }
    }

    const setBackgroundImg = (name, url) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.backgroundImg.name = name;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.backgroundImg.url = url;

        props.setColumn(currentColumnObj);
    }

    const setTitleBoxColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.titleBoxColor = color;

        props.setColumn(currentColumnObj);
    }

    const setTitleBorder = (e) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].styles.titleBoxBorder = e.target.value;

        props.setColumn(currentColumnObj);
    }

    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'homePage')}>
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
                    <label>Content Setup</label>
                </div>
                <div className="sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Title</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <input
                                    type="text"
                                    placeholder=""
                                    onChange={(e) => setTitle(e)}
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.title && currentColumn.content[currentColumnContentIndex][contentIndex].output.title
                                    }
                                />
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Content</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <input
                                    type="text"
                                    placeholder=""
                                    onChange={(e) => setSubTitle(e)}
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.subtitle && currentColumn.content[currentColumnContentIndex][contentIndex].output.subtitle
                                    }
                                />
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                            <div className="sg-control-input-list-label">
                                <span>Background</span>
                            </div>
                            <div className="sg-control-input-list-input input-group">
                                <label className="input-group-btn">
                                    <span className="btn btn-primary">
                                        <FontAwesomeIcon icon={faUpload}/><input type="file" style={{ display: "none"}} onChange={handleImageChange}/>
                                    </span>
                                </label>
                                <input type="text" placeholder="Choose image" className="form-control w-50" value={currentColumn.content[currentColumnContentIndex][contentIndex].output.backgroundImg.name && currentColumn.content[currentColumnContentIndex][contentIndex].output.backgroundImg.name} readOnly/>
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
                            <div className="sg-control-input-list-label">
                                <span>Title Position</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].class}
                                    onChange={(event) => props.setFeatureClass(event, contentIndex)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="course-title-top-left">Top-left</option>
                                    <option value="course-title-bottom-left">Bottom-left</option>
                                    <option value="course-title-top-right">Top-right</option>
                                    <option value="course-title-bottom-right">Bottom-right</option>
                                    <option value="course-title-center">Center</option>
                                </select>
                            </div>
                        </li>
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
                                    <option value="border-bottom">Border-bottom</option>
                                    <option value="border-left">Border-left</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label homepage-color-scheme-label">
                                <span>Color Scheme</span>
                            </div>
                            <div className="sg-control-input-list-input homepage-color-scheme-selector">
                                <div className="btn border border-secondary rounded text-center w-100" onClick={() => showPicker ? setShowPicker(false) : setShowPicker(true)} style={{ background: titleBoxColor, cursor: 'pointer' }}>
                                    <span className="h-100 w-100 text-white">{currentColumn.content[currentColumnContentIndex][contentIndex].styles.titleBoxColor}</span>
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
                    </ul>
                </div>
            </div>
            <ColorPicker
                classNames="position-absolute homepage-color-picker"
                showPicker={showPicker}
                setBackgroundColor={setTitleBoxColor}
                defaultColor={titleBoxColor}
            />
        </div>
    )
}

export default Card;
