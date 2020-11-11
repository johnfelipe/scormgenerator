import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt, faUndo, faArrowAltCircleRight, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faUndo, faArrowAltCircleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
// import { galleryService } from '../../../../services';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// modal
// import AltTagForm from '../../../AlertModal/AltTagForm';

// components
import TabsAccordion from './TabsAccordion';

function Tabs(props) {

    const { contentIndex, currentColumn, currentColumnContentIndex } = props;
    const [tabHeader, setTabHeader] = useState('');
    const [updateTabHeader, setUpdateTabHeader] = useState('');
    const [updateTabHeaderCompareIndex, setUpdateTabHeaderCompareIndex] = useState('');
    const [isEditTabHeader, setIsEditTabHeader] = useState(false);
    // const [modalShow, setModalShow] = useState(false);
    // const [imgUrlPreview, setImgUrlPreview] = useState('');
    // const [file, setFile] = useState('');
    // const [fileIndex, setFileIndex] = useState('');

    const addTabHeader = (value) => {
        const currentColumnObj = currentColumn;

        const tabHeader = {
            tabHeader: value,
            tabContent: '',
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.push(tabHeader);

        props.setColumn(currentColumnObj);
    }

    const editTabHeader = (value, tabHeaderIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output[tabHeaderIndex].tabHeader = value;

        props.setColumn(currentColumnObj);
    }

    const deleteTabHeader = (tabHeaderIndex) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.splice(tabHeaderIndex, 1);

        props.setColumn(currentColumnObj);
    }
    
    // const handleImageChange = (e) => {
    //     let files = e.target.files;
    //     let reader = new FileReader();

    //     reader.readAsDataURL(files[0])
    //     reader.onloadend = () => {
    //         // setBackgroundImg(files[0].name, reader.result);
    //         setImgUrlPreview(reader.result);
    //     }

    //     setModalShow(true);
    //     setFile(files);
    //     setFileIndex(0);
    // }

    // const handleImageUpload = (mediaAlt, file, fileIndex) => {
    //     if (modalShow ) { 
    //         const formData = new FormData();

    //         formData.append('file', file[fileIndex]);
    //         formData.append('uid', 1);
    //         formData.append('alt', mediaAlt);

    //         galleryService.uploadFiles(formData)
    //         .then(
    //             fileObject => {
    //                 console.log(fileObject);
    //                 setBackgroundImg(fileObject.name, fileObject.image);
    //                 props.setMediaFiles(fileObject);
    //             },
    //             error => console.log(error)
    //         );
    //     }
    // }

    // const setBackgroundImg = (name, url) => {
    //     const currentColumnObj = currentColumn;

    //     currentColumnObj.content[currentColumnContentIndex][contentIndex].style.backgroundImg.url = url;
    //     currentColumnObj.content[currentColumnContentIndex][contentIndex].style.backgroundImg.name = name;

    //     props.setColumn(currentColumnObj);
    // }

    const setTabStyle = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.tabStyle = value;

        props.setColumn(currentColumnObj);
    }

    const setTabPosition = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.tabPosition = value;

        props.setColumn(currentColumnObj);
    }

    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions border-top border-gray">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'contentArea')}>
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
                    <label>Tab/s Setup</label>
                </div>
                <div className="sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item-text">
                            <div className="sg-control-input-list-label">
                                <span>Entry/ies</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <ul style={{ listStyle: 'none' }} className="list-group tabs-list">
                                    {currentColumn.content[currentColumnContentIndex][contentIndex].output.length > 0 ? 
                                        <>
                                            {currentColumn.content[currentColumnContentIndex][contentIndex].output.map((item, index) => (
                                                <li key={'number-' + index} className="tabs-list-item mb-2">
                                                    {
                                                        isEditTabHeader && updateTabHeaderCompareIndex === index ?
                                                            <div className="tabs-control-input-wrapper mb-2">
                                                                <div className="tabs-control-input-label">
                                                                    <span>{index+1}.</span>
                                                                </div>
                                                                <div className="tabs-control-input">
                                                                    <input
                                                                        id="tabHeader"
                                                                        name="tabHeader"
                                                                        type="text"
                                                                        placeholder="Type header name here. . ."
                                                                        onChange={(event) => setUpdateTabHeader(event.target.value)}
                                                                        value={updateTabHeader}
                                                                    />
                                                                </div>
                                                                <div className="tabs-control-button">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary btn-sm"
                                                                        onClick={() => {
                                                                            const isEmpty = document.getElementById("tabHeader");
                                                                            
                                                                            if (isEmpty.value !== "") {
                                                                                editTabHeader(updateTabHeader, index);
                                                                                setUpdateTabHeader('');
                                                                                setIsEditTabHeader(false);
                                                                                setUpdateTabHeaderCompareIndex('');
                                                                            }
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon icon={faPlus}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        :
                                                            <TabsAccordion
                                                                index={index}
                                                                item={item}
                                                                deleteTabHeader={deleteTabHeader}
                                                                setIsEditTabHeader={setIsEditTabHeader}
                                                                setUpdateTabHeader={setUpdateTabHeader}
                                                                contentIndex={contentIndex}
                                                                setShowEditor={props.setShowEditor}
                                                                setUpdateTabHeaderCompareIndex={setUpdateTabHeaderCompareIndex}
                                                                setActiveOutputIndex={props.setActiveOutputIndex}
                                                            />
                                                    }
                                                </li>
                                            ))}
                                            <li className="tabs-list-item">
                                                <div className="tabs-control-input-wrapper mb-2">
                                                    <div className="tabs-control-input-label">
                                                        <span>{currentColumn.content[currentColumnContentIndex][contentIndex].output.length+1}.</span>
                                                    </div>
                                                    <div className="tabs-control-input">
                                                        <input
                                                            id="tabHeader"
                                                            name="tabHeader"
                                                            type="text"
                                                            placeholder="Type header name here. . ."
                                                            onChange={(event) => setTabHeader(event.target.value)}
                                                            value={tabHeader}
                                                        />
                                                    </div>
                                                    <div className="tabs-control-button">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() => {
                                                                const isEmpty = document.getElementById("tabHeader");
                                                                
                                                                if (isEmpty.value !== "") {
                                                                    addTabHeader(tabHeader);
                                                                    setTabHeader('');
                                                                }
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faPlus}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        </>
                                    :
                                        <li className="tabs-list-item">
                                            <div className="tabs-control-input-wrapper mb-2">
                                                <div className="tabs-control-input-label">
                                                    <span>1.</span>
                                                </div>
                                                <div className="tabs-control-input">
                                                    <input
                                                        id="tabHeader"
                                                        name="tabHeader"
                                                        type="text"
                                                        placeholder="Type header name here. . ."
                                                        onChange={(event) => setTabHeader(event.target.value)}
                                                        value={tabHeader}
                                                    />
                                                </div>
                                                <div className="tabs-control-button">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => {
                                                            const isEmpty = document.getElementById("tabHeader");
                                                            
                                                            if (isEmpty.value !== "") {
                                                                addTabHeader(tabHeader);
                                                                setTabHeader('');
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
                    <label>Customize</label>
                </div>
                <div className="sg-control-input sg-control-input">
                    <ul className="sg-control-input-list">
                        {/* <li className="sg-control-input-list-item sg-control-input-list-item-upload">
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
                                        currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundImg.name &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundImg.name
                                    }
                                    readOnly
                                />
                            </div>
                        </li> */}
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id='tooltip-top'>
                                        <span>Set tabs style.</span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Tabs Style</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].style.tabStyle}
                                    onChange={(event) => setTabStyle(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="tabs">Tabs</option>
                                    <option value="pills">Pills</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id='tooltip-top'>
                                        <span>Set tabs position.</span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Tabs Position</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].style.tabPosition}
                                    onChange={(event) => setTabPosition(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="top">Top</option>
                                    <option value="left">Left</option>
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
                                        typeof currentColumn != "undefined" &&
                                        'content' in currentColumn &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        currentColumnContentIndex in currentColumn.content &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
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
                                        typeof currentColumn != "undefined" &&
                                        'content' in currentColumn &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
                                        currentColumnContentIndex in currentColumn.content &&
                                        currentColumn.content[currentColumnContentIndex].length > 0 &&
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
            {/* <AltTagForm
                imgUrlPreview={imgUrlPreview}
                file={file}
                fileIndex={fileIndex}
                handleImageUpload={handleImageUpload}
                modalShow={modalShow}
                setModalShow={setModalShow}
            /> */}
        </div>
    )
}

export default Tabs;
