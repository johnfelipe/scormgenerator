import React, { useState, useEffect } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { Formik, useFormikContext } from "formik";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faFileAudio, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import ReactHtmlParser from 'react-html-parser';
import * as Yup from 'yup';
import { connect } from 'react-redux';

// components
import SlideColumn from '../Slide/Columns';
import SlideFeature from '../Slide/Features';
import SlideEditor from '../Slide/Editor';
import HtmlEditor from '../Slide/HtmlEditor';
import CssEditor from '../Slide/CssEditor';
import TextEditor from '../Slide/TextEditor';

// feature layouts
import HomePageLayout from '../Slide/Layouts/HomePageLayout';
import MultipleChoiceLayout from '../Slide/Layouts/MultipleChoiceLayout';
import CourseObjLayout from '../Slide/Layouts/CourseObjLayout';

// modals
import WarningModal from '../AlertModal/Warning';

function SlideHandler (props) {

    const [modalShow, setModalShow] = useState(false);
    const [column, setColumn] = useState(props.currentColumns ? props.currentColumns : []);
    const columnSizes = [
        { id: 0,items: [{ size: "1/1", class: "sg-1-1"}]},
        { id: 1,items: [{ size: "1/2", class: "sg-1-2"}, { size: "1/2", class: "sg-1-2"}]},
        { id: 2,items: [{ size: "1/3", class: "sg-1-3"}, { size: "2/3", class: "sg-2-3"}]},
        { id: 3,items: [{ size: "2/3", class: "sg-2-3"}, { size: "1/3", class: "sg-1-3"}]},
        { id: 4,items: [{ size: "1/3", class: "sg-1-3"}, { size: "1/3", class: "sg-1-3"}, { size: "1/3", class: "sg-1-3"}]},
        { id: 5,items: [{ size: "1/4", class: "sg-1-4"}, { size: "1/4", class: "sg-1-4"}, { size: "1/4", class: "sg-1-4"}, { size: "1/4", class: "sg-1-4"}]},
        { id: 6,items: [{ size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}]},
    ];
    const features = [
        { type: 'audio', name: 'Audio', icon: faFileAudio, },
        { type: 'contentArea', name: 'Content Area', icon: faSquare, },
        { type: 'courseObjectives', name: 'Course Objectives', icon: faListAlt, },
        { type: 'homePage', name: 'Home Page', icon: faHome, },
        { type: 'multipleChoice', name: 'Multiple Choice', icon: faQuestionCircle, },
    ];
    const [activeFeature, setActiveFeature] = useState('');
    const [activeTab, setActiveTab] = useState('column');
    const [activeColumnId, setActiveColumnId] = useState(0);
    const [showHtmlEditor, setShowHtmlEditor] = useState(false);
    const [showCssEditor, setShowCssEditor] = useState(false);
    const [showTextEditor, setShowTextEditor] = useState(false);
    const [activeContentIndex, setActiveCotentIndex] = useState(0);
    const [currentColumnContentIndex, setCurrentColumnContentIndex] = useState('subColumnOne');
    const [isSlideNameNotEmpty, setIsSlideNameNotEmpty] = useState(props.currentSlideName ? true : false);
    const [applyCss, setApplyCss] = useState(false);
    const [contentFor, setContentFor] = useState('');
    const { submitForm } = useFormikContext();

    useEffect(() => {
        console.log('state.columns: ');
        console.log(column);
        console.log('props.columns: ');
        console.log(props.currentColumns);
    }, [props.currentColumns, column]);

    const handleSubmit = () => {
        submitForm();
    }

    const setShowModal = (value, action) => {
        setModalShow(value);

        if (action === "close" || action === "edit") {
            console.log('Edit here');

            setColumn(props.currentColumns ? props.currentColumns : []);
            setActiveFeature('');
            setActiveColumnId(0);
            setActiveTab('column');
            setActiveCotentIndex(0);
        }

        if (action === "add") {
            console.log('Add here');

            setColumn([]);
            setActiveFeature('');
            setActiveColumnId(0);
            setActiveTab('column');
            setActiveCotentIndex(0);
        }
    }

    const addColumn = () => {
        const currentCount = column.length + 1;
        const columnObj = { type: 'column', name: 'Column ' + currentCount, active: 0, grid: 0, id: 'column' + currentCount, content: [] }
        columnObj.content = {
            subColumnOne: []
        };

        setColumn([...column, columnObj]);
        setCurrentColumnContentIndex('subColumnOne');

        handleSubmit();
    }

    const deleteColumn = (index) => {
        console.log('index:');
        console.log(index);

        const columnArr = [...column];
        columnArr.splice(index, 1);

        setColumn(columnArr);
    }
    
    const handleContentEditable = (event, index) => {
        const columnObj = column;

        columnObj[index].name = event.target.value;

        setColumn(columnObj);
    }

    const handleSizeActive = (columnIndex, sizeIndex, grid) => {
        const columnSizesObj = column;

        columnSizesObj[columnIndex].active = sizeIndex;
        columnSizesObj[columnIndex].grid = grid;

        if (grid === 1 || grid === 2 || grid === 3) {
            columnSizesObj[columnIndex].content = {
                subColumnOne: [],
                subColumnTwo: [],
            };
        } else if (grid === 4) {
            columnSizesObj[columnIndex].content = {
                subColumnOne: [],
                subColumnTwo: [],
                subColumnThree: [],
            };
        } else if (grid === 5) {
            columnSizesObj[columnIndex].content = {
                subColumnOne: [],
                subColumnTwo: [],
                subColumnThree: [],
                subColumnFour: [],
            };
        } else if (grid === 6) {
            columnSizesObj[columnIndex].content = {
                subColumnOne: [],
                subColumnTwo: [],
                subColumnThree: [],
                subColumnFour: [],
                subColumnFive: [],
            };
        } else {
            columnSizesObj[columnIndex].content = {
                subColumnOne: [],
            };
        }

        setColumn(columnSizesObj);
    }

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    // const move = (source, destination, droppableSource, droppableDestination) => {
    //     const sourceClone = Array.from(source);
    //     const destClone = Array.from(destination);
    //     const [removed] = sourceClone.splice(droppableSource.index, 1);

    //     destClone.splice(droppableDestination.index, 0, removed);

    //     const result = {};
    //     result[droppableSource.droppableId] = sourceClone;
    //     result[droppableDestination.droppableId] = destClone;

    //     return result;
    // };

    const onDragEnd = result => {
        const { source, destination } = result;
        
        console.log(source);
        console.log(destination);

        // dropped outside the list
        if (!destination) {
            return;
        }

        if ((source.droppableId === "columns") && (destination.droppableId === "columns")) {

            if (activeColumnId === source.index) {
                setActiveColumnId(destination.index);
            } else if (activeColumnId === destination.index) {
                setActiveColumnId(source.index);
            }
            
            const currentColumnList = column;

            const reordered_slides = reorder(
                currentColumnList,
                source.index,
                destination.index
            );
            let columns = reordered_slides;
            
            setColumn(columns);

            // setState({
            //     column: columns,
            // })
        }

        if ((source.droppableId === "features") && (destination.droppableId !== "features")) {
            const currentColumns = column;

            setActiveTab("editor");

            for (var key in currentColumns) {
                if (destination.droppableId === currentColumns[key]['id']) {
                    // First Size
                    setCurrentColumnContentIndex('subColumnOne');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);

                    const currentFeatures = features;
                    
                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));

                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: 'No audio added.', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));

                    } else if (currentFeatures[source.index]['type'] === 'multipleChoice') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: [], class: 'question-files-left', id: '', styles: { questionLabelClass: 'rounded-circle', questionBackgroundColor: '#fff', multipleChoiceTextColor: 'text-black' }, mechanics: { repeat: 0, passingRate: 80, specificType: 'knowledgeCheck', returnSlide: 0 } };
                        currentColumns[key].content.subColumnOne.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));

                    } else if (currentFeatures[source.index]['type'] === 'homePage') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: { title: 'Title', subtitle: 'Subtitle', date: 'January 1970', courseId: '1234567890', backgroundImg: { name: '', url: '' } }, class: 'course-title-bottom-left', id: '', colorScheme: { titleBoxColor: '#0069d9' } };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));

                    } else if (currentFeatures[source.index]['type'] === 'courseObjectives') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: { courseInfo: { name: 'Course Information', content: 'No information provided yet.'}, courseReq:  { name: 'Course Requirements', content: 'No requirements provided yet.'}, }, class: '', id: '', styles: { courseIntroColor: '#0069d9' }, introVideo: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));

                    }
                    
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-2-1')) {
                    // Second Size

                    // setState({
                    //     currentColumnContentIndex: 'subColumnOne',
                    // });

                    setCurrentColumnContentIndex('subColumnOne');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));

                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));

                    }

                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-2-2')) {

                    setCurrentColumnContentIndex('subColumnTwo');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnTwo.length - 1));

                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnTwo.length - 1));
;
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-1')) {
                    // Third Size

                    setCurrentColumnContentIndex('subColumnOne');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));

                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));

                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-2-3-2')) {

                    setCurrentColumnContentIndex('subColumnTwo');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnTwo.length - 1));

                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnTwo.length - 1));
;
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-2-3-1')) {
                    // Fourth Size

                    setCurrentColumnContentIndex('subColumnOne');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-2')) {

                    setCurrentColumnContentIndex('subColumnTwo');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnTwo.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnTwo.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnTwo.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnTwo.length - 1));
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-1-1')) {
                    // Fifth Size

                    setCurrentColumnContentIndex('subColumnOne');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-1-2')) {

                    setCurrentColumnContentIndex('subColumnTwo');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnTwo.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnTwo.length - 1));
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-1-3')) {

                   setCurrentColumnContentIndex('subColumnThree');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnThree.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnThree.length - 1));;
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-4-1')) {
                    // Sixth Size

                    setCurrentColumnContentIndex('subColumnOne');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-4-2')) {

                    setCurrentColumnContentIndex('subColumnTwo');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnTwo.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnTwo.length - 1));
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-4-3')) {

                   setCurrentColumnContentIndex('subColumnThree');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnThree.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnThree.length - 1));;
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-4-4')) {

                    setCurrentColumnContentIndex('subColumnFour');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnFour.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnFour.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnFour.push(currentContent);
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnFour.length - 1));;
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-1')) {
                    // Seventh Size

                    setCurrentColumnContentIndex('subColumnOne');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnOne.length - 1));
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-2')) {

                    setCurrentColumnContentIndex('subColumnTwo');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnTwo.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnTwo.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        
                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnTwo.length - 1));
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-3')) {

                   setCurrentColumnContentIndex('subColumnThree');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnThree.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnThree.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnThree.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnThree.length - 1));;
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-4')) {

                    setCurrentColumnContentIndex('subColumnFour');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnFour.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnFour.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnFour.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnFour.length - 1));;
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-5')) {

                    setCurrentColumnContentIndex('subColumnFive');

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnFive.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnFive.length - 1));
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnFive.push(currentContent);

                        setColumn(currentColumns);
                        setActiveFeature(currentFeatures[source.index]['type']);
                        setActiveColumnId(destination.index);
                        setActiveCotentIndex((currentColumns[key].content.subColumnFive.length - 1));;
                    }
                }
            }
        }

        if ((source.droppableId === destination.droppableId) && (source.droppableId !== "features" || destination.droppableId !== "features") && (source.droppableId !== "columns" || destination.droppableId !== "columns")) {
            const currentColumnList = column;
            console.log(activeColumnId);
            console.log(currentColumnContentIndex);
            const reorderedFeatures = reorder(
                currentColumnList[activeColumnId].content[currentColumnContentIndex],
                source.index,
                destination.index
            );
            currentColumnList[activeColumnId].content[currentColumnContentIndex] = reorderedFeatures;
            let columns = currentColumnList;
            
            if (activeContentIndex === source.index) {
                setColumn(columns);
                setActiveCotentIndex(destination.index);
            } else if (activeContentIndex === destination.index) {
                setColumn(columns);
                setActiveCotentIndex(source.index);
            }
                
        }
    }

    const onChangeTextArea = (event, contentIndex, editorType) => {
        const currentColumnObj = column[activeColumnId];

        if (editorType === 'html') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output = event.target.value;
        } else if (editorType === 'css') {
            try {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].css = event;
            } catch (err) { console.log(err) }
        } else if (editorType.type === 'text') {
            if (editorType.for === 'courseInfo') {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseInfo.content = event.target.value;
            } else if (editorType.for === 'courseReq') {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseReq.content = event.target.value;
            }
        }

        const columns = column;
        columns[activeColumnId] = currentColumnObj;

        setColumn(columns);
    }

    const contentPaneClick = (index, contentIndex, elementId, currentColumnContentIndex) => {
        const elem = document.getElementById(elementId);
        const prevElemId = localStorage.getItem('prevElemId');
        const elemClasses = elem.getAttribute('class');
        const prevElem = document.getElementById(prevElemId);
        let prevElemClasses = '';

        if (prevElem !== null) {
            prevElemClasses = prevElem.getAttribute('class');
        }

        if (((prevElemId === null) || (prevElemId !== null)) && (elem !== null)) {
            localStorage.setItem('prevElemId', elementId);
            elem.focus();
            elem.classList.add("border");
            elem.classList.add("border-dark");

            if (elemClasses.includes("content-output")) {
                elem.classList.add("active-column");
            }
        } 

        if ((prevElemId !== elementId) && (prevElemId !== null)) {
            const prevElem = document.getElementById(prevElemId);

            if (prevElem !== null) {
                prevElem.classList.remove("border");
                prevElem.classList.remove("border-dark");

                if (prevElemClasses.includes("content-output")) {
                    prevElem.classList.remove("active-column");
                }
            }
        }

        if ((column[index].content[currentColumnContentIndex].length > 0) && (typeof column[index].content[currentColumnContentIndex][contentIndex] !== "undefined")) {
            
            setActiveFeature(column[index].content[currentColumnContentIndex][contentIndex].type);
            setActiveColumnId(index);
            setActiveTab('editor');
            setActiveCotentIndex(contentIndex);
            setCurrentColumnContentIndex(currentColumnContentIndex);
            setShowHtmlEditor(false);
        }
    }

    const deleteFeature = (contentIndex) => {
        const currentColumnContent = column[activeColumnId].content[currentColumnContentIndex];
        currentColumnContent.splice(contentIndex, 1);

        const columns = column;
        columns[activeColumnId].content[currentColumnContentIndex] = currentColumnContent;

        setColumn(columns);
        setActiveFeature('');
        setActiveColumnId(0);
        setActiveTab('column');
        setActiveCotentIndex(0);
    }

    const setHtmlEditorShow = (value, contentIndex) => {
        setShowHtmlEditor(value);
        setActiveCotentIndex(contentIndex);
    }

    const setCssEditorShow = (value, contentIndex) => {
        setShowCssEditor(value);
        setActiveCotentIndex(contentIndex);
    }

    const setFeatureId = (event, contentIndex) => {
        const currentColumnObj = column[activeColumnId];

        currentColumnObj.content[currentColumnContentIndex][contentIndex].id = event.target.value;

        const columns = column;
        columns[activeColumnId] = currentColumnObj;

        setColumn(columns);
    }

    const setFeatureClass = (event, contentIndex) => {
        const currentColumnObj = column[activeColumnId];

        currentColumnObj.content[currentColumnContentIndex][contentIndex].class = event.target.value;

        const columns = column;
        columns[activeColumnId] = currentColumnObj;

        setColumn(columns);
    }

    const onChangeRadio = (dataUrl, type, contentIndex) => {
        const currentColumnObj = column[activeColumnId];

        const audioHtml = "<audio id='feature-audio' controls><source src='" + dataUrl +"' type='" + type +"'><p>Your browser doesn't support HTML5 audio. Here is a <a href='" + dataUrl +"'>link to the audio</a> instead.</p></audio>";

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output = audioHtml;

        const columns = column;
        columns[activeColumnId] = currentColumnObj;

        setColumn(columns);
    }

    const cssApplier = (str, featureId) => {
        if (applyCss) {
            const res = str.replace("$elem", '#' + featureId);
            let css = '\n' + res + '\n',
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            head.appendChild(style);

            style.type = 'text/css';
            if (style.styleSheet){
                // This is required for IE8 and below.
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            setApplyCss(false);
        }
    }

    const setColumnInDirect = (currentColumnObj) => {

        const columns = column;
        columns[activeColumnId] = currentColumnObj;

        setColumn(columns);
    }

    const resetStates = () => {

        setActiveFeature('');
        setActiveTab('column');
        setActiveColumnId(0);
        setShowHtmlEditor(false);
        setShowCssEditor(false);
        setActiveCotentIndex(0);
        setCurrentColumnContentIndex('subColumnOne');
        setIsSlideNameNotEmpty(false);
        setApplyCss(false);
    }

    const setTextEditorShow = (value, contentIndex, contentFor) => {

        setShowTextEditor(value);
        setContentFor(contentFor);
        setActiveCotentIndex(contentIndex);
    }

    const resetFeature = (contentIndex, featureType) => {
        const currentColumnObj = column[activeColumnId];

        if (featureType === "audio") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = { type: 'audio', output: 'No audio added.', class: '', id: '' };
        } else if (featureType === "contentArea") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = { type: 'contentArea', output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
        } else if (featureType === "multipleChoice") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = { type: 'multipleChoice', output: [], class: 'question-files-left', id: '', styles: { questionLabelClass: 'rounded-circle', questionBackgroundColor: '#fff', multipleChoiceTextColor: 'text-black' }, mechanics: { repeat: 0, passingRate: 80, specificType: 'knowledgeCheck', returnSlide: 0 } };
        } else if (featureType === "homePage") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = { type: 'homePage', output: { title: 'Title', subtitle: 'Subtitle', date: 'January 1970', courseId: '1234567890', backgroundImg: { name: '', url: '' } }, class: 'course-title-bottom-left', id: '', colorScheme: { titleBoxColor: '#0069d9' } };
        } else if (featureType === "courseObjectives") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = { type: 'courseObjectives', output: { courseInfo: { name: 'Course Information', content: 'No information provided yet.'}, courseReq:  { name: 'Course Requirements', content: 'No requirements provided yet.'} }, class: '', id: '', styles: { courseIntroColor: '#0069d9' }, introVideo: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4' };
        }

        const columns = column;
        columns[activeColumnId] = currentColumnObj;

        setColumn(columns);
    }

    const onSave = (slide, subtitle, columns, lessonIndex) => {
        if (props.action === "add") {
            const slideObj = {slideName: slide, slideSubtitle: subtitle, columns: columns}
            props.addSlideChange(slideObj, lessonIndex);
            console.log("add");
        } else if (props.action === "edit") {
            const slideObj = {slideName: slide, slideSubtitle: subtitle, columns: columns}
            props.editSlideChange(slideObj, lessonIndex, props.currentClickedLessonId);
            console.log("edit");
            console.log(lessonIndex);
            console.log(props.currentClickedLessonId);
            console.log(slideObj);
        }
        
        setShowModal(false, 'save');
    }

    const slideModal = (
        <Modal
            show={modalShow}
            onHide={() => setShowModal(false, 'close')}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="slide-modal-width"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.action === "add" ?
                        <span>Add Slide</span>
                        :
                        <span>Edit Slide</span>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ 
                        slideName: props.currentSlideName ? props.currentSlideName : '',
                        slideSubtitle: props.currentSlideSubtitle ? props.currentSlideSubtitle : '',
                        showTitle: props.slide.hide_title ? props.slide.hide_title : '',
                    }}

                    onSubmit={values => {
                        
                        console.log('Submitted');
                        onSave(values.slideName, values.slideSubtitle, column, props.lessonIndex);

                        // create slide
                        // lid and uid are temporary
                        props.createSlide(1, values.slideName, 1, values.showTitle);

                        props.setSlideItemIndex(props.slideId + 1);

                        // create column
                        // sid and uid are temporary
                        props.createColumn(1, 1, column);

                    }}

                    validationSchema={Yup.object().shape({
                        slideName: Yup.string()
                        .required("Slide name required"),
                    }
                )}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="slideName">Title:</label>
                                <input
                                    id="slideName"
                                    name="slideName"
                                    type="text"
                                    className={(errors.slideName && touched.slideName && "error form-control d-inline") || "form-control d-inline"}
                                    onBlur={(e) => {
                                            handleBlur(e)

                                            if (e.target.value.trim() === "") {
                                                setIsSlideNameNotEmpty(false);
                                            }

                                        }
                                    }
                                    value={values.slideName}
                                    onChange={(e) => {
                                            handleChange(e)

                                            if (e.target.value.trim() !== "") {
                                                setIsSlideNameNotEmpty(true);
                                            }
                                        }
                                    }
                                    placeholder="Type title here . . ."
                                />
                                {errors.slideName && touched.slideName && (
                                    <div className="input-feedback">{errors.slideName}</div>
                                )}
                                <input
                                    id="showTitle"
                                    name="showTitle"
                                    type="checkbox"
                                    value={values.showTitle}
                                    checked={values.showTitle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <label htmlFor="showTitle" className="ml-1 mt-2"> Display Title</label>
                                <label htmlFor="slideSubtitle" className="d-block">Subtitle:</label>
                                <input
                                    id="slideSubtitle"
                                    name="slideSubtitle"
                                    type="text"
                                    className="form-control d-inline mb-2"
                                    onBlur={(e) => {
                                            handleBlur(e)

                                            if (e.target.value.trim() === "") {
                                                setIsSlideNameNotEmpty(false);
                                            }

                                        }
                                    }
                                    value={values.slideSubtitle}
                                    onChange={(e) => {
                                            handleChange(e)

                                            if (e.target.value.trim() !== "") {
                                                setIsSlideNameNotEmpty(true);
                                            }
                                        }
                                    }
                                    placeholder="Type subtitle here . . ."
                                />
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <div className="row mt-2">
                                        <div id="slide-sidebar" className="col-md-3 pr-0">
                                            <Tabs activeKey={activeTab} onSelect={setActiveTab} id="uncontrolled-tab" className="text-center">
                                                <Tab eventKey="column" title="Column" className="mt-1">
                                                    <div className="sg-workspace-content-section">
                                                        {
                                                            column.length !== 0 ?
                                                                <Droppable droppableId="columns">
                                                                    {(provided) => (
                                                                        <div ref={provided.innerRef}>
                                                                            {column.map((item, columnIndex) => (
                                                                                <Draggable
                                                                                    key={'column-draggable-' + columnIndex}
                                                                                    draggableId={'column-' + columnIndex}
                                                                                    index={columnIndex}>
                                                                                    {(provided) => (
                                                                                        <div
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}
                                                                                            id={'column-' + columnIndex}
                                                                                        >
                                                                                            <SlideColumn 
                                                                                                columnIndex={columnIndex}
                                                                                                currentColumn={item}
                                                                                                currentColumnContentIndex={currentColumnContentIndex}
                                                                                                name={item.name}
                                                                                                deleteColumn={deleteColumn}
                                                                                                columnSizes={columnSizes}
                                                                                                column={column}
                                                                                                handleSizeActive={handleSizeActive}
                                                                                                resetStates={resetStates}
                                                                                                handleContentEditable={handleContentEditable}
                                                                                            />
                                                                                        </div>
                                                                                    )}
                                                                                </Draggable>
                                                                            ))}
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                            :
                                                            <span></span>
                                                        }
                                                        {
                                                            isSlideNameNotEmpty || props.currentSlideName ?
                                                                <button type="button" className="sg-add-sortable-column-after" onClick={addColumn}>
                                                                    <span><FontAwesomeIcon icon={faPlus}/>Add Column</span>
                                                                </button>
                                                            :
                                                                <WarningModal 
                                                                    fieldType="buttonWithIcon"
                                                                    btnClasses="sg-add-sortable-column-after"
                                                                    icon={faPlus}
                                                                    btnLabel="Add Column"
                                                                    modalMessage="Please enter a slide name first"
                                                                />
                                                        }
                                                        
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="features" title="Features" className="mt-1">
                                                    <Droppable droppableId="features">
                                                        {(provided) => (
                                                            <div ref={provided.innerRef} className="sg-feature-list">
                                                                {features.map((item, featureIndex) => (
                                                                    <Draggable
                                                                        key={'feature-draggable-' + featureIndex}
                                                                        draggableId={'feature-' + featureIndex}
                                                                        index={featureIndex}
                                                                    >
                                                                        {(provided) => (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                className="sg-feature-list-item"
                                                                            >
                                                                                <SlideFeature
                                                                                    icon={item.icon}
                                                                                    name={item.name}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                ))}
                                                                {provided.placeholder}
                                                            </div>
                                                        )}
                                                    </Droppable>
                                                </Tab>
                                                <Tab eventKey="editor" title="Editor" className="mt-1">
                                                    <SlideEditor 
                                                        setColumnInDirect={setColumnInDirect}
                                                        feature={activeFeature} 
                                                        currentColumn={column[activeColumnId]}
                                                        contentIndex={activeContentIndex}
                                                        setShowEditor={setHtmlEditorShow}
                                                        deleteFeature={deleteFeature}
                                                        setShowCssEditor={setCssEditorShow}
                                                        setFeatureId={setFeatureId}
                                                        setFeatureClass={setFeatureClass}
                                                        currentColumnContentIndex={currentColumnContentIndex}
                                                        onChangeTextArea={onChangeTextArea}
                                                        mediaFilesObject={props.mediaFilesObject}
                                                        onChangeRadio={onChangeRadio}
                                                        addMediaFiles={props.addMediaFiles}
                                                        galleryHandler={props.galleryHandler}
                                                        setShowTextEditor={setTextEditorShow}
                                                        resetFeature={resetFeature}
                                                        slideItemId={props.slideItemId}
                                                    />
                                                </Tab>
                                            </Tabs>
                                        </div>
                                        <div id="slide-content" className="col-md-9 pl-0">
                                            <div id="slide-content-container" className="border p-3 h-100">
                                                {
                                                    column.length > 0 ?
                                                        column.map((item, index) => (
                                                            item.grid === 0 || item.grid === -1 ?
                                                                <Droppable key={index} droppableId={item.id}>
                                                                    {/* First Size */}
                                                                    {(provided) => (
                                                                        <div ref={provided.innerRef} className="container p-0 pb-3">
                                                                            { 
                                                                                typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                    item.content['subColumnOne'].length > 0 ?
                                                                                        <div
                                                                                            id={item.id}
                                                                                            className="p-3 text-center sg-column mt-2 w-100" tabIndex="0"
                                                                                        >
                                                                                            {
                                                                                                item.content['subColumnOne'].map((contentFirst, contentFirstIndex) => (
                                                                                                    <Draggable
                                                                                                        key={'feature-' + contentFirst.type + '-' + contentFirstIndex}
                                                                                                        draggableId={contentFirst.type + '-' + contentFirstIndex + '-' + item.id}
                                                                                                        index={contentFirstIndex}
                                                                                                    >
                                                                                                        {(provided) => (
                                                                                                            <>
                                                                                                                {contentFirst.type === 'homePage' &&
                                                                                                                    <div 
                                                                                                                        ref={provided.innerRef}
                                                                                                                        {...provided.draggableProps}
                                                                                                                        {...provided.dragHandleProps}

                                                                                                                        key={item.id + '-content-output-' + contentFirstIndex}
                                                                                                                        className="content-output"
                                                                                                                        id={item.id + '-content-output-' + contentFirstIndex}
                                                                                                                        onClick={() => 
                                                                                                                            contentPaneClick(
                                                                                                                                index, 
                                                                                                                                contentFirstIndex, 
                                                                                                                                contentFirst.id ? 
                                                                                                                                contentFirst.id
                                                                                                                                    : 
                                                                                                                                item.id + '-content-output-' + contentFirstIndex,
                                                                                                                                'subColumnOne'
                                                                                                                            )
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <HomePageLayout
                                                                                                                            title={contentFirst.output.title}
                                                                                                                            subtitle={contentFirst.output.subtitle}
                                                                                                                            date={contentFirst.output.date}
                                                                                                                            courseId={contentFirst.output.courseId}
                                                                                                                            backgroundImg={contentFirst.output.backgroundImg}
                                                                                                                            homePageClass={contentFirst.class}
                                                                                                                            colorScheme={contentFirst.colorScheme}
                                                                                                                            homepageId={contentFirst.id}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }
                                                                                                            
                                                                                                                {contentFirst.type === 'multipleChoice' &&
                                                                                                                    <div 
                                                                                                                        ref={provided.innerRef}
                                                                                                                        {...provided.draggableProps}
                                                                                                                        {...provided.dragHandleProps}

                                                                                                                        key={item.id + '-content-output-' + contentFirstIndex}
                                                                                                                        className="content-output"
                                                                                                                        id={item.id + '-content-output-' + contentFirstIndex}
                                                                                                                        onClick={() => 
                                                                                                                            contentPaneClick(
                                                                                                                                index, 
                                                                                                                                contentFirstIndex,
                                                                                                                                item.id + '-content-output-' + contentFirstIndex,
                                                                                                                                'subColumnOne'
                                                                                                                            )
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <MultipleChoiceLayout
                                                                                                                            multipleChoice={contentFirst.output}
                                                                                                                            multipleChoiceClass={contentFirst.class}
                                                                                                                            multipleChoiceId={contentFirst.id}
                                                                                                                            multipleChoiceStyles={contentFirst.styles}
                                                                                                                            multipleChoiceCss={contentFirst.css}
                                                                                                                            cssApplier={cssApplier}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }

                                                                                                                {contentFirst.type === 'courseObjectives' &&
                                                                                                                    <div 
                                                                                                                        ref={provided.innerRef}
                                                                                                                        {...provided.draggableProps}
                                                                                                                        {...provided.dragHandleProps}

                                                                                                                        key={item.id + '-content-output-' + contentFirstIndex}
                                                                                                                        className="content-output"
                                                                                                                        id={item.id + '-content-output-' + contentFirstIndex}
                                                                                                                        onClick={() => 
                                                                                                                            contentPaneClick(
                                                                                                                                index, 
                                                                                                                                contentFirstIndex,
                                                                                                                                item.id + '-content-output-' + contentFirstIndex,
                                                                                                                                'subColumnOne'
                                                                                                                            )
                                                                                                                        }
                                                                                                                    >
                                                                                                                        <CourseObjLayout
                                                                                                                            styles={contentFirst.styles}
                                                                                                                            output={contentFirst.output}
                                                                                                                            introVideo={contentFirst.introVideo}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }
                                                                                                                    
                                                                                                                {contentFirst.type !== 'multipleChoice' && contentFirst.type !== 'homePage' && contentFirst.type !== 'courseObjectives' &&
                                                                                                                    <div 
                                                                                                                        ref={provided.innerRef}
                                                                                                                        {...provided.draggableProps}
                                                                                                                        {...provided.dragHandleProps}

                                                                                                                        key={item.id + '-content-output-' + contentFirstIndex} 
                                                                                                                        id={
                                                                                                                            contentFirst.id ? 
                                                                                                                                contentFirst.id
                                                                                                                            : 
                                                                                                                                item.id + '-content-output-' + contentFirstIndex
                                                                                                                        } 
                                                                                                                        className={
                                                                                                                            contentFirst.class ? 
                                                                                                                                contentFirst.class + " content-output"
                                                                                                                            : 
                                                                                                                                "content-output"
                                                                                                                        } 
                                                                                                                        onClick={() => 
                                                                                                                            contentPaneClick(
                                                                                                                                index, 
                                                                                                                                contentFirstIndex, 
                                                                                                                                contentFirst.id ? 
                                                                                                                                contentFirst.id
                                                                                                                                    : 
                                                                                                                                item.id + '-content-output-' + contentFirstIndex,
                                                                                                                                'subColumnOne'
                                                                                                                            )
                                                                                                                        }
                                                                                                                    >
                                                                                                                        {
                                                                                                                            contentFirst.css ? 
                                                                                                                                contentFirst.css[contentFirst.css.length - 1] === '}' ?
                                                                                                                                    cssApplier(
                                                                                                                                        contentFirst.css, 
                                                                                                                                        contentFirst.id ? 
                                                                                                                                            contentFirst.id
                                                                                                                                                : 
                                                                                                                                            item.id + '-content-output-' + contentFirstIndex
                                                                                                                                    )
                                                                                                                                :
                                                                                                                                    null
                                                                                                                            : 
                                                                                                                                null
                                                                                                                        }
                                                                                                                        {ReactHtmlParser(contentFirst.output)}
                                                                                                                    </div>
                                                                                                                }
                                                                                                            </>
                                                                                                        )}
                                                                                                    </Draggable>
                                                                                                ))
                                                                                            }
                                                                                        </div>
                                                                                                
                                                                                    :
                                                                                        <div id={item.id} className="p-5 text-center sg-column mt-2 w-100" tabIndex="0">
                                                                                            {item.name}
                                                                                        </div>
                                                                                :

                                                                                    <div id={item.id} className="p-5 text-center sg-column mt-2 w-100" tabIndex="0">
                                                                                        {item.name}
                                                                                    </div>
                                                                            }
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                            :
                                                                item.grid === 1 ?
                                                                    <div key={Math.random()} className="container p-0 pb-3">
                                                                        {/* Second Size */}
                                                                        <div className="row w-100 m-0">
                                                                            <Droppable droppableId={item.id + '-sg-1-2-1'}>
                                                                                {(provided) => (
                                                                                    <div 
                                                                                    key={'sg-1-2-1-' + index} 
                                                                                    ref={provided.innerRef} 
                                                                                    id={'sg-1-2-1-' + index} 
                                                                                    className="d-inline p-5 text-center sg-column sg-1-2" tabIndex="0"
                                                                                >
                                                                                        {
                                                                                            typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                                item.content['subColumnOne'].length > 0 ?
                                                                                                    item.content['subColumnOne'].map((contentFirst, contentFirstIndex) =>(
                                                                                                        <div 
                                                                                                            key={'sg-1-2-1-content-output-' + contentFirstIndex} 
                                                                                                            id={
                                                                                                                contentFirst.id ? 
                                                                                                                    contentFirst.id 
                                                                                                                : 
                                                                                                                    'sg-1-2-1-content-output-' + contentFirstIndex
                                                                                                            } 
                                                                                                            className={
                                                                                                                contentFirst.class ? 
                                                                                                                    contentFirst.class + " content-output"
                                                                                                                : 
                                                                                                                    "content-output"
                                                                                                            }  
                                                                                                            onClick={() => 
                                                                                                                contentPaneClick(
                                                                                                                    index, 
                                                                                                                    contentFirstIndex, 
                                                                                                                    contentFirst.id ? 
                                                                                                                        contentFirst.id 
                                                                                                                    : 
                                                                                                                        'sg-1-2-1-content-output-' + contentFirstIndex, 
                                                                                                                    'subColumnOne'
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            {
                                                                                                                contentFirst.css ? 
                                                                                                                    contentFirst.css[contentFirst.css.length - 1] === '}' ?
                                                                                                                        cssApplier(
                                                                                                                            contentFirst.css, 
                                                                                                                            contentFirst.id ? 
                                                                                                                                contentFirst.id 
                                                                                                                            : 
                                                                                                                                'sg-1-2-1-content-output-' + contentFirstIndex  
                                                                                                                    )
                                                                                                                    :
                                                                                                                        null
                                                                                                                : 
                                                                                                                    null
                                                                                                            }
                                                                                                            {ReactHtmlParser(contentFirst.output)}
                                                                                                        </div>
                                                                                                    ))
                                                                                                :
                                                                                                    item.name
                                                                                            :
                                                                                                item.name
                                                                                        }
                                                                                        {provided.placeholder}
                                                                                    </div>
                                                                                )}
                                                                            </Droppable>
                                                                            <Droppable droppableId={item.id + '-sg-1-2-2'}>
                                                                                {(provided) => (
                                                                                    <div 
                                                                                        key={'sg-1-2-2-' + index} 
                                                                                        ref={provided.innerRef} 
                                                                                        id={'sg-1-2-2-' + index} 
                                                                                        className="d-inline p-5 text-center sg-column sg-1-2" tabIndex="1"
                                                                                    >
                                                                                        {
                                                                                            typeof item.content['subColumnTwo'] != "undefined" ? 
                                                                                                item.content['subColumnTwo'].length > 0 ?
                                                                                                    item.content['subColumnTwo'].map((contentSecond, contentSecondIndex) =>(
                                                                                                        <div 
                                                                                                            key={'sg-1-2-2-content-output-' + contentSecondIndex} 
                                                                                                            id={
                                                                                                                contentSecond.id ? 
                                                                                                                    contentSecond.id 
                                                                                                                : 
                                                                                                                    'sg-1-2-2-content-output-' + contentSecondIndex
                                                                                                            } 
                                                                                                            className={
                                                                                                                contentSecond.class ? 
                                                                                                                    contentSecond.class + " content-output"
                                                                                                                : 
                                                                                                                    "content-output"
                                                                                                            } 
                                                                                                            onClick={() => 
                                                                                                                contentPaneClick(
                                                                                                                    index, 
                                                                                                                    contentSecondIndex, 
                                                                                                                    contentSecond.id ? 
                                                                                                                        contentSecond.id 
                                                                                                                    : 
                                                                                                                        'sg-1-2-2-content-output-' + contentSecondIndex, 
                                                                                                                    'subColumnTwo'
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            {
                                                                                                                contentSecond.css ? 
                                                                                                                    contentSecond.css[contentSecond.css.length - 1] === '}' ?
                                                                                                                        cssApplier(
                                                                                                                            contentSecond.css, 
                                                                                                                            contentSecond.id ? 
                                                                                                                                contentSecond.id 
                                                                                                                            : 
                                                                                                                                'sg-1-2-2-content-output-' + contentSecondIndex
                                                                                                                        )
                                                                                                                    :
                                                                                                                        null
                                                                                                                : 
                                                                                                                    null
                                                                                                            }
                                                                                                            {ReactHtmlParser(contentSecond.output)}
                                                                                                        </div>
                                                                                                    ))
                                                                                                :
                                                                                                    item.name
                                                                                            :
                                                                                                item.name
                                                                                        }
                                                                                        {provided.placeholder}
                                                                                    </div>
                                                                                )}
                                                                            </Droppable>
                                                                        </div>
                                                                    </div>
                                                                :
                                                                    item.grid === 2 ?
                                                                        
                                                                        <div key={Math.random()} className="container p-0 pb-3">
                                                                            {/* Third Size */}
                                                                            <div className="row w-100 m-0">
                                                                                <Droppable droppableId={item.id + '-sg-1-3-1'}>
                                                                                    {(provided) => (
                                                                                        <div 
                                                                                            key={'sg-1-3-1-' + index} 
                                                                                            ref={provided.innerRef} 
                                                                                            id={'sg-1-3-1-' + index} 
                                                                                            className="d-inline p-5 text-center sg-column sg-1-3" tabIndex="0"
                                                                                        >
                                                                                            {
                                                                                                typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                                    item.content['subColumnOne'].length > 0 ?
                                                                                                        item.content['subColumnOne'].map((contentFirst, contentFirstIndex) =>(
                                                                                                            <div 
                                                                                                                key={'sg-1-3-1-content-output-' + contentFirstIndex} 
                                                                                                                id={
                                                                                                                    contentFirst.id ? 
                                                                                                                        contentFirst.id 
                                                                                                                    : 
                                                                                                                        'sg-1-3-1-content-output-' + contentFirstIndex
                                                                                                                } 
                                                                                                                className={
                                                                                                                    contentFirst.class ? 
                                                                                                                        contentFirst.class + " content-output" 
                                                                                                                    : 
                                                                                                                        "content-output"
                                                                                                                } 
                                                                                                                onClick={() => 
                                                                                                                    contentPaneClick(
                                                                                                                        index, 
                                                                                                                        contentFirstIndex, 
                                                                                                                        contentFirst.id ? 
                                                                                                                            contentFirst.id 
                                                                                                                        : 
                                                                                                                            'sg-1-3-1-content-output-' + contentFirstIndex, 
                                                                                                                        'subColumnOne'
                                                                                                                    )
                                                                                                                }
                                                                                                            >
                                                                                                                {
                                                                                                                    contentFirst.css ? 
                                                                                                                        contentFirst.css[contentFirst.css.length - 1] === '}' ?
                                                                                                                            cssApplier(
                                                                                                                                contentFirst.css, 
                                                                                                                                contentFirst.id ? 
                                                                                                                                    contentFirst.id 
                                                                                                                                : 
                                                                                                                                    'sg-1-3-1-content-output-' + contentFirstIndex
                                                                                                                            )
                                                                                                                        :
                                                                                                                            null
                                                                                                                    : 
                                                                                                                        null
                                                                                                                }
                                                                                                                {ReactHtmlParser(contentFirst.output)}
                                                                                                            </div>
                                                                                                        ))
                                                                                                    :
                                                                                                        item.name
                                                                                                :
                                                                                                    item.name
                                                                                            }
                                                                                            {provided.placeholder}
                                                                                        </div>
                                                                                    )}
                                                                                </Droppable>
                                                                                <Droppable droppableId={item.id + '-sg-2-3-2'}>
                                                                                    {(provided) => (
                                                                                        <div 
                                                                                            key={'sg-2-3-2-' + index} 
                                                                                            ref={provided.innerRef} 
                                                                                            id={'sg-2-3-2-' + index} 
                                                                                            className="d-inline p-5 text-center sg-column sg-2-3" tabIndex="1"
                                                                                        >
                                                                                            {
                                                                                                typeof item.content['subColumnTwo'] != "undefined" ? 
                                                                                                    item.content['subColumnTwo'].length > 0 ?
                                                                                                        item.content['subColumnTwo'].map((contentSecond, contentSecondIndex) =>(
                                                                                                            <div 
                                                                                                                key={'sg-2-3-2-content-output-' + contentSecondIndex} 
                                                                                                                id={
                                                                                                                    contentSecond.id ? 
                                                                                                                        contentSecond.id 
                                                                                                                    : 
                                                                                                                        'sg-2-3-2-content-output-' + contentSecondIndex
                                                                                                                } 
                                                                                                                className={
                                                                                                                    contentSecond.class ? 
                                                                                                                        contentSecond.class + " content-output" 
                                                                                                                    : 
                                                                                                                        "content-output"
                                                                                                                } 
                                                                                                                onClick={() => 
                                                                                                                    contentPaneClick(
                                                                                                                        index, 
                                                                                                                        contentSecondIndex, 
                                                                                                                        contentSecond.id ? 
                                                                                                                            contentSecond.id 
                                                                                                                        : 
                                                                                                                            'sg-2-3-2-content-output-' + contentSecondIndex, 
                                                                                                                        'subColumnTwo'
                                                                                                                    )
                                                                                                                }
                                                                                                            >
                                                                                                                {
                                                                                                                    contentSecond.css ? 
                                                                                                                        contentSecond.css[contentSecond.css.length - 1] === '}' ?
                                                                                                                            cssApplier(
                                                                                                                                contentSecond.css, 
                                                                                                                                contentSecond.id ? 
                                                                                                                                    contentSecond.id 
                                                                                                                                : 
                                                                                                                                    'sg-2-3-2-content-output-' + contentSecondIndex
                                                                                                                            )
                                                                                                                        :
                                                                                                                            null
                                                                                                                    : 
                                                                                                                        null
                                                                                                                }
                                                                                                                {ReactHtmlParser(contentSecond.output)}
                                                                                                            </div>
                                                                                                        ))
                                                                                                    :
                                                                                                        item.name
                                                                                                :
                                                                                                    item.name
                                                                                            }
                                                                                            {provided.placeholder}
                                                                                        </div>
                                                                                    )}
                                                                                </Droppable>
                                                                            </div>
                                                                        </div>
                                                                    :
                                                                        item.grid === 3 ?
                                                                            
                                                                            <div key={Math.random()} className="container p-0 pb-3">
                                                                                {/* Fourth Size */}
                                                                                <div className="row w-100 m-0">
                                                                                    <Droppable droppableId={item.id + '-sg-2-3-1'}>
                                                                                        {(provided) => (
                                                                                            <div 
                                                                                                key={'sg-2-3-1-' + index} 
                                                                                                ref={provided.innerRef} 
                                                                                                id={'sg-2-3-1-' + index} 
                                                                                                className="d-inline p-5 text-center sg-column sg-2-3" tabIndex="0"
                                                                                            >
                                                                                                {
                                                                                                    typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                                        item.content['subColumnOne'].length > 0 ?
                                                                                                            item.content['subColumnOne'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                <div 
                                                                                                                    key={'sg-2-3-1-content-output-' + contentFirstIndex} 
                                                                                                                    id={
                                                                                                                        contentFirst.id ? 
                                                                                                                            contentFirst.id 
                                                                                                                        : 
                                                                                                                            'sg-2-3-1-content-output-' + contentFirstIndex
                                                                                                                    } 
                                                                                                                    className={
                                                                                                                        contentFirst.class ? 
                                                                                                                            contentFirst.class + " content-output" 
                                                                                                                        : 
                                                                                                                            "content-output"
                                                                                                                    } 
                                                                                                                    onClick={() => 
                                                                                                                        contentPaneClick(
                                                                                                                            index, 
                                                                                                                            contentFirstIndex, 
                                                                                                                            contentFirst.id ? 
                                                                                                                                contentFirst.id 
                                                                                                                            : 
                                                                                                                                'sg-2-3-1-content-output-' + contentFirstIndex, 
                                                                                                                            'subColumnOne'
                                                                                                                        )
                                                                                                                    }
                                                                                                                >
                                                                                                                    {
                                                                                                                        contentFirst.css ? 
                                                                                                                            contentFirst.css[contentFirst.css.length - 1] === '}' ?
                                                                                                                                cssApplier(
                                                                                                                                    contentFirst.css, 
                                                                                                                                    contentFirst.id ? 
                                                                                                                                        contentFirst.id 
                                                                                                                                    : 
                                                                                                                                        'sg-2-3-1-content-output-' + contentFirstIndex
                                                                                                                                )
                                                                                                                            :
                                                                                                                                null
                                                                                                                        : 
                                                                                                                            null
                                                                                                                    }
                                                                                                                    {ReactHtmlParser(contentFirst.output)}
                                                                                                                </div>
                                                                                                            ))
                                                                                                        :
                                                                                                            item.name
                                                                                                    :
                                                                                                        item.name
                                                                                                }
                                                                                                {provided.placeholder}
                                                                                            </div>
                                                                                        )}
                                                                                    </Droppable>
                                                                                    <Droppable droppableId={item.id + '-sg-1-3-2'}>
                                                                                        {(provided) => (
                                                                                            <div 
                                                                                                key={'sg-1-3-2-' + index} 
                                                                                                ref={provided.innerRef} 
                                                                                                id={'sg-1-3-2-' + index} 
                                                                                                className="d-inline p-5 text-center sg-column sg-1-3" tabIndex="1"
                                                                                            >
                                                                                                {
                                                                                                    typeof item.content['subColumnTwo'] != "undefined" ? 
                                                                                                        item.content['subColumnTwo'].length > 0 ?
                                                                                                            item.content['subColumnTwo'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                <div 
                                                                                                                    key={'sg-1-3-2-content-output-' + contentSecondIndex} 
                                                                                                                    id={
                                                                                                                        contentSecond.id ? 
                                                                                                                            contentSecond.id 
                                                                                                                        : 
                                                                                                                            'sg-1-3-2-content-output-' + contentSecondIndex
                                                                                                                    } 
                                                                                                                    className={
                                                                                                                        contentSecond.class ? 
                                                                                                                            contentSecond.class + " content-output" 
                                                                                                                        : 
                                                                                                                            "content-output"
                                                                                                                    } 
                                                                                                                    onClick={() => 
                                                                                                                        contentPaneClick(
                                                                                                                            index, 
                                                                                                                            contentSecondIndex, 
                                                                                                                            contentSecond.id ? 
                                                                                                                                contentSecond.id 
                                                                                                                            : 
                                                                                                                                'sg-1-3-2-content-output-' + contentSecondIndex, 
                                                                                                                            'subColumnTwo'
                                                                                                                        )
                                                                                                                    }
                                                                                                                >
                                                                                                                    {
                                                                                                                        contentSecond.css ? 
                                                                                                                            contentSecond.css[contentSecond.css.length - 1] === '}' ?
                                                                                                                                cssApplier(
                                                                                                                                    contentSecond.css, 
                                                                                                                                    contentSecond.id ? 
                                                                                                                                        contentSecond.id 
                                                                                                                                    : 
                                                                                                                                        'sg-1-3-2-content-output-' + contentSecondIndex
                                                                                                                                )
                                                                                                                            :
                                                                                                                                null
                                                                                                                        : 
                                                                                                                            null
                                                                                                                    }
                                                                                                                    {ReactHtmlParser(contentSecond.output)}
                                                                                                                </div>
                                                                                                            ))
                                                                                                        :
                                                                                                            item.name
                                                                                                    :
                                                                                                        item.name
                                                                                                }
                                                                                                {provided.placeholder}
                                                                                            </div>
                                                                                        )}
                                                                                    </Droppable>
                                                                                </div>
                                                                            </div>
                                                                                
                                                                        :
                                                                            item.grid === 4 ?
                                                                                
                                                                                <div key={Math.random()} className="container p-0 pb-3">
                                                                                    {/* Fifth Size */}
                                                                                    <div className="row w-100 m-0">
                                                                                    <Droppable droppableId={item.id + '-sg-1-3-1-1'}>
                                                                                        {(provided) => (
                                                                                            <div 
                                                                                                key={'sg-1-3-1-1-' + index} 
                                                                                                ref={provided.innerRef} 
                                                                                                id={'sg-1-3-1-1-' + index} 
                                                                                                className="d-inline p-5 text-center sg-column sg-1-3" tabIndex="0"
                                                                                            >
                                                                                                {
                                                                                                    typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                                        item.content['subColumnOne'].length > 0 ?
                                                                                                            item.content['subColumnOne'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                <div 
                                                                                                                    key={'sg-1-3-1-1-content-output-' + contentFirstIndex} 
                                                                                                                    id={
                                                                                                                        contentFirst.id ? 
                                                                                                                            contentFirst.id
                                                                                                                        : 
                                                                                                                            'sg-1-3-1-1-content-output-' + contentFirstIndex
                                                                                                                    } 
                                                                                                                    className={
                                                                                                                        contentFirst.class ? 
                                                                                                                            contentFirst.class + " content-output" 
                                                                                                                        : 
                                                                                                                            "content-output"
                                                                                                                    } 
                                                                                                                    onClick={() => 
                                                                                                                        contentPaneClick(
                                                                                                                            index, 
                                                                                                                            contentFirstIndex, 
                                                                                                                            contentFirst.id ? 
                                                                                                                                contentFirst.id
                                                                                                                            : 
                                                                                                                                'sg-1-3-1-1-content-output-' + contentFirstIndex, 
                                                                                                                            'subColumnOne'
                                                                                                                        )
                                                                                                                    }
                                                                                                                >
                                                                                                                    {
                                                                                                                        contentFirst.css ? 
                                                                                                                            contentFirst.css[contentFirst.css.length - 1] === '}' ?
                                                                                                                                cssApplier(
                                                                                                                                    contentFirst.css, 
                                                                                                                                    contentFirst.id ? 
                                                                                                                                        contentFirst.id
                                                                                                                                    : 
                                                                                                                                        'sg-1-3-1-1-content-output-' + contentFirstIndex
                                                                                                                                )
                                                                                                                            :
                                                                                                                                null
                                                                                                                        : 
                                                                                                                            null
                                                                                                                    }
                                                                                                                    {ReactHtmlParser(contentFirst.output)}
                                                                                                                </div>
                                                                                                            ))
                                                                                                        :
                                                                                                            item.name
                                                                                                    :
                                                                                                        item.name
                                                                                                }
                                                                                                {provided.placeholder}
                                                                                            </div>
                                                                                        )}
                                                                                    </Droppable>
                                                                                    <Droppable droppableId={item.id + '-sg-1-3-1-2'}>
                                                                                        {(provided) => (
                                                                                            <div 
                                                                                                key={'sg-1-3-1-2-' + index} 
                                                                                                ref={provided.innerRef} 
                                                                                                id={'sg-1-3-1-2-' + index} 
                                                                                                className="d-inline p-5 text-center sg-column sg-1-3" tabIndex="1"
                                                                                            >
                                                                                                {
                                                                                                    typeof item.content['subColumnTwo'] != "undefined" ? 
                                                                                                        item.content['subColumnTwo'].length > 0 ?
                                                                                                            item.content['subColumnTwo'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                <div 
                                                                                                                    key={'sg-1-3-1-2-content-output-' + contentSecondIndex} 
                                                                                                                    id={
                                                                                                                        contentSecond.id ? 
                                                                                                                            contentSecond.id
                                                                                                                        : 
                                                                                                                            'sg-1-3-1-2-content-output-' + contentSecondIndex
                                                                                                                    } 
                                                                                                                    className={
                                                                                                                        contentSecond.class ? 
                                                                                                                            contentSecond.class + " content-output" 
                                                                                                                        : 
                                                                                                                            "content-output"
                                                                                                                    } 
                                                                                                                    onClick={() => 
                                                                                                                        contentPaneClick(
                                                                                                                            index, 
                                                                                                                            contentSecondIndex, 
                                                                                                                            contentSecond.id ? 
                                                                                                                                contentSecond.id
                                                                                                                            : 
                                                                                                                                'sg-1-3-1-2-content-output-' + contentSecondIndex, 
                                                                                                                            'subColumnTwo'
                                                                                                                        )
                                                                                                                    }
                                                                                                                >
                                                                                                                    {
                                                                                                                        contentSecond.css ? 
                                                                                                                            contentSecond.css[contentSecond.css.length - 1] === '}' ?
                                                                                                                                cssApplier(
                                                                                                                                    contentSecond.css, 
                                                                                                                                    contentSecond.id ? 
                                                                                                                                        contentSecond.id
                                                                                                                                    : 
                                                                                                                                        'sg-1-3-1-2-content-output-' + contentSecondIndex
                                                                                                                                )
                                                                                                                            :
                                                                                                                                null
                                                                                                                        : 
                                                                                                                            null
                                                                                                                    }
                                                                                                                    {ReactHtmlParser(contentSecond.output)}
                                                                                                                </div>
                                                                                                            ))
                                                                                                        :
                                                                                                            item.name
                                                                                                    :
                                                                                                        item.name
                                                                                                }
                                                                                                {provided.placeholder}
                                                                                            </div>
                                                                                        )}
                                                                                    </Droppable>
                                                                                    <Droppable droppableId={item.id + '-sg-1-3-1-3'}>
                                                                                        {(provided) => (
                                                                                            <div 
                                                                                                key={'sg-1-3-1-3-' + index} 
                                                                                                ref={provided.innerRef} 
                                                                                                id={'sg-1-3-1-3-' + index} 
                                                                                                className="d-inline p-5 text-center sg-column sg-1-3" tabIndex="2"
                                                                                            >
                                                                                                {
                                                                                                    typeof item.content['subColumnThree'] != "undefined" ? 
                                                                                                        item.content['subColumnThree'].length > 0 ?
                                                                                                            item.content['subColumnThree'].map((contentThird, contentThirdIndex) =>(
                                                                                                                <div 
                                                                                                                    key={'sg-1-3-1-3-content-output-' + contentThirdIndex} 
                                                                                                                    id={
                                                                                                                        contentThird.id ? 
                                                                                                                            contentThird.id
                                                                                                                        : 
                                                                                                                            'sg-1-3-1-3-content-output-' + contentThirdIndex
                                                                                                                    } 
                                                                                                                    className={
                                                                                                                        contentThird.class ? 
                                                                                                                            contentThird.class + " content-output" 
                                                                                                                        : 
                                                                                                                            "content-output"
                                                                                                                    } 
                                                                                                                    onClick={() => 
                                                                                                                        contentPaneClick(
                                                                                                                            index, 
                                                                                                                            contentThirdIndex, 
                                                                                                                            contentThird.id ? 
                                                                                                                                contentThird.id
                                                                                                                            : 
                                                                                                                                'sg-1-3-1-3-content-output-' + contentThirdIndex, 
                                                                                                                            'subColumnThree'
                                                                                                                        )
                                                                                                                    }
                                                                                                                >
                                                                                                                    {
                                                                                                                        contentThird.css ? 
                                                                                                                            contentThird.css[contentThird.css.length - 1] === '}' ?
                                                                                                                                cssApplier(
                                                                                                                                    contentThird.css, 
                                                                                                                                    contentThird.id ? 
                                                                                                                                        contentThird.id
                                                                                                                                    : 
                                                                                                                                        'sg-1-3-1-3-content-output-' + contentThirdIndex
                                                                                                                                )
                                                                                                                            :
                                                                                                                                null
                                                                                                                        : 
                                                                                                                            null
                                                                                                                    }
                                                                                                                    {ReactHtmlParser(contentThird.output)}
                                                                                                                </div>
                                                                                                            ))
                                                                                                        :
                                                                                                            item.name
                                                                                                    :
                                                                                                        item.name
                                                                                                }
                                                                                                {provided.placeholder}
                                                                                            </div>
                                                                                        )}
                                                                                    </Droppable>
                                                                                    </div>
                                                                                </div>
                                                                                    
                                                                            :
                                                                                item.grid === 5 ?
                                                                                    
                                                                                    <div key={Math.random()} className="container p-0 pb-3">
                                                                                        {/* Sixth Size */}
                                                                                        <div className="row w-100 m-0">
                                                                                            <Droppable droppableId={item.id + '-sg-1-4-1'}>
                                                                                                {(provided) => (
                                                                                                    <div 
                                                                                                        key={'sg-1-4-1-' + index} 
                                                                                                        ref={provided.innerRef} 
                                                                                                        id={'sg-1-4-1-' + index} 
                                                                                                        className="d-inline p-5 text-center sg-column sg-1-4" tabIndex="0"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                                                item.content['subColumnOne'].length > 0 ?
                                                                                                                    item.content['subColumnOne'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                        <div 
                                                                                                                            key={'sg-1-4-1-content-output-' + contentFirstIndex} 
                                                                                                                            id={
                                                                                                                                contentFirst.id ? 
                                                                                                                                    contentFirst.id
                                                                                                                                :
                                                                                                                                    'sg-1-4-1-content-output-' + contentFirstIndex
                                                                                                                            } 
                                                                                                                            className={
                                                                                                                                contentFirst.class ? 
                                                                                                                                    contentFirst.class + " content-output" 
                                                                                                                                : 
                                                                                                                                    "content-output"
                                                                                                                            } 
                                                                                                                            onClick={() => 
                                                                                                                                contentPaneClick(
                                                                                                                                    index, 
                                                                                                                                    contentFirstIndex, 
                                                                                                                                    contentFirst.id ? 
                                                                                                                                        contentFirst.id
                                                                                                                                    :
                                                                                                                                        'sg-1-4-1-content-output-' + contentFirstIndex, 
                                                                                                                                    'subColumnOne'
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {
                                                                                                                                contentFirst.css ? 
                                                                                                                                    contentFirst.css[contentFirst.css.length - 1] === '}' ?
                                                                                                                                        cssApplier(
                                                                                                                                            contentFirst.css, 
                                                                                                                                            contentFirst.id ? 
                                                                                                                                                contentFirst.id
                                                                                                                                            :
                                                                                                                                                'sg-1-4-1-content-output-' + contentFirstIndex
                                                                                                                                        )
                                                                                                                                    :
                                                                                                                                        null
                                                                                                                                : 
                                                                                                                                    null
                                                                                                                            }
                                                                                                                            {ReactHtmlParser(contentFirst.output)}
                                                                                                                        </div>
                                                                                                                    ))
                                                                                                                :
                                                                                                                    item.name
                                                                                                            :
                                                                                                                item.name
                                                                                                        }
                                                                                                        {provided.placeholder}
                                                                                                    </div>
                                                                                                )}
                                                                                            </Droppable>
                                                                                            <Droppable droppableId={item.id + '-sg-1-4-2'}>
                                                                                                {(provided) => (
                                                                                                    <div 
                                                                                                        key={'sg-1-4-2-' + index} 
                                                                                                        ref={provided.innerRef} 
                                                                                                        id={'sg-1-4-2-' + index} 
                                                                                                        className="d-inline p-5 text-center sg-column sg-1-4" tabIndex="1"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnTwo'] != "undefined" ? 
                                                                                                                item.content['subColumnTwo'].length > 0 ?
                                                                                                                    item.content['subColumnTwo'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                        <div 
                                                                                                                            key={'sg-1-4-2-content-output-' + contentSecondIndex} 
                                                                                                                            id={
                                                                                                                                contentSecond.id ? 
                                                                                                                                    contentSecond.id
                                                                                                                                : 
                                                                                                                                    'sg-1-4-2-content-output-' + contentSecondIndex
                                                                                                                            } 
                                                                                                                            className={
                                                                                                                                contentSecond.class ? 
                                                                                                                                    contentSecond.class + " content-output" 
                                                                                                                                : 
                                                                                                                                    "content-output"
                                                                                                                            } 
                                                                                                                            onClick={() => 
                                                                                                                                contentPaneClick(
                                                                                                                                    index, 
                                                                                                                                    contentSecondIndex, 
                                                                                                                                    contentSecond.id ? 
                                                                                                                                        contentSecond.id
                                                                                                                                    : 
                                                                                                                                        'sg-1-4-2-content-output-' + contentSecondIndex, 
                                                                                                                                    'subColumnTwo'
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {
                                                                                                                                contentSecond.css ? 
                                                                                                                                    contentSecond.css[contentSecond.css.length - 1] === '}' ?
                                                                                                                                        cssApplier(
                                                                                                                                            contentSecond.css, 
                                                                                                                                            contentSecond.id ? 
                                                                                                                                                contentSecond.id
                                                                                                                                            : 
                                                                                                                                                'sg-1-4-2-content-output-' + contentSecondIndex
                                                                                                                                        )
                                                                                                                                    :
                                                                                                                                        null
                                                                                                                                : 
                                                                                                                                    null
                                                                                                                            }
                                                                                                                            {ReactHtmlParser(contentSecond.output)}
                                                                                                                        </div>
                                                                                                                    ))
                                                                                                                :
                                                                                                                    item.name
                                                                                                            :
                                                                                                                item.name
                                                                                                        }
                                                                                                        {provided.placeholder}
                                                                                                    </div>
                                                                                                )}
                                                                                            </Droppable>
                                                                                            <Droppable droppableId={item.id + '-sg-1-4-3'}>
                                                                                                {(provided) => (
                                                                                                    <div 
                                                                                                        key={'sg-1-4-3-' + index} 
                                                                                                        ref={provided.innerRef} 
                                                                                                        id={'sg-1-4-3-' + index} 
                                                                                                        className="d-inline p-5 text-center sg-column sg-1-4" tabIndex="2"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnThree'] != "undefined" ? 
                                                                                                                item.content['subColumnThree'].length > 0 ?
                                                                                                                    item.content['subColumnThree'].map((contentThird, contentThirdIndex) =>(
                                                                                                                        <div 
                                                                                                                            key={'sg-1-4-3-content-output-' + contentThirdIndex} 
                                                                                                                            id={
                                                                                                                                contentThird.id ? 
                                                                                                                                    contentThird.id
                                                                                                                                : 
                                                                                                                                    'sg-1-4-3-content-output-' + contentThirdIndex
                                                                                                                            } 
                                                                                                                            className={
                                                                                                                                contentThird.class ? 
                                                                                                                                    contentThird.class + " content-output" 
                                                                                                                                : 
                                                                                                                                    "content-output"
                                                                                                                            } 
                                                                                                                            onClick={() => 
                                                                                                                                contentPaneClick(
                                                                                                                                    index, 
                                                                                                                                    contentThirdIndex, 
                                                                                                                                    contentThird.id ? 
                                                                                                                                        contentThird.id
                                                                                                                                    : 
                                                                                                                                        'sg-1-4-3-content-output-' + contentThirdIndex, 
                                                                                                                                    'subColumnThree'
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {
                                                                                                                                contentThird.css ? 
                                                                                                                                    contentThird.css[contentThird.css.length - 1] === '}' ?
                                                                                                                                        cssApplier(
                                                                                                                                            contentThird.css, 
                                                                                                                                            contentThird.id ? 
                                                                                                                                                contentThird.id
                                                                                                                                            : 
                                                                                                                                                'sg-1-4-3-content-output-' + contentThirdIndex
                                                                                                                                        )
                                                                                                                                    :
                                                                                                                                        null
                                                                                                                                : 
                                                                                                                                    null
                                                                                                                            }
                                                                                                                            {ReactHtmlParser(contentThird.output)}
                                                                                                                        </div>
                                                                                                                    ))
                                                                                                                :
                                                                                                                    item.name
                                                                                                            :
                                                                                                                item.name
                                                                                                        }
                                                                                                        {provided.placeholder}
                                                                                                    </div>
                                                                                                )}
                                                                                            </Droppable>
                                                                                            <Droppable droppableId={item.id + '-sg-1-4-4'}>
                                                                                                {(provided) => (
                                                                                                    <div 
                                                                                                        key={'sg-1-4-4-' + index} 
                                                                                                        ref={provided.innerRef} 
                                                                                                        id={'sg-1-4-4-' + index} 
                                                                                                        className="d-inline p-5 text-center sg-column sg-1-4" tabIndex="3"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnFour'] != "undefined" ? 
                                                                                                                item.content['subColumnFour'].length > 0 ?
                                                                                                                    item.content['subColumnFour'].map((contentFourth, contentFourthIndex) =>(
                                                                                                                        <div 
                                                                                                                            key={'sg-1-4-4-content-output-' + contentFourthIndex} 
                                                                                                                            id={
                                                                                                                                contentFourth.id ? 
                                                                                                                                    contentFourth.id
                                                                                                                                : 
                                                                                                                                    'sg-1-4-4-content-output-' + contentFourthIndex
                                                                                                                            } 
                                                                                                                            className={
                                                                                                                                contentFourth.class ? 
                                                                                                                                    contentFourth.class + " content-output" 
                                                                                                                                : 
                                                                                                                                    "content-output"
                                                                                                                            } 
                                                                                                                            onClick={() => 
                                                                                                                                contentPaneClick(
                                                                                                                                    index, 
                                                                                                                                    contentFourthIndex, 
                                                                                                                                    contentFourth.id ? 
                                                                                                                                        contentFourth.id
                                                                                                                                    : 
                                                                                                                                        'sg-1-4-4-content-output-' + contentFourthIndex, 
                                                                                                                                    'subColumnFour'
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {
                                                                                                                                contentFourth.css ? 
                                                                                                                                    contentFourth.css[contentFourth.css.length - 1] === '}' ?
                                                                                                                                        cssApplier(
                                                                                                                                            contentFourth.css, 
                                                                                                                                            contentFourth.id ? 
                                                                                                                                                contentFourth.id
                                                                                                                                            : 
                                                                                                                                                'sg-1-4-4-content-output-' + contentFourthIndex
                                                                                                                                        )
                                                                                                                                    :
                                                                                                                                        null
                                                                                                                                : 
                                                                                                                                    null
                                                                                                                            }
                                                                                                                            {ReactHtmlParser(contentFourth.output)}
                                                                                                                        </div>
                                                                                                                    ))
                                                                                                                :
                                                                                                                    item.name
                                                                                                            :
                                                                                                                item.name
                                                                                                        }
                                                                                                        {provided.placeholder}
                                                                                                    </div>
                                                                                                )}
                                                                                            </Droppable>
                                                                                        </div>
                                                                                    </div>
                                                                                        
                                                                                :
                                                                                    
                                                                                    <div key={Math.random()} className="container p-0 pb-3">
                                                                                        {/* Seventh Size */}
                                                                                        <div className="row w-100 m-0">
                                                                                            <Droppable droppableId={item.id + '-sg-1-5-1'}>
                                                                                                {(provided) => (
                                                                                                    <div 
                                                                                                        key={'sg-1-5-1-' + index} 
                                                                                                        ref={provided.innerRef} 
                                                                                                        id={'sg-1-5-1-' + index} 
                                                                                                        className="d-inline p-5 text-center sg-column sg-1-5" tabIndex="0"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                                                item.content['subColumnOne'].length > 0 ?
                                                                                                                    item.content['subColumnOne'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                        <div 
                                                                                                                            key={'sg-1-5-1-content-output-' + contentFirstIndex} 
                                                                                                                            id={
                                                                                                                                contentFirst.id ? 
                                                                                                                                    contentFirst.id
                                                                                                                                : 
                                                                                                                                    'sg-1-5-1-content-output-' + contentFirstIndex
                                                                                                                            } 
                                                                                                                            className={
                                                                                                                                contentFirst.class ? 
                                                                                                                                    contentFirst.class + " content-output" 
                                                                                                                                : 
                                                                                                                                    "content-output"
                                                                                                                            } 
                                                                                                                            onClick={() => 
                                                                                                                                contentPaneClick(
                                                                                                                                    index, 
                                                                                                                                    contentFirstIndex, 
                                                                                                                                    contentFirst.id ? 
                                                                                                                                        contentFirst.id
                                                                                                                                    : 
                                                                                                                                        'sg-1-5-1-content-output-' + contentFirstIndex, 
                                                                                                                                    'subColumnOne'
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {
                                                                                                                                contentFirst.css ? 
                                                                                                                                    contentFirst.css[contentFirst.css.length - 1] === '}' ?
                                                                                                                                        cssApplier(
                                                                                                                                            contentFirst.css, 
                                                                                                                                            contentFirst.id ? 
                                                                                                                                                contentFirst.id
                                                                                                                                            : 
                                                                                                                                                'sg-1-5-1-content-output-' + contentFirstIndex
                                                                                                                                        )
                                                                                                                                    :
                                                                                                                                        null
                                                                                                                                : 
                                                                                                                                    null
                                                                                                                            }
                                                                                                                            {ReactHtmlParser(contentFirst.output)}
                                                                                                                        </div>
                                                                                                                    ))
                                                                                                                :
                                                                                                                    item.name
                                                                                                            :
                                                                                                                item.name
                                                                                                        }
                                                                                                        {provided.placeholder}
                                                                                                    </div>
                                                                                                )}
                                                                                            </Droppable>
                                                                                            <Droppable droppableId={item.id + '-sg-1-5-2'}>
                                                                                                {(provided) => (
                                                                                                    <div 
                                                                                                        key={'sg-1-5-2-' + index} 
                                                                                                        ref={provided.innerRef} 
                                                                                                        id={'sg-1-5-2-' + index} 
                                                                                                        className="d-inline p-5 text-center sg-column sg-1-5" tabIndex="1"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnTwo'] != "undefined" ? 
                                                                                                                item.content['subColumnTwo'].length > 0 ?
                                                                                                                    item.content['subColumnTwo'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                        <div 
                                                                                                                            key={'sg-1-5-2-content-output-' + contentSecondIndex} 
                                                                                                                            id={
                                                                                                                                contentSecond.id ? 
                                                                                                                                    contentSecond.id
                                                                                                                                : 
                                                                                                                                    'sg-1-5-2-content-output-' + contentSecondIndex
                                                                                                                            } 
                                                                                                                            className={
                                                                                                                                contentSecond.class ? 
                                                                                                                                    contentSecond.class + " content-output" 
                                                                                                                                : 
                                                                                                                                    "content-output"
                                                                                                                            } 
                                                                                                                            onClick={() => 
                                                                                                                                contentPaneClick(
                                                                                                                                    index, 
                                                                                                                                    contentSecondIndex, 
                                                                                                                                    contentSecond.id ? 
                                                                                                                                        contentSecond.id
                                                                                                                                    : 
                                                                                                                                        'sg-1-5-2-content-output-' + contentSecondIndex, 
                                                                                                                                    'subColumnTwo'
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {
                                                                                                                                contentSecond.css ? 
                                                                                                                                    contentSecond.css[contentSecond.css.length - 1] === '}' ?
                                                                                                                                        cssApplier(
                                                                                                                                            contentSecond.css, 
                                                                                                                                            contentSecond.id ? 
                                                                                                                                                contentSecond.id
                                                                                                                                            : 
                                                                                                                                                'sg-1-5-2-content-output-' + contentSecondIndex
                                                                                                                                        )
                                                                                                                                    :
                                                                                                                                        null
                                                                                                                                : 
                                                                                                                                    null
                                                                                                                            }
                                                                                                                            {ReactHtmlParser(contentSecond.output)}
                                                                                                                        </div>
                                                                                                                    ))
                                                                                                                :
                                                                                                                    item.name
                                                                                                            :
                                                                                                                item.name
                                                                                                        }
                                                                                                        {provided.placeholder}
                                                                                                    </div>
                                                                                                )}
                                                                                            </Droppable>
                                                                                            <Droppable droppableId={item.id + '-sg-1-5-3'}>
                                                                                                {(provided) => (
                                                                                                    <div 
                                                                                                        key={'sg-1-5-3-' + index} 
                                                                                                        ref={provided.innerRef} 
                                                                                                        id={'sg-1-5-3-' + index} 
                                                                                                        className="d-inline p-5 text-center sg-column sg-1-5" tabIndex="2"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnThree'] != "undefined" ? 
                                                                                                                item.content['subColumnThree'].length > 0 ?
                                                                                                                    item.content['subColumnThree'].map((contentThird, contentThirdIndex) =>(
                                                                                                                        <div 
                                                                                                                            key={'sg-1-5-3-content-output-' + contentThirdIndex} 
                                                                                                                            id={
                                                                                                                                contentThird.id ? 
                                                                                                                                    contentThird.id
                                                                                                                                : 
                                                                                                                                    'sg-1-5-3-content-output-' + contentThirdIndex
                                                                                                                            } 
                                                                                                                            className={
                                                                                                                                contentThird.class ? 
                                                                                                                                    contentThird.class + " content-output" 
                                                                                                                                : 
                                                                                                                                    "content-output"
                                                                                                                            } 
                                                                                                                            onClick={() => 
                                                                                                                                contentPaneClick(
                                                                                                                                    index, 
                                                                                                                                    contentThirdIndex, 
                                                                                                                                    contentThird.id ? 
                                                                                                                                        contentThird.id
                                                                                                                                    : 
                                                                                                                                        'sg-1-5-3-content-output-' + contentThirdIndex, 
                                                                                                                                    'subColumnThree'
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {
                                                                                                                                contentThird.css ? 
                                                                                                                                    contentThird.css[contentThird.css.length - 1] === '}' ?
                                                                                                                                        cssApplier(
                                                                                                                                            contentThird.css, 
                                                                                                                                            contentThird.id ? 
                                                                                                                                                contentThird.id
                                                                                                                                            : 
                                                                                                                                                'sg-1-5-3-content-output-' + contentThirdIndex
                                                                                                                                        )
                                                                                                                                    :
                                                                                                                                        null
                                                                                                                                : 
                                                                                                                                    null
                                                                                                                            }
                                                                                                                            {ReactHtmlParser(contentThird.output)}
                                                                                                                        </div>
                                                                                                                    ))
                                                                                                                :
                                                                                                                    item.name
                                                                                                            :
                                                                                                                item.name
                                                                                                        }
                                                                                                        {provided.placeholder}
                                                                                                    </div>
                                                                                                )}
                                                                                            </Droppable>
                                                                                            <Droppable droppableId={item.id + '-sg-1-5-4'}>
                                                                                                {(provided) => (
                                                                                                    <div 
                                                                                                        key={'sg-1-5-4-' + index} 
                                                                                                        ref={provided.innerRef} 
                                                                                                        id={'sg-1-5-4-' + index} 
                                                                                                        className="d-inline p-5 text-center sg-column sg-1-5" tabIndex="3"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnFour'] != "undefined" ? 
                                                                                                                item.content['subColumnFour'].length > 0 ?
                                                                                                                    item.content['subColumnFour'].map((contentFourth, contentFourthIndex) =>(
                                                                                                                        <div 
                                                                                                                            key={'sg-1-5-4-content-output-' + contentFourthIndex} 
                                                                                                                            id={
                                                                                                                                contentFourth.id ? 
                                                                                                                                    contentFourth.id
                                                                                                                                : 
                                                                                                                                    'sg-1-5-4-content-output-' + contentFourthIndex
                                                                                                                            } 
                                                                                                                            className={
                                                                                                                                contentFourth.class ? 
                                                                                                                                    contentFourth.class + " content-output" 
                                                                                                                                : 
                                                                                                                                    "content-output"
                                                                                                                            } 
                                                                                                                            onClick={() => 
                                                                                                                                contentPaneClick(
                                                                                                                                    index, 
                                                                                                                                    contentFourthIndex, 
                                                                                                                                    contentFourth.id ? 
                                                                                                                                        contentFourth.id
                                                                                                                                    : 
                                                                                                                                        'sg-1-5-4-content-output-' + contentFourthIndex, 
                                                                                                                                    'subColumnFour'
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {
                                                                                                                                contentFourth.css ? 
                                                                                                                                    contentFourth.css[contentFourth.css.length - 1] === '}' ?
                                                                                                                                        cssApplier(
                                                                                                                                            contentFourth.css, 
                                                                                                                                            contentFourth.id ? 
                                                                                                                                                contentFourth.id
                                                                                                                                            : 
                                                                                                                                                'sg-1-5-4-content-output-' + contentFourthIndex
                                                                                                                                        )
                                                                                                                                    :
                                                                                                                                        null
                                                                                                                                : 
                                                                                                                                    null
                                                                                                                            }
                                                                                                                            {ReactHtmlParser(contentFourth.output)}
                                                                                                                        </div>
                                                                                                                    ))
                                                                                                                :
                                                                                                                    item.name
                                                                                                            :
                                                                                                                item.name
                                                                                                        }
                                                                                                        {provided.placeholder}
                                                                                                    </div>
                                                                                                )}
                                                                                            </Droppable>
                                                                                            <Droppable droppableId={item.id + '-sg-1-5-5'}>
                                                                                                {(provided) => (
                                                                                                    <div 
                                                                                                        key={'sg-1-5-5-' + index} 
                                                                                                        ref={provided.innerRef} 
                                                                                                        id={'sg-1-5-5-' + index} 
                                                                                                        className="d-inline p-5 text-center sg-column sg-1-5" tabIndex="4"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnFive'] != "undefined" ? 
                                                                                                                item.content['subColumnFive'].length > 0 ?
                                                                                                                    item.content['subColumnFive'].map((contentFifth, contentFifthIndex) =>(
                                                                                                                        <div 
                                                                                                                            key={'sg-1-5-5-content-output-' + contentFifthIndex} 
                                                                                                                            id={
                                                                                                                                contentFifth.id ? 
                                                                                                                                    contentFifth.id
                                                                                                                                : 
                                                                                                                                    'sg-1-5-5-content-output-' + contentFifthIndex
                                                                                                                            } 
                                                                                                                            className={
                                                                                                                                contentFifth.class ? 
                                                                                                                                    contentFifth.class + " content-output" 
                                                                                                                                : 
                                                                                                                                    "content-output"
                                                                                                                            } 
                                                                                                                            onClick={() => 
                                                                                                                                contentPaneClick(
                                                                                                                                    index, 
                                                                                                                                    contentFifthIndex, 
                                                                                                                                    contentFifth.id ? 
                                                                                                                                        contentFifth.id
                                                                                                                                    : 
                                                                                                                                        'sg-1-5-5-content-output-' + contentFifthIndex, 
                                                                                                                                    'subColumnFive'
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {
                                                                                                                                contentFifth.css ? 
                                                                                                                                    contentFifth.css[contentFifth.css.length - 1] === '}' ?
                                                                                                                                        cssApplier(
                                                                                                                                            contentFifth.css, 
                                                                                                                                            contentFifth.id ? 
                                                                                                                                                contentFifth.id
                                                                                                                                            : 
                                                                                                                                                'sg-1-5-5-content-output-' + contentFifthIndex
                                                                                                                                        )
                                                                                                                                    :
                                                                                                                                        null
                                                                                                                                : 
                                                                                                                                    null
                                                                                                                            }
                                                                                                                            {ReactHtmlParser(contentFifth.output)}
                                                                                                                        </div>
                                                                                                                    ))
                                                                                                                :
                                                                                                                    item.name
                                                                                                            :
                                                                                                                item.name
                                                                                                        }
                                                                                                        {provided.placeholder}
                                                                                                    </div>
                                                                                                )}
                                                                                            </Droppable>
                                                                                        </div>
                                                                                    </div>
                                                        ))
                                                    :
                                                    <span></span>
                                                }
                                            </div>
                                        </div>
                                        <HtmlEditor 
                                            currentColumn={column[activeColumnId]}
                                            setShowEditor={setHtmlEditorShow}
                                            showHtmlEditor={showHtmlEditor}
                                            onChangeTextArea={onChangeTextArea}
                                            contentIndex={activeContentIndex}
                                            currentColumnContentIndex={currentColumnContentIndex}
                                        />
                                        <CssEditor 
                                            currentColumn={column[activeColumnId]}
                                            setShowCssEditor={setCssEditorShow}
                                            showCssEditor={showCssEditor}
                                            onChangeTextArea={onChangeTextArea}
                                            contentIndex={activeContentIndex}
                                            currentColumnContentIndex={currentColumnContentIndex}
                                            setApplyCss={setApplyCss}
                                        />
                                        <TextEditor 
                                            currentColumn={column[activeColumnId]}
                                            setShowTextEditor={setTextEditorShow}
                                            showTextEditor={showTextEditor}
                                            onChangeTextArea={onChangeTextArea}
                                            contentIndex={activeContentIndex}
                                            currentColumnContentIndex={currentColumnContentIndex}
                                            contentFor={contentFor}
                                            setColumnInDirect={setColumnInDirect}
                                        />
                                    </div>
                                </DragDropContext>
                                <button type="submit" className="btn btn-success float-right mt-2">Save</button>
                            </form>
                        );
                    }}
                </Formik>
            </Modal.Body>
        </Modal>
    );

    return (
        <div id="slide-handler-container" className="d-inline">
            {props.action === "add" ?
                <button type="button" className="btn btn-success" onClick={() => setShowModal(true, 'add')}>Add Slide</button>
            :
                <div id="edit-slide-btn" className="d-inline">
                    <button type="button" className="btn btn-link pl-0" onClick={() => setShowModal(true, 'edit')}>| Edit</button>
                </div>
            }
            {slideModal}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        slide: state.slide,
        columns: state.columns,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createSlide: (lessonIndex, title, userId, hideShowTitle) => dispatch({type: 'CREATE_SLIDE', lid: lessonIndex, title: title, uid: userId, hide_title: hideShowTitle}),
        createColumn: (slideId, userId, columnArr) => dispatch({type: 'CREATE_COLUMN', sid: slideId, uid: userId, columnArr: columnArr}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideHandler);
