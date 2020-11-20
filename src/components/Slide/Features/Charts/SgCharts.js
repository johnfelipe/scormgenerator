import React, { useState } from 'react';
import CSVReader from "react-csv-reader";
import MultiSelect from "react-multi-select-component";
import ReactHtmlParser from 'react-html-parser';
import ColorPicker from '../../../Common/ColorPicker';

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons';

// react bootstrap
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// services
import { galleryService } from '../../../../services';

// modal
import AltTagForm from '../../../AlertModal/AltTagForm';
import ChartDataAlert from '../../../AlertModal/ChartDataAlert';

// helpers
import { stringHelpers } from '../../../../helpers';

function SgCharts(props) {

    const { contentIndex, currentColumnContentIndex, currentColumn, uid } = props;
    const [modalShowAltTagForm, setModalShowAltTagForm] = useState(false);
    const [modalShowChartDataAlert, setModalShowChartDataAlert] = useState(false);
    const [modalTitle, setModalTitle] = useState(false);
    const [imgUrlPreview, setImgUrlPreview] = useState('');
    const [file, setFile] = useState('');
    const [fileIndex, setFileIndex] = useState('');
    const [properties, setProperties] = useState(currentColumn.content[currentColumnContentIndex][contentIndex].output.csvFile.headers.length > 0 ? currentColumn.content[currentColumnContentIndex][contentIndex].output.csvFile.headers : []);
    const titleTextColor = currentColumn.content[currentColumnContentIndex][contentIndex].style.titleTextColor && currentColumn.content[currentColumnContentIndex][contentIndex].style.titleTextColor;
    const titleBoxColor = currentColumn.content[currentColumnContentIndex][contentIndex].style.titleBoxColor && currentColumn.content[currentColumnContentIndex][contentIndex].style.titleBoxColor;
    const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);
    const [showTextColorPicker, setShowTextColorPicker] = useState(false);

    const parseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    }

    const handleImageChange = (e) => {
        let files = e.target.files;
        let reader = new FileReader();

        reader.readAsDataURL(files[0])
        reader.onloadend = () => {
            setImgUrlPreview(reader.result);
        }

        setModalShowAltTagForm(true);
        setFile(files);
        setFileIndex(0);
    }

    const handleImageUpload = (mediaAlt, file, fileIndex) => {
        if (modalShowAltTagForm ) { 
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

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.backgroundImg.url = url;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.backgroundImg.name = name;

        props.setColumn(currentColumnObj);
    }

    const setChartType = (value) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.chartType = value;

        props.setColumn(currentColumnObj);
    }

    const handleCsvUpload = (data, fileInfo) => {
        const currentColumnObj = currentColumn;
        const csvHeaders = [];
        const csvHeadersObj = [];

        for (const key of Object.keys(data)) {
            for (const key1 of Object.keys(data[key])) {
                if (!csvHeaders.includes(key1)) {
                    csvHeaders.push(key1);
                    csvHeadersObj.push({label: stringHelpers.ucfirst(key1), value: key1});
                }
            }
        }

        const labels = data.map(function(d) {
            return d[csvHeaders[0]];
        });

        if (typeof data[0][csvHeaders[0]] === 'string') {
            setProperties(csvHeadersObj.slice(1));
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.dataSets.labels = labels;
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.csvFile.name = fileInfo.name;
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.csvFile.headers = csvHeadersObj.slice(1);
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output.csvFile.data = data;
            props.setColumn(currentColumnObj);
        } else {
            setModalShowChartDataAlert(true);
            setModalTitle('Alert')
        }
    }

    const setShownData = (selected) => {
        const currentColumnObj = currentColumn;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.chartOptions.shownData = selected;
        props.setColumn(currentColumnObj);
    }

    const setDataSets = (data) => {
        const randomColor = require('randomcolor');
        const currentColumnObj = currentColumn;
        let dataSets = [];
        let backgroundColors = []

        const csvData = currentColumnObj.content[currentColumnContentIndex][contentIndex].output.csvFile.data;

        for (const key of Object.keys(data)) {
            const dataSet = csvData.map(function(d) {
                if (!backgroundColors.includes(randomColor())) {
                    backgroundColors.push(randomColor());
                }
                return +d[data[key].value];
            });

            dataSets.push(dataSet);
        }

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.dataSets.data = dataSets;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.dataSets.colors = backgroundColors;
        props.setColumn(currentColumnObj);
    }

    const setChartLabel = (value) => {
        const currentColumnObj = currentColumn;
        currentColumnObj.content[currentColumnContentIndex][contentIndex].output.label = value;
        props.setColumn(currentColumnObj);
    }
    
    const setTitleBorder = (e) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.titleBoxBorder = e.target.value;

        props.setColumn(currentColumnObj);
    }

    const setTitleTextColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.titleTextColor = color;

        props.setColumn(currentColumnObj);
    }

    const setTitleBoxColor = (color) => {
        const currentColumnObj = currentColumn;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].style.titleBoxColor = color;

        props.setColumn(currentColumnObj);
    }

    return (
        <div className="sg-controls">
            <div className="sg-control sg-inspector-actions">
                <div className="sg-workspace-actions border-top border-gray">
                    <button type="button" className="sg-workspace-action-item btn btn-link border-right rounded-0" onClick={() => props.resetFeature(contentIndex, 'sgCharts')}>
                        <FontAwesomeIcon icon={faUndo}/>
                        <span>Reset</span>
                    </button>
                    <button type="button" className="sg-workspace-action-item btn btn-link" onClick={() => props.deleteFeature(contentIndex)}>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
            <div className="sg-control sg-control-group webupps-overflow-unset">
                <div className="sg-control-header">
                    <label>Chart Setup</label>
                </div>
                <div className="sg-control-input sg-control-input">
                    <ul className="sg-control-input-list">
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id='tooltip-top'>
                                        <span>Choose chart type.</span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Type</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].output.chartType}
                                    onChange={(event) => setChartType(event.target.value)}
                                    className="form-control-plaintext border border-secondary rounded"
                                >
                                    <option value="pie">Pie</option>
                                    <option value="doughnut">Doughnut</option>
                                    <option value="bar">Bar</option>
                                </select>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id='tooltip-top'>
                                        <span>Upload data from csv.</span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Data</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input input-group">
                                <label className="input-group-btn mb-0">
                                    <span className="btn btn-primary">
                                        <FontAwesomeIcon icon={faUpload}/>
                                        {/* <input
                                            type="file"
                                            style={{ display: "none"}}
                                            onChange={handleCsvUpload}
                                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        /> */}
                                        <CSVReader
                                            cssClass="d-none"
                                            onFileLoaded={handleCsvUpload}
                                            parserOptions={parseOptions}
                                        />
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Upload csv file"
                                    className="form-control w-50"
                                    value={
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.csvFile.name ?
                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.csvFile.name
                                        :
                                            ''
                                    }
                                    readOnly
                                />
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-upload">
                            <div className="sg-control-input-list-label"></div>
                            <div className="sg-control-input-list-input input-group">
                                <i className="fas fa-info-circle" type="button" onClick={() => { setModalTitle('Information'); setModalShowChartDataAlert(true); }}></i>
                            </div>
                        </li>
                        <li className="sg-control-input-list-item sg-control-input-list-item-text">
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id='tooltip-top'>
                                        <span>Choose data to show.</span>
                                    </Tooltip>
                                }
                            >
                                <div className="sg-control-input-list-label">
                                    <span>Show data</span>
                                </div>
                            </OverlayTrigger>
                            <div className="sg-control-input-list-input webupps-overflow-unset">
                                <span>
                                    <MultiSelect
                                        options={properties}
                                        labelledBy={"Select"}
                                        disableSearch={true}
                                        className="webupps-charts-multiselect"
                                        value={
                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.chartOptions.shownData &&
                                            currentColumn.content[currentColumnContentIndex][contentIndex].output.chartOptions.shownData
                                        }
                                        onChange={(e) => {
                                            setShownData(e);
                                            setDataSets(e);
                                        }}
                                    />
                                </span>
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
                                    onChange={(event) => setChartLabel(event.target.value)}
                                    value={ 
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.label
                                    }
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sg-control sg-control-text-editor">
                <div className="sg-control-header d-flex justify-content-between">
                    <label>Content Setup</label>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => props.setShowEditor(true, contentIndex, 'sgCharts')}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </button>
                </div>
                <div className="sg-control-input">
                    <div className="sg-expandable-rich-text">
                        <div className="sg-workspace-expander">
                            <div tabIndex="-1" className="sg-workspace-expander-toggle ">
                                {/* <textarea
                                    className="webupps-resize-none"
                                    disabled 
                                    value={ 
                                        currentColumn.content[currentColumnContentIndex][contentIndex].output.description !== '' ?
                                            typeof ReactHtmlParser(currentColumn.content[currentColumnContentIndex][contentIndex].output.description)[0].props.children[0] !== 'object' ?
                                                ReactHtmlParser(currentColumn.content[currentColumnContentIndex][contentIndex].output.description)[0].props.children[0]
                                            :
                                                'No information provided yet.'
                                        :
                                            'No information provided yet.'
                                    }
                                /> */}
                                <div className="webupps-custom-disabled-textarea webupps-resize-none">
                                    {currentColumn.content[currentColumnContentIndex].length > 0 &&
                                    currentColumnContentIndex in currentColumn.content &&
                                    currentColumn.content[currentColumnContentIndex].length > 0 &&
                                    ReactHtmlParser(currentColumn.content[currentColumnContentIndex][contentIndex].output.description)}
                                </div>
                            </div>
                        </div>
                    </div>
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
                                <span>Title Border Position</span>
                            </div>
                            <div className="sg-control-input-list-input">
                                <select
                                    value={currentColumn.content[currentColumnContentIndex][contentIndex].style.titleBoxBorder}
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
                                        currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundImg.name &&
                                        currentColumn.content[currentColumnContentIndex][contentIndex].style.backgroundImg.name
                                    }
                                    readOnly
                                />
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
            <AltTagForm
                imgUrlPreview={imgUrlPreview}
                file={file}
                fileIndex={fileIndex}
                handleImageUpload={handleImageUpload}
                modalShow={modalShowAltTagForm}
                setModalShow={setModalShowAltTagForm}
            />
            <ChartDataAlert
                title={modalTitle}
                modalShow={modalShowChartDataAlert}
                setModalShow={setModalShowChartDataAlert}
            />
            <ColorPicker
                classNames="position-absolute sg-charts-border-color-picker"
                showPicker={showBorderColorPicker}
                setBackgroundColor={setTitleBoxColor}
                defaultColor={titleBoxColor}
            />
            <ColorPicker
                classNames="position-absolute sg-charts-text-color-picker"
                showPicker={showTextColorPicker}
                setBackgroundColor={setTitleTextColor}
                defaultColor={titleTextColor}
            />
        </div>
    )
}

export default SgCharts;
