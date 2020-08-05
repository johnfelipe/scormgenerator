import React, { Component } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { Formik } from "formik";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faListAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faFileAudio, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import ReactHtmlParser from 'react-html-parser';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// components
import SlideColumn from '../Slide/Columns';
import SlideFeature from '../Slide/Features';
import SlideEditor from '../Slide/Editor';
import HtmlEditor from '../Slide/HtmlEditor';
import CssEditor from '../Slide/CssEditor';
import TextEditor from '../Slide/TextEditor';
import GalleryHandler from '../Handlers/GalleryHandler';

// feature layouts
import HomePageLayout from '../Slide/Layouts/HomePageLayout';
import MultipleChoiceLayout from '../Slide/Layouts/MultipleChoiceLayout';
import CourseObjLayout from '../Slide/Layouts/CourseObjLayout';

// modals
import WarningModal from '../AlertModal/Warning';

class SlideHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            column: this.props.currentColumns ? this.props.currentColumns : [],
            columnSizes: [
                { id: 0,items: [{ size: "1/1", class: "sg-1-1"}]},
                { id: 1,items: [{ size: "1/2", class: "sg-1-2"}, { size: "1/2", class: "sg-1-2"}]},
                { id: 2,items: [{ size: "1/3", class: "sg-1-3"}, { size: "2/3", class: "sg-2-3"}]},
                { id: 3,items: [{ size: "2/3", class: "sg-2-3"}, { size: "1/3", class: "sg-1-3"}]},
                { id: 4,items: [{ size: "1/3", class: "sg-1-3"}, { size: "1/3", class: "sg-1-3"}, { size: "1/3", class: "sg-1-3"}]},
                { id: 5,items: [{ size: "1/4", class: "sg-1-4"}, { size: "1/4", class: "sg-1-4"}, { size: "1/4", class: "sg-1-4"}, { size: "1/4", class: "sg-1-4"}]},
                { id: 6,items: [{ size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}]},
            ],
            features: [
                { type: 'audio', name: 'Audio', icon: faFileAudio, },
                { type: 'contentArea', name: 'Content Area', icon: faSquare, },
                { type: 'courseObjectives', name: 'Course Objectives', icon: faListAlt, },
                { type: 'homePage', name: 'Home Page', icon: faHome, },
                { type: 'multipleChoice', name: 'Multiple Choice', icon: faQuestionCircle, },
            ],
            activeFeature: '',
            activeTab: 'column',
            activeColumnId: 0,
            showHtmlEditor: false,
            showCssEditor: false,
            showTextEditor: false,
            activeContentIndex: 0,
            currentColumnContentIndex: 'subColumnOne',
            isSlideNameNotEmpty: false,
            applyCss: false,
            contentFor: '',
            mChoiceIndex: 0,
            slideTitle: '',
            slideSubtitle: '',
        };
        
        this.setModalShow = this.setModalShow.bind(this);
        this.addColumn = this.addColumn.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
        this.handleSizeActive = this.handleSizeActive.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
        this.setShowHtmlEditor = this.setShowHtmlEditor.bind(this);
        this.onChangeTextArea = this.onChangeTextArea.bind(this);
        this.contentPaneClick = this.contentPaneClick.bind(this);
        this.deleteFeature = this.deleteFeature.bind(this);
        this.setShowCssEditor = this.setShowCssEditor.bind(this);
        this.setFeatureId = this.setFeatureId.bind(this);
        this.setFeatureClass = this.setFeatureClass.bind(this);
        this.onChangeRadio = this.onChangeRadio.bind(this);
        this.cssApplier = this.cssApplier.bind(this);
        this.setApplyCss = this.setApplyCss.bind(this);
        this.setColumn = this.setColumn.bind(this);
        this.resetStates = this.resetStates.bind(this);
        this.setShowTextEditor = this.setShowTextEditor.bind(this);
        this.resetFeature = this.resetFeature.bind(this);
        this.setActiveColumnId = this.setActiveColumnId.bind(this);
        this.setMChoiceIndex = this.setMChoiceIndex.bind(this);
        this.setSlideTitle = this.setSlideTitle.bind(this);
        this.setSlideSubtitle = this.setSlideSubtitle.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount = () => {
        if(sessionStorage.getItem("selectedAnswers")) {
            sessionStorage.removeItem("selectedAnswers");
        }
    }

    componentDidUpdate() {
        console.log('state.columns: ');
        console.log(this.state.column);
        console.log('props.columns: ');
        console.log(this.props.currentColumns);
        // console.log('props.action');
        // console.log(this.props.action);
        // console.log('state.activeFeature');
        // console.log(this.state.activeFeature);
        // console.log('this.props.slide');
        // console.log(this.props.slide);
        // console.log('this.props.column');
        // console.log(this.props.columns);
    }

    setModalShow = (value, action) => {

        this.setState({
            modalShow: value,
        });

        if (action === "close" || action === "edit") {
            console.log('Edit here');
            this.setState({
                column: this.props.currentColumns ? this.props.currentColumns : [],
                activeFeature: '',
                activeColumnId: 0,
                activeTab: 'column',
                activeContentIndex: 0,
            });
        }

        if (action === "add") {
            this.setState({
                column: [],
                activeFeature: '',
                activeColumnId: 0,
                activeTab: 'column',
                activeContentIndex: 0,
            });
        }
    }

    addColumn = () => {
        const currentCount = this.state.column.length + 1
        const columnObj = { type: 'column', name: 'Column ' + currentCount, active: 0, grid: 0, id: 'column' + currentCount, content: [] }
        // columnObj.content['subColumnOne'] = [];
        columnObj.content = {
            subColumnOne: []
        };

        this.setState({
            column: [...this.state.column, columnObj],
            currentColumnContentIndex: 'subColumnOne',
        });

        // this.handleSubmitMyForm();
    }

    deleteColumn = (index) => {
        console.log('index:');
        console.log(index);
        const columnArr = [...this.state.column];
        columnArr.splice(index, 1);

        this.setState({
            column: columnArr,
        })
    }
    
    handleContentEditable = (event, index) => {
        const columnObj = this.state.column;

        columnObj[index].name = event.target.value;

        this.setState({
            column: columnObj,
        })
    }

    handleSizeActive = (columnIndex, sizeIndex, grid) => {
        const columnSizesObj = this.state.column;

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

        this.setState({
            column: columnSizesObj,
        })
    }

    // a little function to help us with reordering the result
    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    onDragEnd = result => {
        const { source, destination } = result;
        const activeColumnId = this.state.activeColumnId;
        
        console.log(source);
        console.log(destination);

        // dropped outside the list
        if (!destination) {
            return;
        }

        if ((source.droppableId === "columns") && (destination.droppableId === "columns")) {

            if (activeColumnId === source.index) {
                this.setActiveColumnId(destination.index);
            } else if (activeColumnId === destination.index) {
                this.setActiveColumnId(source.index);
            }
            
            const currentColumnList = this.state.column;

            const reordered_slides = this.reorder(
                currentColumnList,
                source.index,
                destination.index
            );
            let columns = reordered_slides;

            this.setState({
                column: columns,
            })
        }

        if ((source.droppableId === "features") && (destination.droppableId !== "features")) {
            const currentColumns = this.state.column;

            this.setActiveTab("editor");

            for (var key in currentColumns) {
                if (destination.droppableId === currentColumns[key]['id']) {
                    // First Size

                    this.setState({
                        currentColumnContentIndex: 'subColumnOne',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;
                    
                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: 'No audio added.', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'multipleChoice') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: [], class: 'question-files-left', id: '', styles: { questionLabelClass: 'rounded-circle', questionBackgroundColor: '#fff', multipleChoiceTextColor: 'text-black' }, mechanics: { repeat: 0, passingRate: 80, specificType: 'knowledgeCheck', returnSlide: 0 } };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'homePage') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: { title: 'Title', subtitle: 'Subtitle', date: 'January 1970', courseId: '1234567890', backgroundImg: { name: '', url: '' } }, class: 'course-title-bottom-left', id: '', styles: { titleBoxColor: '#0069d9', titleBoxBorder: 'border-bottom' } };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'courseObjectives') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: { courseNav: {name: 'Course Navigation',}, courseInfo: {name: 'Course Information', content: '<span>No information provided yet.</span>'}, courseReq:  {name: 'Course Requirements', content: '<span>No requirements provided yet</span>.'}, }, class: '', id: '', styles: { courseIntroColor: '#0069d9' }, introVideo: {name: 'file_example_MP4_480_1_5MG', url: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4', type: 'video/mp4', position: 'course-objectives-video-left'}, };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    }
                    
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-2-1')) {
                    // Second Size

                    this.setState({
                        currentColumnContentIndex: 'subColumnOne',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    }

                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-2-2')) {

                    this.setState({
                        currentColumnContentIndex: 'subColumnTwo',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-1')) {
                    // Third Size

                    this.setState({
                        currentColumnContentIndex: 'subColumnOne',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-2-3-2')) {

                    this.setState({
                        currentColumnContentIndex: 'subColumnTwo',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-2-3-1')) {
                    // Fourth Size

                    this.setState({
                        currentColumnContentIndex: 'subColumnOne',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-2')) {

                    this.setState({
                        currentColumnContentIndex: 'subColumnTwo',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-1-1')) {
                    // Fifth Size

                    this.setState({
                        currentColumnContentIndex: 'subColumnOne',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-1-2')) {

                    this.setState({
                        currentColumnContentIndex: 'subColumnTwo',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-1-3')) {

                    this.setState({
                        currentColumnContentIndex: 'subColumnThree',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-4-1')) {
                    // Sixth Size

                    this.setState({
                        currentColumnContentIndex: 'subColumnOne',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-4-2')) {

                    this.setState({
                        currentColumnContentIndex: 'subColumnTwo',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-4-3')) {

                    this.setState({
                        currentColumnContentIndex: 'subColumnThree',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-4-4')) {

                    this.setState({
                        currentColumnContentIndex: 'subColumnFour',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnFour.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFour.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnFour.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFour.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-1')) {
                    // Seventh Size

                    this.setState({
                        currentColumnContentIndex: 'subColumnOne',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-2')) {

                    this.setState({
                        currentColumnContentIndex: 'subColumnTwo',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-3')) {

                    this.setState({
                        currentColumnContentIndex: 'subColumnThree',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-4')) {

                    this.setState({
                        currentColumnContentIndex: 'subColumnFour',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnFour.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFour.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnFour.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFour.length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-5')) {

                    this.setState({
                        currentColumnContentIndex: 'subColumnFive',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content.subColumnFive.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFive.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content.subColumnFive.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFive.length - 1),
                        });
                    }
                }
            }
        }

        if ((source.droppableId === destination.droppableId) && (source.droppableId !== "features" || destination.droppableId !== "features") && (source.droppableId !== "columns" || destination.droppableId !== "columns")) {
            const currentColumnList = this.state.column;
            const reorderedFeatures = this.reorder(
                currentColumnList[this.state.activeColumnId].content[this.state.currentColumnContentIndex],
                source.index,
                destination.index
            );
            currentColumnList[this.state.activeColumnId].content[this.state.currentColumnContentIndex] = reorderedFeatures;
            let columns = currentColumnList;
            
            if (this.state.activeContentIndex === source.index) {
                this.setState({
                    column: columns,
                    activeContentIndex: destination.index,
                });
            } else if (this.state.activeContentIndex === destination.index) {
                this.setState({
                    column: columns,
                    activeContentIndex: source.index,
                });
            }
                
        }
    }

    setActiveTab = (value) => {
        this.setState({
            activeTab: value,
        })
    }

    setShowHtmlEditor = (value, contentIndex, contentFor) => {
        this.setState({
            showHtmlEditor: value,
            activeContentIndex: contentIndex,
            contentFor: contentFor,
        })
    }

    onChangeTextArea = (event, contentIndex, editorType) => {
        const currentColumnObj = this.state.column[this.state.activeColumnId];
        const currentColumnContentIndex = this.state.currentColumnContentIndex;

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

        const columns = this.state.column;
        columns[this.state.activeColumnId] = currentColumnObj;

        this.setState({
            column: columns,
        })
    }

    contentPaneClick = (index, contentIndex, elementId, currentColumnContentIndex) => {
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

        if ((this.state.column[index].content[currentColumnContentIndex].length > 0) && (typeof this.state.column[index].content[currentColumnContentIndex][contentIndex] !== "undefined")) {
            this.setState({
                activeFeature: this.state.column[index].content[currentColumnContentIndex][contentIndex].type,
                activeColumnId: index,
                activeTab: 'editor',
                activeContentIndex: contentIndex,
                currentColumnContentIndex: currentColumnContentIndex,
                showHtmlEditor: false,
            });
        }
    }

    deleteFeature = (contentIndex) => {
        const currentColumnContent = this.state.column[this.state.activeColumnId].content[this.state.currentColumnContentIndex];
        // delete currentColumnContent[contentIndex];
        currentColumnContent.splice(contentIndex, 1);

        const columns = this.state.column;
        columns[this.state.activeColumnId].content[this.state.currentColumnContentIndex] = currentColumnContent;

        this.setState({
            column: columns,
            activeFeature: '',
            activeColumnId: -1,
            activeTab: 'column',
            activeContentIndex: 0,
        })
    }

    setShowCssEditor = (value, contentIndex) => {
        this.setState({
            showCssEditor: value,
            activeContentIndex: contentIndex,
        })
    }

    setFeatureId = (event, contentIndex) => {
        const currentColumnObj = this.state.column[this.state.activeColumnId];
        const currentColumnContentIndex = this.state.currentColumnContentIndex;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].id = event.target.value;

        const columns = this.state.column;
        columns[this.state.activeColumnId] = currentColumnObj;

        this.setState({
            column: columns,
        })
    }

    setFeatureClass = (event, contentIndex) => {
        const currentColumnObj = this.state.column[this.state.activeColumnId];
        const currentColumnContentIndex = this.state.currentColumnContentIndex;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].class = event.target.value;

        const columns = this.state.column;
        columns[this.state.activeColumnId] = currentColumnObj;

        this.setState({
            column: columns,
        })
    }

    onChangeRadio = (dataUrl, type, contentIndex) => {
        const currentColumnObj = this.state.column[this.state.activeColumnId];
        const currentColumnContentIndex = this.state.currentColumnContentIndex;

        const audioHtml = "<audio id='feature-audio' controls><source src='" + dataUrl +"' type='" + type +"'><p>Your browser doesn't support HTML5 audio. Here is a <a href='" + dataUrl +"'>link to the audio</a> instead.</p></audio>";

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output = audioHtml;

        const columns = this.state.column;
        columns[this.state.activeColumnId] = currentColumnObj;

        this.setState({
            column: columns,
        })
    }

    cssApplier = (str, featureId) => {
        if (this.state.applyCss) {
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

            this.setApplyCss(false);
        }
    }

    setApplyCss = (value) => {
        this.setState({
            applyCss: value,
        })
    }

    setColumn = (column) => {

        const columns = this.state.column;
        columns[this.state.activeColumnId] = column;

        this.setState({
            column: columns,
        })
    }

    resetStates = () => {
        this.setState({
            activeFeature: '',
            activeTab: 'column',
            activeColumnId: 0,
            showHtmlEditor: false,
            showCssEditor: false,
            activeContentIndex: 0,
            currentColumnContentIndex: 'subColumnOne',
            isSlideNameNotEmpty: false,
            applyCss: false,
        });
    }

    setShowTextEditor = (value, contentIndex, contentFor) => {
        this.setState({
            contentFor: contentFor,
            showTextEditor: value,
            activeContentIndex: contentIndex,
        })
    }

    resetFeature = (contentIndex, featureType) => {
        const currentColumnObj = this.state.column[this.state.activeColumnId];
        const currentColumnContentIndex = this.state.currentColumnContentIndex;

        if (featureType === "audio") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = { type: 'audio', output: 'No audio added.', class: '', id: '' };
        } else if (featureType === "contentArea") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = { type: 'contentArea', output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
        } else if (featureType === "multipleChoice") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = { type: 'multipleChoice', output: [], class: 'question-files-left', id: '', styles: { questionLabelClass: 'rounded-circle', questionBackgroundColor: '#fff', multipleChoiceTextColor: 'text-black' }, mechanics: { repeat: 0, passingRate: 80, specificType: 'knowledgeCheck', returnSlide: 0 } };
        } else if (featureType === "homePage") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = { type: 'homePage', output: { title: 'Title', subtitle: 'Subtitle', date: 'January 1970', courseId: '1234567890', backgroundImg: { name: '', url: '' } }, class: 'course-title-bottom-left', id: '', styles: { titleBoxColor: '#0069d9', titleBoxBorder: 'border-bottom' } };
        } else if (featureType === "courseObjectives") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = { type: 'courseObjectives', output: { courseNav: {name: 'Course Navigation',}, courseInfo: {name: 'Course Information', content: '<span>No information provided yet.</span>'}, courseReq:  {name: 'Course Requirements', content: '<span>No requirements provided yet</span>.'}, }, class: '', id: '', styles: { courseIntroColor: '#0069d9' }, introVideo: {name: 'file_example_MP4_480_1_5MG', url: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4', type: 'video/mp4', position: 'course-objectives-video-left'}, };
        }

        const columns = this.state.column;
        columns[this.state.activeColumnId] = currentColumnObj;

        this.setState({
            column: columns,
        })
    }

    setActiveColumnId = (value) => {
        this.setState({
            activeColumnId: value
        });
    }

    setMChoiceIndex = (value) => {
        this.setState({
            mChoiceIndex: value,
        })
    }

    setSlideTitle = (value) => {
        this.setState({
            slideTitle: value,
        })
    }

    setSlideSubtitle = (value) => {
        this.setState({
            slideSubtitle: value,
        })
    }

    onSave = (slide, subtitle, columns, lessonIndex) => {
        if (this.props.action === "add") {
            const slideObj = {slideName: slide, slideSubtitle: subtitle, columns: columns}
            this.props.addSlideChange(slideObj, lessonIndex);
            console.log("add");
        } else if (this.props.action === "edit") {
            const slideObj = {slideName: slide, slideSubtitle: subtitle, columns: columns}
            this.props.editSlideChange(slideObj, this.props.slideId, this.props.currentClickedLessonId);
            console.log("edit");
        }
        
        this.setModalShow(false, 'save')
    }

    submitMyForm = null;

    handleSubmitMyForm = (e) => {
        if (this.submitMyForm) {
            this.submitMyForm(e);
            console.log('AUTOSAVE--AUTOSAVE--AUTOSAVE--AUTOSAVE')
        }
    };

    bindSubmitForm = (submitForm) => {
        this.submitMyForm = submitForm;
    };

    render() {
        const slideModal = (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false, 'close')}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="slide-modal-width"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.action === "add" ?
                            <span>Add Slide</span>
                            :
                            <span>Edit Slide</span>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ 
                            slideName: this.props.currentSlideName ? this.props.currentSlideName : '',
                            slideSubtitle: this.props.currentSlideSubtitle ? this.props.currentSlideSubtitle : '',
                            showTitle: this.props.slide.hide_title ? this.props.slide.hide_title : false,
                        }}

                        onSubmit={values => {
                            this.onSave(values.slideName, values.slideSubtitle, this.state.column, this.props.lessonIndex);

                            // create slide
                            // lid and uid are temporary
                            this.props.createSlide(1, values.slideName, 1, values.showTitle);

                            this.props.setSlideItemIndex(this.props.slideId + 1);

                            // create column
                            // sid and uid are temporary
                            this.props.createColumn(1, 1, this.state.column);

                        }}

                        validationSchema={Yup.object().shape({
                            slideName: Yup.string()
                            .required("Slide name required"),
                        })}
                    >
                        {formikProps => {
                            const {
                                values,
                                touched,
                                errors,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                            } = formikProps;
                            
                            this.bindSubmitForm(formikProps.submitForm);

                            return (
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="slideName">Title:</label>
                                    <OverlayTrigger
                                        key="top"
                                        placement="top"
                                        overlay={
                                            <Tooltip id='tooltip-top'>
                                                <label htmlFor="showTitle">
                                                {
                                                    values.showTitle ?
                                                        <span>Title displayed</span>
                                                    :
                                                        <span>Title hidden</span>
                                                }
                                                    
                                                </label>
                                            </Tooltip>
                                        }
                                    >
                                        <label className="check-text ml-3">
                                            <input
                                                id="showTitle"
                                                name="showTitle"
                                                type="checkbox"
                                                value={values.showTitle}
                                                checked={values.showTitle}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="ml-3"
                                            />
                                                <FontAwesomeIcon icon={values.showTitle ? faEye : faEyeSlash}/>
                                        </label>
                                    </OverlayTrigger>
                                    <input
                                        id="slideName"
                                        name="slideName"
                                        type="text"
                                        className={(errors.slideName && touched.slideName && "error form-control d-inline mb-2") || "form-control d-inline mb-2"}
                                        onBlur={(e) => {
                                                handleBlur(e)

                                                if (e.target.value.trim() === "") {
                                                    this.setState({
                                                        isSlideNameNotEmpty: false,
                                                    })
                                                }

                                            }
                                        }
                                        value={values.slideName}
                                        onChange={(e) => {
                                                handleChange(e);

                                                this.setSlideTitle(e.target.value);

                                                if (e.target.value.trim() !== "") {
                                                    this.setState({
                                                        isSlideNameNotEmpty: true,
                                                    })
                                                }
                                            }
                                        }
                                        placeholder="Type title here . . ."
                                    />
                                    {errors.slideName && touched.slideName && (
                                        <div className="input-feedback">{errors.slideName}</div>
                                    )}
                                    <div className="row m-0">
                                        <div className="col-md-10 pl-0">
                                            <label htmlFor="slideSubtitle" className="d-block">Subtitle:</label>
                                            <input
                                                id="slideSubtitle"
                                                name="slideSubtitle"
                                                type="text"
                                                className="form-control d-inline mb-2"
                                                onBlur={(e) => {
                                                        handleBlur(e);

                                                        this.setSlideSubtitle(e.target.value);

                                                        if (e.target.value.trim() === "") {
                                                            this.setState({
                                                                isSlideNameNotEmpty: false,
                                                            })
                                                        }

                                                    }
                                                }
                                                value={values.slideSubtitle}
                                                onChange={(e) => {
                                                        handleChange(e)

                                                        if (e.target.value.trim() !== "") {
                                                            this.setState({
                                                                isSlideNameNotEmpty: true,
                                                            })
                                                        }
                                                    }
                                                }
                                                placeholder="Type subtitle here . . ."
                                            />
                                        </div>
                                        <div className="col-md-2 pr-0">
                                            <label htmlFor="slideSubtitle" className="d-block">Media Library:</label>
                                            {/* <button type="button" className="btn btn-primary w-100">Open Library</button> */}
                                            <GalleryHandler
                                                addMediaFiles={this.props.addMediaFiles}
                                                mediaFilesObject={this.props.mediaFilesObject}
                                                setMediaFilesObject={this.props.setMediaFilesObject}
                                                buttonName="Open Library"
                                            />
                                        </div>
                                    </div>
                                    <DragDropContext onDragEnd={this.onDragEnd}>
                                        <div className="row mt-2">
                                            <div id="slide-sidebar" className="col-md-3 pr-0">
                                                <Tabs activeKey={this.state.activeTab} onSelect={this.setActiveTab} id="uncontrolled-tab" className="text-center">
                                                    <Tab eventKey="column" title="Column" className="mt-1">
                                                        <div className="sg-workspace-content-section">
                                                            {
                                                                this.state.column.length !== 0 ?
                                                                    <Droppable droppableId="columns">
                                                                        {(provided) => (
                                                                            <div ref={provided.innerRef}>
                                                                                {this.state.column.map((item, columnIndex) => (
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
                                                                                                    currentColumnContentIndex={this.state.currentColumnContentIndex}
                                                                                                    name={item.name}
                                                                                                    deleteColumn={this.deleteColumn}
                                                                                                    columnSizes={this.state.columnSizes}
                                                                                                    column={this.state.column}
                                                                                                    handleSizeActive={this.handleSizeActive}
                                                                                                    resetStates={this.resetStates}
                                                                                                    handleContentEditable={this.handleContentEditable}
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
                                                                this.state.isSlideNameNotEmpty || this.props.currentSlideName ?
                                                                    <button type="button" className="sg-add-sortable-column-after" onClick={this.addColumn}>
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
                                                                    {this.state.features.map((item, featureIndex) => (
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
                                                            setColumn={this.setColumn}
                                                            feature={this.state.activeFeature} 
                                                            currentColumn={this.state.column[this.state.activeColumnId]}
                                                            contentIndex={this.state.activeContentIndex}
                                                            setShowEditor={this.setShowHtmlEditor}
                                                            deleteFeature={this.deleteFeature}
                                                            setShowCssEditor={this.setShowCssEditor}
                                                            setFeatureId={this.setFeatureId}
                                                            setFeatureClass={this.setFeatureClass}
                                                            currentColumnContentIndex={this.state.currentColumnContentIndex}
                                                            onChangeTextArea={this.onChangeTextArea}
                                                            mediaFilesObject={this.props.mediaFilesObject}
                                                            onChangeRadio={this.onChangeRadio}
                                                            addMediaFiles={this.props.addMediaFiles}
                                                            galleryHandler={this.props.galleryHandler}
                                                            setShowTextEditor={this.setShowTextEditor}
                                                            resetFeature={this.resetFeature}
                                                            slideItemId={this.props.slideItemId}
                                                            setMChoiceIndex={this.setMChoiceIndex}
                                                        />
                                                    </Tab>
                                                </Tabs>
                                            </div>
                                            <div id="slide-content" className="col-md-9 pl-0">
                                                <div id="slide-content-container" className="border p-3 h-100">
                                                    {
                                                        this.state.column.length > 0 ?
                                                            this.state.column.map((item, index) => (
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
                                                                                                                                this.contentPaneClick(
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
                                                                                                                                styles={contentFirst.styles}
                                                                                                                                homepageId={contentFirst.id}
                                                                                                                                homePageCss={contentFirst.css}
                                                                                                                                cssApplier={this.cssApplier}
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
                                                                                                                                this.contentPaneClick(
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
                                                                                                                                cssApplier={this.cssApplier}
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
                                                                                                                                this.contentPaneClick(
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
                                                                                                                                this.contentPaneClick(
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
                                                                                                                                        this.cssApplier(
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
                                                                                                                    this.contentPaneClick(
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
                                                                                                                            this.cssApplier(
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
                                                                                                                    this.contentPaneClick(
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
                                                                                                                            this.cssApplier(
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
                                                                                                                        this.contentPaneClick(
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
                                                                                                                                this.cssApplier(
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
                                                                                                                        this.contentPaneClick(
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
                                                                                                                                this.cssApplier(
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
                                                                                                                            this.contentPaneClick(
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
                                                                                                                                    this.cssApplier(
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
                                                                                                                            this.contentPaneClick(
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
                                                                                                                                    this.cssApplier(
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
                                                                                                                            this.contentPaneClick(
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
                                                                                                                                    this.cssApplier(
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
                                                                                                                            this.contentPaneClick(
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
                                                                                                                                    this.cssApplier(
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
                                                                                                                            this.contentPaneClick(
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
                                                                                                                                    this.cssApplier(
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
                                                                                                                                    this.contentPaneClick(
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
                                                                                                                                            this.cssApplier(
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
                                                                                                                                    this.contentPaneClick(
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
                                                                                                                                            this.cssApplier(
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
                                                                                                                                    this.contentPaneClick(
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
                                                                                                                                            this.cssApplier(
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
                                                                                                                                    this.contentPaneClick(
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
                                                                                                                                            this.cssApplier(
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
                                                                                                                                    this.contentPaneClick(
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
                                                                                                                                            this.cssApplier(
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
                                                                                                                                    this.contentPaneClick(
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
                                                                                                                                            this.cssApplier(
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
                                                                                                                                    this.contentPaneClick(
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
                                                                                                                                            this.cssApplier(
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
                                                                                                                                    this.contentPaneClick(
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
                                                                                                                                            this.cssApplier(
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
                                                                                                                                    this.contentPaneClick(
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
                                                                                                                                            this.cssApplier(
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
                                                currentColumn={this.state.column[this.state.activeColumnId]}
                                                setShowEditor={this.setShowHtmlEditor}
                                                showHtmlEditor={this.state.showHtmlEditor}
                                                onChangeTextArea={this.onChangeTextArea}
                                                contentIndex={this.state.activeContentIndex}
                                                currentColumnContentIndex={this.state.currentColumnContentIndex}
                                                contentFor={this.state.contentFor}
                                                setColumn={this.setColumn}
                                            />
                                            <CssEditor 
                                                currentColumn={this.state.column[this.state.activeColumnId]}
                                                setShowCssEditor={this.setShowCssEditor}
                                                showCssEditor={this.state.showCssEditor}
                                                onChangeTextArea={this.onChangeTextArea}
                                                contentIndex={this.state.activeContentIndex}
                                                currentColumnContentIndex={this.state.currentColumnContentIndex}
                                                setApplyCss={this.setApplyCss}
                                            />
                                            <TextEditor 
                                                currentColumn={this.state.column[this.state.activeColumnId]}
                                                setShowTextEditor={this.setShowTextEditor}
                                                showTextEditor={this.state.showTextEditor}
                                                onChangeTextArea={this.onChangeTextArea}
                                                contentIndex={this.state.activeContentIndex}
                                                currentColumnContentIndex={this.state.currentColumnContentIndex}
                                                contentFor={this.state.contentFor}
                                                setColumn={this.setColumn}
                                                mChoiceIndex={this.state.mChoiceIndex}
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
                {this.props.action === "add" ?
                    <button type="button" className="btn btn-success" onClick={() => this.setModalShow(true, 'add')}>Add Slide</button>
                :
                    <div id="edit-slide-btn" className="d-inline">
                        <button type="button" className="btn btn-link pl-0" onClick={() => this.setModalShow(true, 'edit')}>| Edit</button>
                    </div>
                }
                {slideModal}
            </div>
        )
    }
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
