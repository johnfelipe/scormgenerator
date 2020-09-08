import React, { Component } from 'react';

// formik
import { Formik } from "formik";
import * as Yup from 'yup';

// react beautiful dnd
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faListAlt, faEye, faEyeSlash, faList, faVideo, faHandRock, faIdCardAlt, faFileImage, faListUl, faWindowRestore, faChartPie, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faFileAudio, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

// react bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Modal, Tab, Tabs } from 'react-bootstrap';

// redux library
import { connect } from 'react-redux';

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
import ListModalLayout from '../Slide/Layouts/ListModalLayout';
import VideoLayout from '../Slide/Layouts/VideoLayout';
import DragDropLayout from '../Slide/Layouts/DragDropLayout';
import CardLayout from '../Slide/Layouts/CardLayout';
import ImageLayout from '../Slide/Layouts/ImageLayout';
import ListLayout from '../Slide/Layouts/ListLayout';
import ContentAreaLayout from '../Slide/Layouts/ContentAreaLayout';
import AudioLayout from '../Slide/Layouts/AudioLayout';
import TabsLayout from '../Slide/Layouts/TabsLayout';
import SgChartsLayout from '../Slide/Layouts/SgChartsLayout';
import SgAccordionLayout from '../Slide/Layouts/SgAccordionLayout';

// modals
import WarningModal from '../AlertModal/Warning';

// actions
import { slideActions, courseActions, columnActions } from '../../actions';

// helpers
import { objectHelpers } from '../../helpers';

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
                { type: 'accordion', name: 'Accordion', icon: faChevronCircleDown, },
                { type: 'audio', name: 'Audio', icon: faFileAudio, },
                { type: 'card', name: 'Card', icon: faIdCardAlt, },
                { type: 'sgCharts', name: 'Charts', icon: faChartPie, },
                { type: 'contentArea', name: 'Content Area', icon: faSquare, },
                { type: 'courseObjectives', name: 'Course Objectives', icon: faListAlt, },
                { type: 'dragDrop', name: 'Drag and Drop', icon: faHandRock, },
                { type: 'homePage', name: 'Home Page', icon: faHome, },
                { type: 'image', name: 'Image', icon: faFileImage, },
                { type: 'list', name: 'List', icon: faListUl, },
                { type: 'listModal', name: 'List Modal', icon: faList, },
                { type: 'multipleChoice', name: 'Multiple Choice', icon: faQuestionCircle, },
                { type: 'tabs', name: 'Tabs', icon: faWindowRestore, },
                { type: 'video', name: 'Video', icon: faVideo, },
            ],
            fixedFeatures: [
                { type: 'courseObjectives', name: 'Course Objectives', icon: faListAlt, },
                { type: 'homePage', name: 'Home Page', icon: faHome, },
                { type: 'multipleChoice', name: 'Multiple Choice', icon: faQuestionCircle, },
            ],
            fluidFeatures: [
                { type: 'accordion', name: 'Accordion', icon: faChevronCircleDown, },
                { type: 'audio', name: 'Audio', icon: faFileAudio, },
                { type: 'card', name: 'Card', icon: faIdCardAlt, },
                { type: 'sgCharts', name: 'Charts', icon: faChartPie, },
                { type: 'contentArea', name: 'Content Area', icon: faSquare, },
                { type: 'dragDrop', name: 'Drag and Drop', icon: faHandRock, },
                { type: 'image', name: 'Image', icon: faFileImage, },
                { type: 'list', name: 'List', icon: faListUl, },
                { type: 'listModal', name: 'List Modal', icon: faList, },
                { type: 'tabs', name: 'Tabs', icon: faWindowRestore, },
                { type: 'video', name: 'Video', icon: faVideo, },
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
            correctAnswers: [],
            activeOutputIndex: -1,
            slideId: -1,
        };
        
        this.stringifySlideColumns = this.stringifySlideColumns.bind(this);
        this.setSlideId = this.setSlideId.bind(this);
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
        this.setCorrectAnswers = this.setCorrectAnswers.bind(this);
        this.setActiveOutputIndex = this.setActiveOutputIndex.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount = () => {
        if(sessionStorage.getItem("selectedAnswers")) {
            this.setCorrectAnswers(JSON.parse(sessionStorage.getItem("selectedAnswers")));
            sessionStorage.removeItem("selectedAnswers");
        }

        if (this.props.sid) {
            this.props.getSlideColumns(this.props.sid);
        }
    }

    componentDidUpdate(prevProps, nextProps) {
        if(sessionStorage.getItem("selectedAnswers")) {
            this.setCorrectAnswers(JSON.parse(sessionStorage.getItem("selectedAnswers")));
            sessionStorage.removeItem("selectedAnswers");
        }

        if (this.props.sid !== prevProps.sid) {
            this.props.getSlideColumns(this.props.sid);
        }
        
        console.log('state.columns: ');
        console.log(this.state.column);
        console.log('props.columns: ');
        console.log(this.props.currentColumns);
        // console.log('state.modalShow: ');
        // console.log(this.state.modalShow);
        // console.log('this.props.currentSlide');
        // console.log(this.props.currentSlide);
        // console.log('this.props.currentSlideIndex');
        // console.log(this.props.currentSlideIndex);
        // console.log('this.props.cid');
        // console.log(this.props.cid);
        // console.log('this.props.sid');
        // console.log(this.props.sid);
        // console.log('this.props.currentSlide.sid');
        // console.log(this.props.currentSlide.sid);
        // console.log('this.props.lid');
        // console.log(this.props.lid);
        // console.log('this.props.columns');
        // console.log(this.props.columns);
        // console.log('this.props.lessonIndex');
        // console.log(this.props.lessonIndex);

        // if (this.props.cid) {
        //     this.props.getCourseLessons(this.props.cid);
        // }
        // console.log('props.action');
        // console.log(this.props.action);
        // console.log('state.activeFeature');
        // console.log(this.state.activeFeature);
        // console.log('this.props.slide');
        // console.log(this.props.slide);
        // console.log('this.props.column');
        // console.log(this.props.columns);
    }

    stringifySlideColumns = (sid, userId, columnArr, action) => {
        for (let index in columnArr) {

            let featuresJson = JSON.stringify(columnArr[index]);

            if (action === 'add') {
                const data = {
                    sid: sid,
                    uid: userId,
                    grid: columnArr[index].grid,
                    features: btoa(unescape(encodeURIComponent(featuresJson)))
                }

                console.log(data);
                this.props.createColumn(data);
            } else if (action === 'edit') {
                console.log('EXECEUTED! EDIT');
                if (objectHelpers.isEmpty(this.props.slideColumns[index])) {
                    console.log('IF HERE');
                    const data = {
                        sid: sid,
                        uid: userId,
                        grid: columnArr[index].grid,
                        features: btoa(unescape(encodeURIComponent(featuresJson)))
                    }

                    this.props.createColumn(data);
                    console.log('EXECEUTED!');
                } else if (columnArr[index].clid) {
                    console.log('ELFSE IF HERE');
                    const data = {
                        grid: columnArr[index].grid,
                        features: btoa(unescape(encodeURIComponent(featuresJson)))
                    }

                    const id = columnArr[index].clid;
                    this.props.updateColumn(data, id);
                } else {
                    console.log('ELSE HERE');
                    const data = {
                        grid: columnArr[index].grid,
                        features: btoa(unescape(encodeURIComponent(featuresJson)))
                    }

                    const id = this.props.slideColumns[index].clid;
                    this.props.updateColumn(data, id);
                }
                
            }
            
        }
    }

    setSlideId = (value) => {
        this.setState({
            slideId: value
        })
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
    }

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
    }
    
    resetFeature = (contentIndex, featureType) => {
        const currentColumnObj = this.state.column[this.state.activeColumnId];
        const currentColumnContentIndex = this.state.currentColumnContentIndex;

        if (featureType === "audio") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'audio',
                output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                class: '',
                id: '',
                style: {
                    backgroundImg: {
                        name: '',
                        url: '',
                    },
                },
                css: '',
            };
        } else if (featureType === "contentArea") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'contentArea',
                output: '<p>This content will show up directly in its container.</p>',
                class: '',
                id: '',
                style: {
                    backgroundImg: {
                        name: '',
                        url: '',
                    },
                },
                css: '',
            };
        } else if (featureType === "multipleChoice") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'multipleChoice',
                output: [],
                class: 'question-files-left',
                id: '',
                styles: {
                    questionLabelClass: 'rounded-circle',
                    questionBackgroundColor: '#fff',
                    multipleChoiceTextColor: 'text-black',
                    backgroundImg: {
                        name: '',
                        url: '',
                    },
                },
                mechanics: {
                    repeat: 0,
                    passingRate: 80,
                    specificType: 'knowledgeCheck',
                    returnSlide: 0
                },
                css: '',
            };
        } else if (featureType === "homePage") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'homePage',
                output: {
                    title: 'Title',
                    subtitle: 'Subtitle',
                    date: '',
                    courseId: '',
                    backgroundImg: {
                        name: '',
                        url: ''
                    }
                },
                class: 'course-title-bottom-left',
                id: '',
                styles: {
                    titleBoxColor: '#0069d9',
                    titleBoxBorder: 'border-bottom'
                },
                css: '',
            };
        } else if (featureType === "courseObjectives") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'courseObjectives',
                output: {
                    courseNav: {
                        name: 'Course Navigation',
                    },
                    courseInfo: {
                        name: 'Course Information',
                        content: '<span>No information provided yet.</span>'
                    }, courseReq:  {
                        name: 'Course Requirements',
                        content: '<span>No requirements provided yet</span>.'
                    }, 
                },
                class: '',
                id: '',
                styles: {
                    courseIntroColor: '#0069d9'
                },
                introVideo: {
                    name: 'file_example_MP4_480_1_5MG',
                    url: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
                    type: 'video/mp4',
                    position: 'course-objectives-video-left'
                },
                css: '', 
            };
        } else if (featureType === "listModal") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'listModal',
                output: [],
                class: '',
                id: '',
                styles: {
                    btnWidth: 0,
                    btnLabelAlignment: 'text-center',
                    btnPosition: 'text-center',
                    btnColor: '#0069d9',
                    backgroundImg: {
                        name: '',
                        url: '',
                    },
                },
                css: '',
            };
        } else if (featureType === "video") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'video',
                output: {
                    name: '',
                    url: '',
                    type: '',
                    show: 'yes',
                    paragraph: '',
                    vtt: {
                        name: '',
                        url: '',
                        type: '',
                    },
                },
                class: '',
                id: '',
                css: '',
            };
        } else if (featureType === "dragDrop") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'dragDrop',
                output: [],
                class: '',
                id: '',
                styles: {
                    dragDropBackgroundColor: '#fff',
                    dragDropTextColor: 'text-black',
                    themeColor: '#0069d9',
                    backgroundImg: '',
                },
                css: '',
            };
        } else if (featureType === "card") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'card',
                output: {
                    img: {
                        name: '',
                        url: '',
                        type: '',
                        alt: '',
                    },
                    title: 'Card title',
                    content: 'No content provided yet.',
                    button: {
                        label: 'Click me',
                        url: '',
                    }
                },
                class: '',
                id: '',
                styles: {
                    themeColor: '#0069d9',
                },
                css: '',
            };
        } else if (featureType === "image") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'image',
                output: {
                    name: '',
                    url: '',
                    type: '',
                    paragraph: '',
                    alt: '',
                },
                class: '',
                id: '',
                css: '',
            };
        } else if (featureType === "list") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'list',
                output: {
                    title: '',
                    entries: [],
                },
                class: '',
                id: '',
                style: {
                    listStyle: '',
                    backgroundImg: {
                        name: '',
                        url: '',
                    },
                },
                css: '',
            };
        } else if (featureType === "tabs") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'tabs',
                output: [],
                class: '',
                id: '',
                style: {
                    backgroundImg: {
                        name: '',
                        url: '',
                    },
                    tabStyle: 'tabs',
                    tabPosition: 'top',
                },
                css: '',
            };
        } else if (featureType === "sgCharts") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'sgCharts',
                output: {
                    chartType: 'pie',
                    dataSets: {},
                    chartOptions: {
                        shownData: [],
                    },
                    csvFile: {
                        name: '',
                        url: '',
                        headers: [],
                        data: [],
                    }
                },
                class: '',
                id: '',
                style: {
                    backgroundImg: {
                        name: '',
                        url: '',
                    },
                },
                css: '',
            };
        } else if (featureType === "accordion") {
            currentColumnObj.content[currentColumnContentIndex][contentIndex] = {
                type: 'accordion',
                output: [],
                class: '',
                id: '',
                style: {
                    backgroundImg: {
                        name: '',
                        url: '',
                    },
                    headerColor: '',
                    backgroundColor: '#fff',
                    textColor: '',
                    header: {
                        bgColor: '',
                        tColor: '',
                    },
                },
                css: '',
            };
        }

        const columns = this.state.column;
        columns[this.state.activeColumnId] = currentColumnObj;

        this.setState({
            column: columns,
        })
    }

    onDragEnd = result => {
        const { source, destination } = result;
        const activeColumnId = this.state.activeColumnId;

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

        if ((source.droppableId === "fixed-features" || source.droppableId === "fluid-features") && (destination.droppableId !== "fixed-features" || destination.droppableId !== "fluid-features")) {
            const currentColumns = this.state.column;

            this.setActiveTab("editor");

            for (var key in currentColumns) {
                if (destination.droppableId === currentColumns[key]['id']) {
                    // First Size

                    this.setState({
                        currentColumnContentIndex: 'subColumnOne',
                    });

                    destination.index = parseInt(key);
                    const currentFeatures = this.state.features;
                    
                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                audio: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    show: 'yes',
                                }
                            },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'multipleChoice') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: 'question-files-left',
                            id: '',
                            styles: {
                                questionLabelClass: 'rounded-circle',
                                questionBackgroundColor: '#fff',
                                multipleChoiceTextColor: 'text-black',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            mechanics: {
                                repeat: 0,
                                passingRate: 80,
                                specificType: 'knowledgeCheck',
                                returnSlide: 0
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'homePage') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                title: 'Title',
                                subtitle: 'Subtitle',
                                date: '',
                                courseId: '',
                                backgroundImg: {
                                    name: '',
                                    url: ''
                                }
                            },
                            class: 'course-title-bottom-left',
                            id: '',
                            styles: {
                                titleBoxColor: '#0069d9',
                                titleBoxBorder: 'border-bottom'
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'courseObjectives') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                courseNav: {
                                    name: 'Course Navigation',
                                },
                                courseInfo: {
                                    name: 'Course Information',
                                    content: '<span>No information provided yet.</span>'
                                },
                                courseReq: {
                                    name: 'Course Requirements',
                                    content: '<span>No requirements provided yet</span>.'
                                },
                            },
                            class: '',
                            id: '',
                            styles: {
                                courseIntroColor: '#0069d9'
                            },
                            introVideo: {
                                name: 'file_example_MP4_480_1_5MG',
                                url: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
                                type: 'video/mp4',
                                position: 'course-objectives-video-left'
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'video') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                name: '',
                                url: '',
                                type: '',
                                show: 'yes',
                                paragraph: '',
                                vtt: {
                                    name: '',
                                    url: '',
                                    type: '',
                                },
                            },
                            class: '',
                            id: '',
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'dragDrop') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                dragDropBackgroundColor: '#fff',
                                dragDropTextColor: 'text-black',
                                themeColor: '#0069d9',
                                backgroundImg: '',
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'image') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                name: '',
                                url: '',
                                type: '',
                                paragraph: '',
                                alt: '',
                            },
                            class: '',
                            id: '',
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'list') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                title: '',
                                entries: [],
                            },
                            class: '',
                            id: '',
                            style: {
                                listStyle: '',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'tabs') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                                tabStyle: 'tabs',
                                tabPosition: 'top',
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'sgCharts') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                chartType: 'pie',
                                dataSets: {},
                                chartOptions: {
                                    shownData: [],
                                },
                                csvFile: {
                                    name: '',
                                    url: '',
                                    headers: [],
                                    data: [],
                                }
                            },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'accordion') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                                headerColor: '',
                                backgroundColor: '#fff',
                                textColor: '',
                                header: {
                                    bgColor: '',
                                    tColor: '',
                                },
                            },
                            css: '',
                        };
                        
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
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'contentArea') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '',
                            class: '',
                            id: '' 
                        };

                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnFour.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFour.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '',
                            class: '',
                            id: '' 
                        };

                        currentColumns[key].content.subColumnFour.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFour.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnFour.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFour.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnOne.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnOne.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnTwo.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnTwo.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnThree.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnThree.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnFour.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFour.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnFour.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFour.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnFour.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFour.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: '<p>This content will show up directly in its container.</p>',
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnFive.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFive.length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                    audio: {
                        name: '',
                        url: '',
                        type: '',
                        show: 'yes',
                    }
                },
                            class: '',
                            id: '',
                            style: {
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };

                        currentColumns[key].content.subColumnFive.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFive.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'listModal') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: [],
                            class: '',
                            id: '',
                            styles: {
                                btnWidth: 0,
                                btnLabelAlignment: 'text-center',
                                btnPosition: 'text-center',
                                btnColor: '#0069d9',
                                backgroundImg: {
                                    name: '',
                                    url: '',
                                },
                            },
                            css: '',
                        };
                        
                        currentColumns[key].content.subColumnFive.push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content.subColumnFive.length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'card') {
                        let currentContent = {
                            type: currentFeatures[source.index]['type'],
                            output: {
                                img: {
                                    name: '',
                                    url: '',
                                    type: '',
                                    alt: '',
                                },
                                title: 'Card title',
                                content: 'No content provided yet.',
                                button: {
                                    label: 'Click me',
                                    url: '',
                                }
                            },
                            class: '',
                            id: '',
                            styles: {
                                themeColor: '#0069d9',
                            },
                            css: '',
                        };

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

            console.log(source);
            console.log(destination);
            console.log(this.state.currentColumnContentIndex);

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

    setShowHtmlEditor = (value, contentIndex, contentFor, activeOutputIndex) => {
        this.setState({
            showHtmlEditor: value,
            activeContentIndex: contentIndex,
            contentFor: contentFor,
            activeOutputIndex: activeOutputIndex,
        })
    }

    onChangeTextArea = (value, contentIndex, editorType) => {
        const currentColumnObj = this.state.column[this.state.activeColumnId];
        const currentColumnContentIndex = this.state.currentColumnContentIndex;

        if (editorType === 'html') {
            currentColumnObj.content[currentColumnContentIndex][contentIndex].output = value;
        } else if (editorType === 'css') {
            try {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].css = value;
            } catch (err) { console.log(err) }
        } else if (editorType.type === 'text') {
            if (editorType.for === 'courseInfo') {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseInfo.content = value;
            } else if (editorType.for === 'courseReq') {
                currentColumnObj.content[currentColumnContentIndex][contentIndex].output.courseReq.content = value;
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

    setCorrectAnswers = (value) => {
        this.setState({
            correctAnswers: value,
        })
    }

    setActiveOutputIndex = (value) => {
        this.setState({
            activeOutputIndex: value,
        })
    }

    onSave = (slideObj, sid, lessonIndex, columnArray) => {
        if (this.props.action === "add") {
            this.props.createSlide(slideObj, lessonIndex, columnArray, this.props.currentSlideIndex, this.props.uid);
            // console.log("add");
            // console.log(slideObj);
        } else if (this.props.action === "edit") {
            this.props.updateSlide(slideObj, sid);
            this.props.updateSlideFromCourseLesson(slideObj, this.props.currentSlideIndex, this.props.lessonIndex);
            this.props.appendSlideColumnsFromCourseLesson(columnArray, this.props.currentSlideIndex, this.props.lessonIndex);
            // creates column
            this.stringifySlideColumns(sid, this.props.uid, columnArray, this.props.action);
            // console.log("edit");
            // console.log(slideObj);
            // console.log(this.props.currentSlideIndex);
            // console.log(this.props.lessonIndex);
        }
        
        this.setModalShow(false, 'save')
    }

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
                            showTitle: this.props.hide_title ? true : false,
                        }}

                        onSubmit={values => {
                            const data = {
                                lid: this.props.lid,
                                title: values.slideName,
                                subtitle: values.slideSubtitle,
                                uid: this.props.uid,
                                hide_title: values.showTitle ? 1 : 0,
                                columns: [],
                                weight: this.props.slideWeight,
                            }

                            this.onSave(data, this.props.sid, this.props.lessonIndex, this.state.column);
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
                                                // addMediaFiles={this.props.addMediaFiles}
                                                // mediaFilesObject={this.props.mediaFilesObject}
                                                // setMediaFilesObject={this.props.setMediaFilesObject}
                                                buttonName="Open Library"
                                                uid={this.props.uid}
                                            />
                                        </div>
                                    </div>
                                    <DragDropContext onDragEnd={this.onDragEnd}>
                                        <div className="row mt-2">
                                            <div id="slide-sidebar" className="col-md-3 pr-0">
                                                <Tabs activeKey={this.state.activeTab} onSelect={this.setActiveTab} id="slide-tabs" className="text-center">
                                                    <Tab eventKey="column" title="Column" className="mt-1">
                                                        <div className="sg-workspace-content-section">
                                                            {this.state.column.length !== 0 ?
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
                                                                                                clid={item.clid}
                                                                                                sid={item.sid}
                                                                                                lid={item.lid}
                                                                                                slideIndex={this.props.currentSlideIndex}
                                                                                                lessonIndex={this.props.lessonIndex}
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
                                                    <Tab eventKey="features" title="Features">
                                                        <Tabs id="features-category-tabs" defaultActiveKey="fixed" className="text-center">
                                                            <Tab eventKey="fixed" title="Fixed" tabClassName="sg-w-100-div-2">
                                                                <Droppable droppableId="fixed-features">
                                                                    {(provided) => (
                                                                        <div ref={provided.innerRef} className="sg-feature-list">
                                                                            {this.state.fixedFeatures.map((item, featureIndex) => (
                                                                                <Draggable
                                                                                    key={'fixed-feature-draggable-' + featureIndex}
                                                                                    draggableId={'fixed-feature-' + featureIndex}
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
                                                            <Tab eventKey="fluid" title="Fluid" tabClassName="sg-w-100-div-2">
                                                                <Droppable droppableId="fluid-features">
                                                                    {(provided) => (
                                                                        <div ref={provided.innerRef} className="sg-feature-list">
                                                                            {this.state.fluidFeatures.map((item, featureIndex) => (
                                                                                <Draggable
                                                                                    key={'fluid-feature-draggable-' + featureIndex}
                                                                                    draggableId={'fluid-feature-' + featureIndex}
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
                                                        </Tabs>
                                                        {/* <Droppable droppableId="features">
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
                                                        </Droppable> */}
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
                                                            correctAnswers={this.state.correctAnswers}
                                                            setMediaFilesObject={this.props.setMediaFilesObject}
                                                            setActiveOutputIndex={this.setActiveOutputIndex}
                                                            uid={this.props.uid}
                                                        />
                                                    </Tab>
                                                </Tabs>
                                            </div>
                                            <div id="slide-content" className="col-md-9 pl-0">
                                                <div id="slide-content-container" className="border p-3 h-100">
                                                    {this.state.column.length > 0 ?
                                                        this.state.column.map((item, index) => (
                                                            item.grid === 0 || item.grid === -1 ?
                                                                <Droppable key={index} droppableId={item.id}>
                                                                    {/* First Size */}
                                                                    {(provided) => (
                                                                        <div ref={provided.innerRef} className="feature-preview-container p-0 pb-3">
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
                                                                                                                        <CourseObjLayout
                                                                                                                            styles={contentFirst.styles}
                                                                                                                            output={contentFirst.output}
                                                                                                                            introVideo={contentFirst.introVideo}
                                                                                                                            css={contentFirst.css}
                                                                                                                            cssApplier={this.cssApplier}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }

                                                                                                                {contentFirst.type === 'listModal' &&
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
                                                                                                                        <ListModalLayout
                                                                                                                            output={contentFirst.output}
                                                                                                                            styles={contentFirst.styles}
                                                                                                                            css={contentFirst.css}
                                                                                                                            cssApplier={this.cssApplier}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }

                                                                                                                {contentFirst.type === 'video' &&
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
                                                                                                                        <VideoLayout
                                                                                                                            output={contentFirst.output}
                                                                                                                            css={contentFirst.css}
                                                                                                                            cssApplier={this.cssApplier}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }

                                                                                                                {contentFirst.type === 'dragDrop' &&
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
                                                                                                                        <DragDropLayout
                                                                                                                            dragDrop={contentFirst.output}
                                                                                                                            dragDropClass={contentFirst.class}
                                                                                                                            dragDropId={contentFirst.id}
                                                                                                                            dragDropStyles={contentFirst.styles}
                                                                                                                            dragDropCss={contentFirst.css}
                                                                                                                            cssApplier={this.cssApplier}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }

                                                                                                                {contentFirst.type === 'card' &&
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
                                                                                                                        <CardLayout
                                                                                                                            cardOutput={contentFirst.output}
                                                                                                                            cardClass={contentFirst.class}
                                                                                                                            cardId={contentFirst.id}
                                                                                                                            cardStyles={contentFirst.styles}
                                                                                                                            css={contentFirst.css}
                                                                                                                            cssApplier={this.cssApplier}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }

                                                                                                                {contentFirst.type === 'image' &&
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
                                                                                                                        <ImageLayout
                                                                                                                            output={contentFirst.output}
                                                                                                                            css={contentFirst.css}
                                                                                                                            cssApplier={this.cssApplier}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }

                                                                                                                {contentFirst.type === 'list' &&
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
                                                                                                                        <ListLayout
                                                                                                                            list={contentFirst.output}
                                                                                                                            listStyles={contentFirst.style}
                                                                                                                            css={contentFirst.css}
                                                                                                                            cssApplier={this.cssApplier}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }

                                                                                                                {contentFirst.type === 'contentArea' &&
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
                                                                                                                        <ContentAreaLayout
                                                                                                                            output={contentFirst.output}
                                                                                                                            style={contentFirst.style}
                                                                                                                            css={contentFirst.css}
                                                                                                                            cssApplier={this.cssApplier}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }

                                                                                                                {contentFirst.type === 'audio' &&
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
                                                                                                                        <AudioLayout
                                                                                                                            output={contentFirst.output}
                                                                                                                            style={contentFirst.style}
                                                                                                                            css={contentFirst.css}
                                                                                                                            cssApplier={this.cssApplier}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }

                                                                                                                {contentFirst.type === 'tabs' &&
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
                                                                                                                        <TabsLayout
                                                                                                                            output={contentFirst.output}
                                                                                                                            style={contentFirst.style}
                                                                                                                            css={contentFirst.css}
                                                                                                                            cssApplier={this.cssApplier}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }

                                                                                                                {contentFirst.type === 'sgCharts' &&
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
                                                                                                                        <SgChartsLayout
                                                                                                                            output={contentFirst.output}
                                                                                                                            style={contentFirst.style}
                                                                                                                            css={contentFirst.css}
                                                                                                                            cssApplier={this.cssApplier}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                }

                                                                                                                {contentFirst.type === 'accordion' &&
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
                                                                                                                        <SgAccordionLayout
                                                                                                                            output={contentFirst.output}
                                                                                                                            style={contentFirst.style}
                                                                                                                            css={contentFirst.css}
                                                                                                                            cssApplier={this.cssApplier}
                                                                                                                        />
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
                                                                    <div key={index} className="feature-preview-container p-0 pb-3">
                                                                        {/* Second Size */}
                                                                        <div className="row w-100 m-0">
                                                                            <Droppable droppableId={item.id + '-sg-1-2-1'}>
                                                                                {(provided) => (
                                                                                    <div 
                                                                                        key={'sg-1-2-1-' + index} 
                                                                                        ref={provided.innerRef} 
                                                                                        id={'sg-1-2-1-' + index} 
                                                                                        className="d-inline p-3 text-center sg-column h-100 sg-1-2" tabIndex="0"
                                                                                    >
                                                                                        {
                                                                                            typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                                item.content['subColumnOne'].length > 0 ?
                                                                                                    item.content['subColumnOne'].map((contentFirst, contentFirstIndex) =>(
                                                                                                        <Draggable
                                                                                                            key={'feature-' + contentFirst.type + '-' + contentFirstIndex}
                                                                                                            draggableId={contentFirst.type + '-' + contentFirstIndex + '-sg-1-2-1'}
                                                                                                            index={contentFirstIndex}
                                                                                                        >
                                                                                                            {(provided) => (
                                                                                                                <>
                                                                                                                    {contentFirst.type === 'listModal' &&
                                                                                                                        <div 
                                                                                                                            ref={provided.innerRef}
                                                                                                                            {...provided.draggableProps}
                                                                                                                            {...provided.dragHandleProps}

                                                                                                                            key={item.id + '-content-output-' + contentFirstIndex}
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
                                                                                                                            <ListModalLayout
                                                                                                                                output={contentFirst.output}
                                                                                                                                styles={contentFirst.styles}
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    }

                                                                                                                    {contentFirst.type === 'card' &&
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
                                                                                                                            <CardLayout
                                                                                                                                cardOutput={contentFirst.output}
                                                                                                                                cardClass={contentFirst.class}
                                                                                                                                cardId={contentFirst.id}
                                                                                                                                cardStyles={contentFirst.styles}
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    }
                                                                                                                        
                                                                                                                    {contentFirst.type === 'contentArea' &&
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
                                                                                                                            <ContentAreaLayout
                                                                                                                                output={contentFirst.output}
                                                                                                                                style={contentFirst.style}
                                                                                                                                css={contentFirst.css}
                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    }

                                                                                                                    {contentFirst.type === 'audio' &&
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
                                                                                                                            <AudioLayout
                                                                                                                                output={contentFirst.output}
                                                                                                                                style={contentFirst.style}
                                                                                                                                css={contentFirst.css}
                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    }
                                                                                                                </>
                                                                                                            )}
                                                                                                        </Draggable>
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
                                                                                        className="d-inline p-3 text-center sg-column h-100 sg-1-2" tabIndex="1"
                                                                                    >
                                                                                        {
                                                                                            typeof item.content['subColumnTwo'] != "undefined" ? 
                                                                                                item.content['subColumnTwo'].length > 0 ?
                                                                                                    item.content['subColumnTwo'].map((contentSecond, contentSecondIndex) =>(
                                                                                                        <Draggable
                                                                                                            key={'feature-' + contentSecond.type + '-' + contentSecondIndex}
                                                                                                            draggableId={contentSecond.type + '-' + contentSecondIndex + '-sg-1-2-2'}
                                                                                                            index={contentSecondIndex}
                                                                                                        >
                                                                                                            {(provided) => (
                                                                                                                <>
                                                                                                                    {contentSecond.type === 'listModal' &&
                                                                                                                        <div 
                                                                                                                            ref={provided.innerRef}
                                                                                                                            {...provided.draggableProps}
                                                                                                                            {...provided.dragHandleProps}

                                                                                                                            key={item.id + '-content-output-' + contentSecondIndex}
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
                                                                                                                            <ListModalLayout
                                                                                                                                output={contentSecond.output}
                                                                                                                                styles={contentSecond.styles}
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    }

                                                                                                                    {contentSecond.type === 'card' &&
                                                                                                                        <div 
                                                                                                                            ref={provided.innerRef}
                                                                                                                            {...provided.draggableProps}
                                                                                                                            {...provided.dragHandleProps}

                                                                                                                            key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                            className="content-output"
                                                                                                                            id={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                            onClick={() => 
                                                                                                                                this.contentPaneClick(
                                                                                                                                    index, 
                                                                                                                                    contentSecondIndex,
                                                                                                                                    item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                    'subColumnTwo'
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            <CardLayout
                                                                                                                                cardOutput={contentSecond.output}
                                                                                                                                cardClass={contentSecond.class}
                                                                                                                                cardId={contentSecond.id}
                                                                                                                                cardStyles={contentSecond.styles}
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    }
                                                                                                                        
                                                                                                                    {contentSecond.type === 'contentArea' &&
                                                                                                                        <div 
                                                                                                                            ref={provided.innerRef}
                                                                                                                            {...provided.draggableProps}
                                                                                                                            {...provided.dragHandleProps}

                                                                                                                            key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                            id={
                                                                                                                                contentSecond.id ? 
                                                                                                                                    contentSecond.id
                                                                                                                                : 
                                                                                                                                    item.id + '-content-output-' + contentSecondIndex
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
                                                                                                                                    item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                    'subColumnTwo'
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            <ContentAreaLayout
                                                                                                                                output={contentSecond.output}
                                                                                                                                style={contentSecond.style}
                                                                                                                                css={contentSecond.css}
                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    }

                                                                                                                    {contentSecond.type === 'audio' &&
                                                                                                                        <div 
                                                                                                                            ref={provided.innerRef}
                                                                                                                            {...provided.draggableProps}
                                                                                                                            {...provided.dragHandleProps}

                                                                                                                            key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                            id={
                                                                                                                                contentSecond.id ? 
                                                                                                                                    contentSecond.id
                                                                                                                                : 
                                                                                                                                    item.id + '-content-output-' + contentSecondIndex
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
                                                                                                                                    item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                    'subColumnTwo'
                                                                                                                                )
                                                                                                                            }
                                                                                                                        >
                                                                                                                            <AudioLayout
                                                                                                                                output={contentSecond.output}
                                                                                                                                style={contentSecond.style}
                                                                                                                                css={contentSecond.css}
                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    }
                                                                                                                </>
                                                                                                            )}
                                                                                                        </Draggable>
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
                                                                        
                                                                        <div key={index} className="feature-preview-container p-0 pb-3">
                                                                            {/* Third Size */}
                                                                            <div className="row w-100 m-0">
                                                                                <Droppable droppableId={item.id + '-sg-1-3-1'}>
                                                                                    {(provided) => (
                                                                                        <div 
                                                                                            key={'sg-1-3-1-' + index} 
                                                                                            ref={provided.innerRef} 
                                                                                            id={'sg-1-3-1-' + index} 
                                                                                            className="d-inline p-3 text-center sg-column h-100 sg-1-3" tabIndex="0"
                                                                                        >
                                                                                            {
                                                                                                typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                                    item.content['subColumnOne'].length > 0 ?
                                                                                                        item.content['subColumnOne'].map((contentFirst, contentFirstIndex) =>(
                                                                                                            <Draggable
                                                                                                                key={'feature-' + contentFirst.type + '-' + contentFirstIndex}
                                                                                                                draggableId={contentFirst.type + '-' + contentFirstIndex + '-sg-1-3-1'}
                                                                                                                index={contentFirstIndex}
                                                                                                            >
                                                                                                                {(provided) => (
                                                                                                                    <>
                                                                                                                        {contentFirst.type === 'listModal' &&
                                                                                                                            <div 
                                                                                                                                ref={provided.innerRef}
                                                                                                                                {...provided.draggableProps}
                                                                                                                                {...provided.dragHandleProps}

                                                                                                                                key={item.id + '-content-output-' + contentFirstIndex}
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
                                                                                                                                <ListModalLayout
                                                                                                                                    output={contentFirst.output}
                                                                                                                                    styles={contentFirst.styles}
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        }

                                                                                                                        {contentFirst.type === 'card' &&
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
                                                                                                                                <CardLayout
                                                                                                                                    cardOutput={contentFirst.output}
                                                                                                                                    cardClass={contentFirst.class}
                                                                                                                                    cardId={contentFirst.id}
                                                                                                                                    cardStyles={contentFirst.styles}
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        }

                                                                                                                        {contentFirst.type === 'contentArea' &&
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
                                                                                                                                <ContentAreaLayout
                                                                                                                                    output={contentFirst.output}
                                                                                                                                    style={contentFirst.style}
                                                                                                                                    css={contentFirst.css}
                                                                                                                                    cssApplier={this.cssApplier}
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        }

                                                                                                                        {contentFirst.type === 'audio' &&
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
                                                                                                                                <AudioLayout
                                                                                                                                    output={contentFirst.output}
                                                                                                                                    style={contentFirst.style}
                                                                                                                                    css={contentFirst.css}
                                                                                                                                    cssApplier={this.cssApplier}
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        }
                                                                                                                    </>
                                                                                                                )}
                                                                                                            </Draggable>
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
                                                                                            className="d-inline p-3 text-center sg-column h-100 sg-2-3" tabIndex="1"
                                                                                        >
                                                                                            {
                                                                                                typeof item.content['subColumnTwo'] != "undefined" ? 
                                                                                                    item.content['subColumnTwo'].length > 0 ?
                                                                                                        item.content['subColumnTwo'].map((contentSecond, contentSecondIndex) =>(
                                                                                                            <Draggable
                                                                                                                key={'feature-' + contentSecond.type + '-' + contentSecondIndex}
                                                                                                                draggableId={contentSecond.type + '-' + contentSecondIndex + '-sg-2-3-2'}
                                                                                                                index={contentSecondIndex}
                                                                                                            >
                                                                                                                {(provided) => (
                                                                                                                    <>
                                                                                                                        {contentSecond.type === 'listModal' &&
                                                                                                                            <div 
                                                                                                                                ref={provided.innerRef}
                                                                                                                                {...provided.draggableProps}
                                                                                                                                {...provided.dragHandleProps}

                                                                                                                                key={item.id + '-content-output-' + contentSecondIndex}
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
                                                                                                                                <ListModalLayout
                                                                                                                                    output={contentSecond.output}
                                                                                                                                    styles={contentSecond.styles}
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        }

                                                                                                                        {contentSecond.type === 'card' &&
                                                                                                                            <div 
                                                                                                                                ref={provided.innerRef}
                                                                                                                                {...provided.draggableProps}
                                                                                                                                {...provided.dragHandleProps}

                                                                                                                                key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                className="content-output"
                                                                                                                                id={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                onClick={() => 
                                                                                                                                    this.contentPaneClick(
                                                                                                                                        index, 
                                                                                                                                        contentSecondIndex,
                                                                                                                                        item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                        'subColumnTwo'
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            >
                                                                                                                                <CardLayout
                                                                                                                                    cardOutput={contentSecond.output}
                                                                                                                                    cardClass={contentSecond.class}
                                                                                                                                    cardId={contentSecond.id}
                                                                                                                                    cardStyles={contentSecond.styles}
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        }

                                                                                                                        {contentSecond.type === 'contentArea' &&
                                                                                                                            <div 
                                                                                                                                ref={provided.innerRef}
                                                                                                                                {...provided.draggableProps}
                                                                                                                                {...provided.dragHandleProps}

                                                                                                                                key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                id={
                                                                                                                                    contentSecond.id ? 
                                                                                                                                        contentSecond.id
                                                                                                                                    : 
                                                                                                                                        item.id + '-content-output-' + contentSecondIndex
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
                                                                                                                                        item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                        'subColumnTwo'
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            >
                                                                                                                                <ContentAreaLayout
                                                                                                                                    output={contentSecond.output}
                                                                                                                                    style={contentSecond.style}
                                                                                                                                    css={contentSecond.css}
                                                                                                                                    cssApplier={this.cssApplier}
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        }

                                                                                                                        {contentSecond.type === 'audio' &&
                                                                                                                            <div 
                                                                                                                                ref={provided.innerRef}
                                                                                                                                {...provided.draggableProps}
                                                                                                                                {...provided.dragHandleProps}

                                                                                                                                key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                id={
                                                                                                                                    contentSecond.id ? 
                                                                                                                                        contentSecond.id
                                                                                                                                    : 
                                                                                                                                        item.id + '-content-output-' + contentSecondIndex
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
                                                                                                                                        item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                        'subColumnTwo'
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            >
                                                                                                                                <AudioLayout
                                                                                                                                    output={contentSecond.output}
                                                                                                                                    style={contentSecond.style}
                                                                                                                                    css={contentSecond.css}
                                                                                                                                    cssApplier={this.cssApplier}
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        }
                                                                                                                    </>
                                                                                                                )}
                                                                                                            </Draggable>
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
                                                                            
                                                                            <div key={index} className="feature-preview-container p-0 pb-3">
                                                                                {/* Fourth Size */}
                                                                                <div className="row w-100 m-0">
                                                                                    <Droppable droppableId={item.id + '-sg-2-3-1'}>
                                                                                        {(provided) => (
                                                                                            <div 
                                                                                                key={'sg-2-3-1-' + index} 
                                                                                                ref={provided.innerRef} 
                                                                                                id={'sg-2-3-1-' + index} 
                                                                                                className="d-inline p-3 text-center sg-column h-100 sg-2-3" tabIndex="0"
                                                                                            >
                                                                                                {
                                                                                                    typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                                        item.content['subColumnOne'].length > 0 ?
                                                                                                            item.content['subColumnOne'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                <Draggable
                                                                                                                    key={'feature-' + contentFirst.type + '-' + contentFirstIndex}
                                                                                                                    draggableId={contentFirst.type + '-' + contentFirstIndex + '-sg-2-3-1'}
                                                                                                                    index={contentFirstIndex}
                                                                                                                >
                                                                                                                    {(provided) => (
                                                                                                                        <>
                                                                                                                            {contentFirst.type === 'listModal' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentFirstIndex}
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
                                                                                                                                    <ListModalLayout
                                                                                                                                        output={contentFirst.output}
                                                                                                                                        styles={contentFirst.styles}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentFirst.type === 'card' &&
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
                                                                                                                                    <CardLayout
                                                                                                                                        cardOutput={contentFirst.output}
                                                                                                                                        cardClass={contentFirst.class}
                                                                                                                                        cardId={contentFirst.id}
                                                                                                                                        cardStyles={contentFirst.styles}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentFirst.type === 'contentArea' &&
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
                                                                                                                                    <ContentAreaLayout
                                                                                                                                        output={contentFirst.output}
                                                                                                                                        style={contentFirst.style}
                                                                                                                                        css={contentFirst.css}
                                                                                                                                        cssApplier={this.cssApplier}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentFirst.type === 'audio' &&
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
                                                                                                                                    <AudioLayout
                                                                                                                                        output={contentFirst.output}
                                                                                                                                        style={contentFirst.style}
                                                                                                                                        css={contentFirst.css}
                                                                                                                                        cssApplier={this.cssApplier}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }
                                                                                                                        </>
                                                                                                                    )}
                                                                                                                </Draggable>
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
                                                                                                className="d-inline p-3 text-center sg-column h-100 sg-1-3" tabIndex="1"
                                                                                            >
                                                                                                {
                                                                                                    typeof item.content['subColumnTwo'] != "undefined" ? 
                                                                                                        item.content['subColumnTwo'].length > 0 ?
                                                                                                            item.content['subColumnTwo'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                <Draggable
                                                                                                                    key={'feature-' + contentSecond.type + '-' + contentSecondIndex}
                                                                                                                    draggableId={contentSecond.type + '-' + contentSecondIndex + '-sg-1-3-2'}
                                                                                                                    index={contentSecondIndex}
                                                                                                                >
                                                                                                                    {(provided) => (
                                                                                                                        <>
                                                                                                                            {contentSecond.type === 'listModal' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentSecondIndex}
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
                                                                                                                                    <ListModalLayout
                                                                                                                                        output={contentSecond.output}
                                                                                                                                        styles={contentSecond.styles}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentSecond.type === 'card' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                    className="content-output"
                                                                                                                                    id={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                    onClick={() => 
                                                                                                                                        this.contentPaneClick(
                                                                                                                                            index, 
                                                                                                                                            contentSecondIndex,
                                                                                                                                            item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                            'subColumnTwo'
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <CardLayout
                                                                                                                                        cardOutput={contentSecond.output}
                                                                                                                                        cardClass={contentSecond.class}
                                                                                                                                        cardId={contentSecond.id}
                                                                                                                                        cardStyles={contentSecond.styles}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentSecond.type === 'contentArea' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                    id={
                                                                                                                                        contentSecond.id ? 
                                                                                                                                            contentSecond.id
                                                                                                                                        : 
                                                                                                                                            item.id + '-content-output-' + contentSecondIndex
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
                                                                                                                                            item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                            'subColumnTwo'
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <ContentAreaLayout
                                                                                                                                        output={contentSecond.output}
                                                                                                                                        style={contentSecond.style}
                                                                                                                                        css={contentSecond.css}
                                                                                                                                        cssApplier={this.cssApplier}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentSecond.type === 'audio' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                    id={
                                                                                                                                        contentSecond.id ? 
                                                                                                                                            contentSecond.id
                                                                                                                                        : 
                                                                                                                                            item.id + '-content-output-' + contentSecondIndex
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
                                                                                                                                            item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                            'subColumnTwo'
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <AudioLayout
                                                                                                                                        output={contentSecond.output}
                                                                                                                                        style={contentSecond.style}
                                                                                                                                        css={contentSecond.css}
                                                                                                                                        cssApplier={this.cssApplier}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }
                                                                                                                        </>
                                                                                                                    )}
                                                                                                                </Draggable>
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
                                                                                
                                                                                <div key={index} className="feature-preview-container p-0 pb-3">
                                                                                    {/* Fifth Size */}
                                                                                    <div className="row w-100 m-0">
                                                                                    <Droppable droppableId={item.id + '-sg-1-3-1-1'}>
                                                                                        {(provided) => (
                                                                                            <div 
                                                                                                key={'sg-1-3-1-1-' + index} 
                                                                                                ref={provided.innerRef} 
                                                                                                id={'sg-1-3-1-1-' + index} 
                                                                                                className="d-inline p-3 text-center sg-column h-100 sg-1-3" tabIndex="0"
                                                                                            >
                                                                                                {
                                                                                                    typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                                        item.content['subColumnOne'].length > 0 ?
                                                                                                            item.content['subColumnOne'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                <Draggable
                                                                                                                    key={'feature-' + contentFirst.type + '-' + contentFirstIndex}
                                                                                                                    draggableId={contentFirst.type + '-' + contentFirstIndex + '-sg-1-3-1-1'}
                                                                                                                    index={contentFirstIndex}
                                                                                                                >
                                                                                                                    {(provided) => (
                                                                                                                        <>
                                                                                                                            {contentFirst.type === 'listModal' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentFirstIndex}
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
                                                                                                                                    <ListModalLayout
                                                                                                                                        output={contentFirst.output}
                                                                                                                                        styles={contentFirst.styles}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentFirst.type === 'card' &&
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
                                                                                                                                    <CardLayout
                                                                                                                                        cardOutput={contentFirst.output}
                                                                                                                                        cardClass={contentFirst.class}
                                                                                                                                        cardId={contentFirst.id}
                                                                                                                                        cardStyles={contentFirst.styles}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentFirst.type === 'contentArea' &&
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
                                                                                                                                    <ContentAreaLayout
                                                                                                                                        output={contentFirst.output}
                                                                                                                                        style={contentFirst.style}
                                                                                                                                        css={contentFirst.css}
                                                                                                                                        cssApplier={this.cssApplier}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentFirst.type === 'audio' &&
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
                                                                                                                                    <AudioLayout
                                                                                                                                        output={contentFirst.output}
                                                                                                                                        style={contentFirst.style}
                                                                                                                                        css={contentFirst.css}
                                                                                                                                        cssApplier={this.cssApplier}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }
                                                                                                                        </>
                                                                                                                    )}
                                                                                                                </Draggable>
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
                                                                                                className="d-inline p-3 text-center sg-column h-100 sg-1-3" tabIndex="1"
                                                                                            >
                                                                                                {
                                                                                                    typeof item.content['subColumnTwo'] != "undefined" ? 
                                                                                                        item.content['subColumnTwo'].length > 0 ?
                                                                                                            item.content['subColumnTwo'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                <Draggable
                                                                                                                    key={'feature-' + contentSecond.type + '-' + contentSecondIndex}
                                                                                                                    draggableId={contentSecond.type + '-' + contentSecondIndex + '-sg-1-3-1-2'}
                                                                                                                    index={contentSecondIndex}
                                                                                                                >
                                                                                                                    {(provided) => (
                                                                                                                        <>
                                                                                                                            {contentSecond.type === 'listModal' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentSecondIndex}
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
                                                                                                                                    <ListModalLayout
                                                                                                                                        output={contentSecond.output}
                                                                                                                                        styles={contentSecond.styles}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentSecond.type === 'card' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                    className="content-output"
                                                                                                                                    id={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                    onClick={() => 
                                                                                                                                        this.contentPaneClick(
                                                                                                                                            index, 
                                                                                                                                            contentSecondIndex,
                                                                                                                                            item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                            'subColumnTwo'
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <CardLayout
                                                                                                                                        cardOutput={contentSecond.output}
                                                                                                                                        cardClass={contentSecond.class}
                                                                                                                                        cardId={contentSecond.id}
                                                                                                                                        cardStyles={contentSecond.styles}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentSecond.type === 'contentArea' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                    id={
                                                                                                                                        contentSecond.id ? 
                                                                                                                                            contentSecond.id
                                                                                                                                        : 
                                                                                                                                            item.id + '-content-output-' + contentSecondIndex
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
                                                                                                                                            item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                            'subColumnTwo'
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <ContentAreaLayout
                                                                                                                                        output={contentSecond.output}
                                                                                                                                        style={contentSecond.style}
                                                                                                                                        css={contentSecond.css}
                                                                                                                                        cssApplier={this.cssApplier}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentSecond.type === 'audio' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                    id={
                                                                                                                                        contentSecond.id ? 
                                                                                                                                            contentSecond.id
                                                                                                                                        : 
                                                                                                                                            item.id + '-content-output-' + contentSecondIndex
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
                                                                                                                                            item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                            'subColumnTwo'
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <AudioLayout
                                                                                                                                        output={contentSecond.output}
                                                                                                                                        style={contentSecond.style}
                                                                                                                                        css={contentSecond.css}
                                                                                                                                        cssApplier={this.cssApplier}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }
                                                                                                                        </>
                                                                                                                    )}
                                                                                                                </Draggable>
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
                                                                                                className="d-inline p-3 text-center sg-column h-100 sg-1-3" tabIndex="2"
                                                                                            >
                                                                                                {
                                                                                                    typeof item.content['subColumnThree'] != "undefined" ? 
                                                                                                        item.content['subColumnThree'].length > 0 ?
                                                                                                            item.content['subColumnThree'].map((contentThird, contentThirdIndex) =>(
                                                                                                                <Draggable
                                                                                                                    key={'feature-' + contentThird.type + '-' + contentThirdIndex}
                                                                                                                    draggableId={contentThird.type + '-' + contentThirdIndex + '-sg-1-3-1-3'}
                                                                                                                    index={contentThirdIndex}
                                                                                                                >
                                                                                                                    {(provided) => (
                                                                                                                        <>
                                                                                                                            {contentThird.type === 'listModal' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentThirdIndex}
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
                                                                                                                                    <ListModalLayout
                                                                                                                                        output={contentThird.output}
                                                                                                                                        styles={contentThird.styles}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentThird.type === 'card' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentThirdIndex}
                                                                                                                                    className="content-output"
                                                                                                                                    id={item.id + '-content-output-' + contentThirdIndex}
                                                                                                                                    onClick={() => 
                                                                                                                                        this.contentPaneClick(
                                                                                                                                            index, 
                                                                                                                                            contentThirdIndex,
                                                                                                                                            item.id + '-content-output-' + contentThirdIndex,
                                                                                                                                            'subColumnThree'
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <CardLayout
                                                                                                                                        cardOutput={contentThird.output}
                                                                                                                                        cardClass={contentThird.class}
                                                                                                                                        cardId={contentThird.id}
                                                                                                                                        cardStyles={contentThird.styles}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentThird.type === 'contentArea' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentThirdIndex}
                                                                                                                                    id={
                                                                                                                                        contentThird.id ? 
                                                                                                                                            contentThird.id
                                                                                                                                        : 
                                                                                                                                            item.id + '-content-output-' + contentThirdIndex
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
                                                                                                                                            item.id + '-content-output-' + contentThirdIndex,
                                                                                                                                            'subColumnThree'
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <ContentAreaLayout
                                                                                                                                        output={contentThird.output}
                                                                                                                                        style={contentThird.style}
                                                                                                                                        css={contentThird.css}
                                                                                                                                        cssApplier={this.cssApplier}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }

                                                                                                                            {contentThird.type === 'audio' &&
                                                                                                                                <div 
                                                                                                                                    ref={provided.innerRef}
                                                                                                                                    {...provided.draggableProps}
                                                                                                                                    {...provided.dragHandleProps}

                                                                                                                                    key={item.id + '-content-output-' + contentThirdIndex}
                                                                                                                                    id={
                                                                                                                                        contentThird.id ? 
                                                                                                                                            contentThird.id
                                                                                                                                        : 
                                                                                                                                            item.id + '-content-output-' + contentThirdIndex
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
                                                                                                                                            item.id + '-content-output-' + contentThirdIndex,
                                                                                                                                            'subColumnThree'
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <AudioLayout
                                                                                                                                        output={contentThird.output}
                                                                                                                                        style={contentThird.style}
                                                                                                                                        css={contentThird.css}
                                                                                                                                        cssApplier={this.cssApplier}
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            }
                                                                                                                        </>
                                                                                                                    )}
                                                                                                                </Draggable>
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
                                                                                    
                                                                                    <div key={index} className="feature-preview-container p-0 pb-3">
                                                                                        {/* Sixth Size */}
                                                                                        <div className="row w-100 m-0">
                                                                                            <Droppable droppableId={item.id + '-sg-1-4-1'}>
                                                                                                {(provided) => (
                                                                                                    <div 
                                                                                                        key={'sg-1-4-1-' + index} 
                                                                                                        ref={provided.innerRef} 
                                                                                                        id={'sg-1-4-1-' + index} 
                                                                                                        className="d-inline p-3 text-center sg-column h-100 sg-1-4" tabIndex="0"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                                                item.content['subColumnOne'].length > 0 ?
                                                                                                                    item.content['subColumnOne'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                        <Draggable
                                                                                                                            key={'feature-' + contentFirst.type + '-' + contentFirstIndex}
                                                                                                                            draggableId={contentFirst.type + '-' + contentFirstIndex + '-sg-1-4-1'}
                                                                                                                            index={contentFirstIndex}
                                                                                                                        >
                                                                                                                            {(provided) => (
                                                                                                                                <>
                                                                                                                                    {contentFirst.type === 'listModal' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFirstIndex}
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
                                                                                                                                            <ListModalLayout
                                                                                                                                                output={contentFirst.output}
                                                                                                                                                styles={contentFirst.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFirst.type === 'card' &&
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
                                                                                                                                            <CardLayout
                                                                                                                                                cardOutput={contentFirst.output}
                                                                                                                                                cardClass={contentFirst.class}
                                                                                                                                                cardId={contentFirst.id}
                                                                                                                                                cardStyles={contentFirst.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFirst.type === 'contentArea' &&
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
                                                                                                                                            <ContentAreaLayout
                                                                                                                                                output={contentFirst.output}
                                                                                                                                                style={contentFirst.style}
                                                                                                                                                css={contentFirst.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFirst.type === 'audio' &&
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
                                                                                                                                            <AudioLayout
                                                                                                                                                output={contentFirst.output}
                                                                                                                                                style={contentFirst.style}
                                                                                                                                                css={contentFirst.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }
                                                                                                                                </>
                                                                                                                            )}
                                                                                                                        </Draggable>
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
                                                                                                        className="d-inline p-3 text-center sg-column h-100 sg-1-4" tabIndex="1"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnTwo'] != "undefined" ? 
                                                                                                                item.content['subColumnTwo'].length > 0 ?
                                                                                                                    item.content['subColumnTwo'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                        <Draggable
                                                                                                                            key={'feature-' + contentSecond.type + '-' + contentSecondIndex}
                                                                                                                            draggableId={contentSecond.type + '-' + contentSecondIndex + '-sg-1-4-2'}
                                                                                                                            index={contentSecondIndex}
                                                                                                                        >
                                                                                                                            {(provided) => (
                                                                                                                                <>
                                                                                                                                    {contentSecond.type === 'listModal' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentSecondIndex}
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
                                                                                                                                            <ListModalLayout
                                                                                                                                                output={contentSecond.output}
                                                                                                                                                styles={contentSecond.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentSecond.type === 'card' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                            className="content-output"
                                                                                                                                            id={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                            onClick={() => 
                                                                                                                                                this.contentPaneClick(
                                                                                                                                                    index, 
                                                                                                                                                    contentSecondIndex,
                                                                                                                                                    item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                                    'subColumnTwo'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <CardLayout
                                                                                                                                                cardOutput={contentSecond.output}
                                                                                                                                                cardClass={contentSecond.class}
                                                                                                                                                cardId={contentSecond.id}
                                                                                                                                                cardStyles={contentSecond.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentSecond.type === 'contentArea' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                            id={
                                                                                                                                                contentSecond.id ? 
                                                                                                                                                    contentSecond.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentSecondIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                                    'subColumnTwo'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <ContentAreaLayout
                                                                                                                                                output={contentSecond.output}
                                                                                                                                                style={contentSecond.style}
                                                                                                                                                css={contentSecond.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentSecond.type === 'audio' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                            id={
                                                                                                                                                contentSecond.id ? 
                                                                                                                                                    contentSecond.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentSecondIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                                    'subColumnTwo'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <AudioLayout
                                                                                                                                                output={contentSecond.output}
                                                                                                                                                style={contentSecond.style}
                                                                                                                                                css={contentSecond.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }
                                                                                                                                </>
                                                                                                                            )}
                                                                                                                        </Draggable>
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
                                                                                                        className="d-inline p-3 text-center sg-column h-100 sg-1-4" tabIndex="2"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnThree'] != "undefined" ? 
                                                                                                                item.content['subColumnThree'].length > 0 ?
                                                                                                                    item.content['subColumnThree'].map((contentThird, contentThirdIndex) =>(
                                                                                                                        <Draggable
                                                                                                                            key={'feature-' + contentThird.type + '-' + contentThirdIndex}
                                                                                                                            draggableId={contentThird.type + '-' + contentThirdIndex + '-sg-1-4-3'}
                                                                                                                            index={contentThirdIndex}
                                                                                                                        >
                                                                                                                            {(provided) => (
                                                                                                                                <>
                                                                                                                                    {contentThird.type === 'listModal' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentThirdIndex}
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
                                                                                                                                            <ListModalLayout
                                                                                                                                                output={contentThird.output}
                                                                                                                                                styles={contentThird.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentThird.type === 'card' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentThirdIndex}
                                                                                                                                            className="content-output"
                                                                                                                                            id={item.id + '-content-output-' + contentThirdIndex}
                                                                                                                                            onClick={() => 
                                                                                                                                                this.contentPaneClick(
                                                                                                                                                    index, 
                                                                                                                                                    contentThirdIndex,
                                                                                                                                                    item.id + '-content-output-' + contentThirdIndex,
                                                                                                                                                    'subColumnThree'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <CardLayout
                                                                                                                                                cardOutput={contentThird.output}
                                                                                                                                                cardClass={contentThird.class}
                                                                                                                                                cardId={contentThird.id}
                                                                                                                                                cardStyles={contentThird.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentThird.type === 'contentArea' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentThirdIndex}
                                                                                                                                            id={
                                                                                                                                                contentThird.id ? 
                                                                                                                                                    contentThird.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentThirdIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentThirdIndex,
                                                                                                                                                    'subColumnThree'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <ContentAreaLayout
                                                                                                                                                output={contentThird.output}
                                                                                                                                                style={contentThird.style}
                                                                                                                                                css={contentThird.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentThird.type === 'audio' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentThirdIndex}
                                                                                                                                            id={
                                                                                                                                                contentThird.id ? 
                                                                                                                                                    contentThird.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentThirdIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentThirdIndex,
                                                                                                                                                    'subColumnThree'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <AudioLayout
                                                                                                                                                output={contentThird.output}
                                                                                                                                                style={contentThird.style}
                                                                                                                                                css={contentThird.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }
                                                                                                                                </>
                                                                                                                            )}
                                                                                                                        </Draggable>
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
                                                                                                        className="d-inline p-3 text-center sg-column h-100 sg-1-4" tabIndex="3"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnFour'] != "undefined" ? 
                                                                                                                item.content['subColumnFour'].length > 0 ?
                                                                                                                    item.content['subColumnFour'].map((contentFourth, contentFourthIndex) =>(
                                                                                                                        <Draggable
                                                                                                                            key={'feature-' + contentFourth.type + '-' + contentFourthIndex}
                                                                                                                            draggableId={contentFourth.type + '-' + contentFourthIndex + '-sg-1-4-4'}
                                                                                                                            index={contentFourthIndex}
                                                                                                                        >
                                                                                                                            {(provided) => (
                                                                                                                                <>
                                                                                                                                    {contentFourth.type === 'listModal' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFourthIndex}
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
                                                                                                                                            <ListModalLayout
                                                                                                                                                output={contentFourth.output}
                                                                                                                                                styles={contentFourth.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFourth.type === 'card' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFourthIndex}
                                                                                                                                            className="content-output"
                                                                                                                                            id={item.id + '-content-output-' + contentFourthIndex}
                                                                                                                                            onClick={() => 
                                                                                                                                                this.contentPaneClick(
                                                                                                                                                    index, 
                                                                                                                                                    contentFourthIndex,
                                                                                                                                                    item.id + '-content-output-' + contentFourthIndex,
                                                                                                                                                    'subColumnFour'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <CardLayout
                                                                                                                                                cardOutput={contentFourth.output}
                                                                                                                                                cardClass={contentFourth.class}
                                                                                                                                                cardId={contentFourth.id}
                                                                                                                                                cardStyles={contentFourth.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFourth.type === 'contentArea' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFourthIndex}
                                                                                                                                            id={
                                                                                                                                                contentFourth.id ? 
                                                                                                                                                    contentFourth.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentFourthIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentFourthIndex,
                                                                                                                                                    'subColumnFour'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <ContentAreaLayout
                                                                                                                                                output={contentFourth.output}
                                                                                                                                                style={contentFourth.style}
                                                                                                                                                css={contentFourth.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFourth.type === 'audio' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFourthIndex}
                                                                                                                                            id={
                                                                                                                                                contentFourth.id ? 
                                                                                                                                                    contentFourth.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentFourthIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentFourthIndex,
                                                                                                                                                    'subColumnFour'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <AudioLayout
                                                                                                                                                output={contentFourth.output}
                                                                                                                                                style={contentFourth.style}
                                                                                                                                                css={contentFourth.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }
                                                                                                                                </>
                                                                                                                            )}
                                                                                                                        </Draggable>
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
                                                                                    
                                                                                    <div key={index} className="feature-preview-container p-0 pb-3">
                                                                                        {/* Seventh Size */}
                                                                                        <div className="row w-100 m-0">
                                                                                            <Droppable droppableId={item.id + '-sg-1-5-1'}>
                                                                                                {(provided) => (
                                                                                                    <div 
                                                                                                        key={'sg-1-5-1-' + index} 
                                                                                                        ref={provided.innerRef} 
                                                                                                        id={'sg-1-5-1-' + index} 
                                                                                                        className="d-inline p-3 text-center sg-column h-100 sg-1-5" tabIndex="0"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnOne'] != "undefined" ? 
                                                                                                                item.content['subColumnOne'].length > 0 ?
                                                                                                                    item.content['subColumnOne'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                        <Draggable
                                                                                                                            key={'feature-' + contentFirst.type + '-' + contentFirstIndex}
                                                                                                                            draggableId={contentFirst.type + '-' + contentFirstIndex + '-sg-1-5-1'}
                                                                                                                            index={contentFirstIndex}
                                                                                                                        >
                                                                                                                            {(provided) => (
                                                                                                                                <>
                                                                                                                                    {contentFirst.type === 'listModal' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFirstIndex}
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
                                                                                                                                            <ListModalLayout
                                                                                                                                                output={contentFirst.output}
                                                                                                                                                styles={contentFirst.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFirst.type === 'card' &&
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
                                                                                                                                            <CardLayout
                                                                                                                                                cardOutput={contentFirst.output}
                                                                                                                                                cardClass={contentFirst.class}
                                                                                                                                                cardId={contentFirst.id}
                                                                                                                                                cardStyles={contentFirst.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFirst.type === 'contentArea' &&
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
                                                                                                                                            <ContentAreaLayout
                                                                                                                                                output={contentFirst.output}
                                                                                                                                                style={contentFirst.style}
                                                                                                                                                css={contentFirst.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFirst.type === 'audio' &&
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
                                                                                                                                            <AudioLayout
                                                                                                                                                output={contentFirst.output}
                                                                                                                                                style={contentFirst.style}
                                                                                                                                                css={contentFirst.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }
                                                                                                                                </>
                                                                                                                            )}
                                                                                                                        </Draggable>
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
                                                                                                        className="d-inline p-3 text-center sg-column h-100 sg-1-5" tabIndex="1"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnTwo'] != "undefined" ? 
                                                                                                                item.content['subColumnTwo'].length > 0 ?
                                                                                                                    item.content['subColumnTwo'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                        <Draggable
                                                                                                                            key={'feature-' + contentSecond.type + '-' + contentSecondIndex}
                                                                                                                            draggableId={contentSecond.type + '-' + contentSecondIndex + '-sg-1-5-2'}
                                                                                                                            index={contentSecondIndex}
                                                                                                                        >
                                                                                                                            {(provided) => (
                                                                                                                                <>
                                                                                                                                    {contentSecond.type === 'listModal' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentSecondIndex}
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
                                                                                                                                            <ListModalLayout
                                                                                                                                                output={contentSecond.output}
                                                                                                                                                styles={contentSecond.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentSecond.type === 'card' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                            className="content-output"
                                                                                                                                            id={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                            onClick={() => 
                                                                                                                                                this.contentPaneClick(
                                                                                                                                                    index, 
                                                                                                                                                    contentSecondIndex,
                                                                                                                                                    item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                                    'subColumnTwo'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <CardLayout
                                                                                                                                                cardOutput={contentSecond.output}
                                                                                                                                                cardClass={contentSecond.class}
                                                                                                                                                cardId={contentSecond.id}
                                                                                                                                                cardStyles={contentSecond.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentSecond.type === 'contentArea' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                            id={
                                                                                                                                                contentSecond.id ? 
                                                                                                                                                    contentSecond.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentSecondIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                                    'subColumnTwo'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <ContentAreaLayout
                                                                                                                                                output={contentSecond.output}
                                                                                                                                                style={contentSecond.style}
                                                                                                                                                css={contentSecond.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentSecond.type === 'audio' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentSecondIndex}
                                                                                                                                            id={
                                                                                                                                                contentSecond.id ? 
                                                                                                                                                    contentSecond.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentSecondIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentSecondIndex,
                                                                                                                                                    'subColumnTwo'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <AudioLayout
                                                                                                                                                output={contentSecond.output}
                                                                                                                                                style={contentSecond.style}
                                                                                                                                                css={contentSecond.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }
                                                                                                                                </>
                                                                                                                            )}
                                                                                                                        </Draggable>
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
                                                                                                        className="d-inline p-3 text-center sg-column h-100 sg-1-5" tabIndex="2"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnThree'] != "undefined" ? 
                                                                                                                item.content['subColumnThree'].length > 0 ?
                                                                                                                    item.content['subColumnThree'].map((contentThird, contentThirdIndex) =>(
                                                                                                                        <Draggable
                                                                                                                            key={'feature-' + contentThird.type + '-' + contentThirdIndex}
                                                                                                                            draggableId={contentThird.type + '-' + contentThirdIndex + '-sg-1-5-3'}
                                                                                                                            index={contentThirdIndex}
                                                                                                                        >
                                                                                                                            {(provided) => (
                                                                                                                                <>
                                                                                                                                    {contentThird.type === 'listModal' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentThirdIndex}
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
                                                                                                                                            <ListModalLayout
                                                                                                                                                output={contentThird.output}
                                                                                                                                                styles={contentThird.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentThird.type === 'card' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentThirdIndex}
                                                                                                                                            className="content-output"
                                                                                                                                            id={item.id + '-content-output-' + contentThirdIndex}
                                                                                                                                            onClick={() => 
                                                                                                                                                this.contentPaneClick(
                                                                                                                                                    index, 
                                                                                                                                                    contentThirdIndex,
                                                                                                                                                    item.id + '-content-output-' + contentThirdIndex,
                                                                                                                                                    'subColumnThree'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <CardLayout
                                                                                                                                                cardOutput={contentThird.output}
                                                                                                                                                cardClass={contentThird.class}
                                                                                                                                                cardId={contentThird.id}
                                                                                                                                                cardStyles={contentThird.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentThird.type === 'contentArea' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentThirdIndex}
                                                                                                                                            id={
                                                                                                                                                contentThird.id ? 
                                                                                                                                                    contentThird.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentThirdIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentThirdIndex,
                                                                                                                                                    'subColumnThree'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <ContentAreaLayout
                                                                                                                                                output={contentThird.output}
                                                                                                                                                style={contentThird.style}
                                                                                                                                                css={contentThird.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentThird.type === 'audio' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentThirdIndex}
                                                                                                                                            id={
                                                                                                                                                contentThird.id ? 
                                                                                                                                                    contentThird.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentThirdIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentThirdIndex,
                                                                                                                                                    'subColumnThree'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <AudioLayout
                                                                                                                                                output={contentThird.output}
                                                                                                                                                style={contentThird.style}
                                                                                                                                                css={contentThird.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }
                                                                                                                                </>
                                                                                                                            )}
                                                                                                                        </Draggable>
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
                                                                                                        className="d-inline p-3 text-center sg-column h-100 sg-1-5" tabIndex="3"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnFour'] != "undefined" ? 
                                                                                                                item.content['subColumnFour'].length > 0 ?
                                                                                                                    item.content['subColumnFour'].map((contentFourth, contentFourthIndex) =>(
                                                                                                                        <Draggable
                                                                                                                            key={'feature-' + contentFourth.type + '-' + contentFourthIndex}
                                                                                                                            draggableId={contentFourth.type + '-' + contentFourthIndex + '-sg-1-5-4'}
                                                                                                                            index={contentFourthIndex}
                                                                                                                        >
                                                                                                                            {(provided) => (
                                                                                                                                <>
                                                                                                                                    {contentFourth.type === 'listModal' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFourthIndex}
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
                                                                                                                                            <ListModalLayout
                                                                                                                                                output={contentFourth.output}
                                                                                                                                                styles={contentFourth.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFourth.type === 'card' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFourthIndex}
                                                                                                                                            className="content-output"
                                                                                                                                            id={item.id + '-content-output-' + contentFourthIndex}
                                                                                                                                            onClick={() => 
                                                                                                                                                this.contentPaneClick(
                                                                                                                                                    index, 
                                                                                                                                                    contentFourthIndex,
                                                                                                                                                    item.id + '-content-output-' + contentFourthIndex,
                                                                                                                                                    'subColumnFour'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <CardLayout
                                                                                                                                                cardOutput={contentFourth.output}
                                                                                                                                                cardClass={contentFourth.class}
                                                                                                                                                cardId={contentFourth.id}
                                                                                                                                                cardStyles={contentFourth.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }
                                                                                                                                    
                                                                                                                                    {contentFourth.type === 'contentArea' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFourthIndex}
                                                                                                                                            id={
                                                                                                                                                contentFourth.id ? 
                                                                                                                                                    contentFourth.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentFourthIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentFourthIndex,
                                                                                                                                                    'subColumnFour'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <ContentAreaLayout
                                                                                                                                                output={contentFourth.output}
                                                                                                                                                style={contentFourth.style}
                                                                                                                                                css={contentFourth.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFourth.type === 'audio' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFourthIndex}
                                                                                                                                            id={
                                                                                                                                                contentFourth.id ? 
                                                                                                                                                    contentFourth.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentFourthIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentFourthIndex,
                                                                                                                                                    'subColumnFour'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <AudioLayout
                                                                                                                                                output={contentFourth.output}
                                                                                                                                                style={contentFourth.style}
                                                                                                                                                css={contentFourth.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }
                                                                                                                                </>
                                                                                                                            )}
                                                                                                                        </Draggable>
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
                                                                                                        className="d-inline p-3 text-center sg-column h-100 sg-1-5" tabIndex="4"
                                                                                                    >
                                                                                                        {
                                                                                                            typeof item.content['subColumnFive'] != "undefined" ? 
                                                                                                                item.content['subColumnFive'].length > 0 ?
                                                                                                                    item.content['subColumnFive'].map((contentFifth, contentFifthIndex) =>(
                                                                                                                        <Draggable
                                                                                                                            key={'feature-' + contentFifth.type + '-' + contentFifthIndex}
                                                                                                                            draggableId={contentFifth.type + '-' + contentFifthIndex + '-sg-1-5-5'}
                                                                                                                            index={contentFifthIndex}
                                                                                                                        >
                                                                                                                            {(provided) => (
                                                                                                                                <>
                                                                                                                                    {contentFifth.type === 'listModal' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFifthIndex}
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
                                                                                                                                            <ListModalLayout
                                                                                                                                                output={contentFifth.output}
                                                                                                                                                styles={contentFifth.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFifth.type === 'card' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFifthIndex}
                                                                                                                                            className="content-output"
                                                                                                                                            id={item.id + '-content-output-' + contentFifthIndex}
                                                                                                                                            onClick={() => 
                                                                                                                                                this.contentPaneClick(
                                                                                                                                                    index, 
                                                                                                                                                    contentFifthIndex,
                                                                                                                                                    item.id + '-content-output-' + contentFifthIndex,
                                                                                                                                                    'subColumnFive'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <CardLayout
                                                                                                                                                cardOutput={contentFifth.output}
                                                                                                                                                cardClass={contentFifth.class}
                                                                                                                                                cardId={contentFifth.id}
                                                                                                                                                cardStyles={contentFifth.styles}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFifth.type === 'contentArea' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFifthIndex}
                                                                                                                                            id={
                                                                                                                                                contentFifth.id ? 
                                                                                                                                                    contentFifth.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentFifthIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentFifthIndex,
                                                                                                                                                    'subColumnFive'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <ContentAreaLayout
                                                                                                                                                output={contentFifth.output}
                                                                                                                                                style={contentFifth.style}
                                                                                                                                                css={contentFifth.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }

                                                                                                                                    {contentFifth.type === 'audio' &&
                                                                                                                                        <div 
                                                                                                                                            ref={provided.innerRef}
                                                                                                                                            {...provided.draggableProps}
                                                                                                                                            {...provided.dragHandleProps}

                                                                                                                                            key={item.id + '-content-output-' + contentFifthIndex}
                                                                                                                                            id={
                                                                                                                                                contentFifth.id ? 
                                                                                                                                                    contentFifth.id
                                                                                                                                                : 
                                                                                                                                                    item.id + '-content-output-' + contentFifthIndex
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
                                                                                                                                                    item.id + '-content-output-' + contentFifthIndex,
                                                                                                                                                    'subColumnFive'
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        >
                                                                                                                                            <AudioLayout
                                                                                                                                                output={contentFifth.output}
                                                                                                                                                style={contentFifth.style}
                                                                                                                                                css={contentFifth.css}
                                                                                                                                                cssApplier={this.cssApplier}
                                                                                                                                            />
                                                                                                                                        </div>
                                                                                                                                    }
                                                                                                                                </>
                                                                                                                            )}
                                                                                                                        </Draggable>
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
                                            {this.state.column.length !== 0 &&
                                                <>
                                                    <HtmlEditor 
                                                        currentColumn={this.state.column[this.state.activeColumnId]}
                                                        setShowEditor={this.setShowHtmlEditor}
                                                        showHtmlEditor={this.state.showHtmlEditor}
                                                        onChangeTextArea={this.onChangeTextArea}
                                                        contentIndex={this.state.activeContentIndex}
                                                        currentColumnContentIndex={this.state.currentColumnContentIndex}
                                                        contentFor={this.state.contentFor}
                                                        setColumn={this.setColumn}
                                                        activeOutputIndex={this.state.activeOutputIndex}
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
                                                </>
                                            }
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
        currentSlide: state.slide.currentSlide ? state.slide.currentSlide : {},
        columns: state.column.columns,
        currentColumn: state.column.currentColumn,
        slideColumns: state.slide.slideColumns,
        slides: state.slide.slides,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createSlide: (data, lessonIndex, columnArray, slideIndex, uid) => dispatch(slideActions.createSlide(data, lessonIndex, columnArray, slideIndex, uid)),
        getCourseLessons: (cid) => dispatch(courseActions.getCourseLessons(cid)),
        appendSlideToCourseLesson: (slideObj, lessonIndex) => dispatch(courseActions.appendSlideToCourseLesson(slideObj, lessonIndex)),
        updateSlide: (slideObj, lid) => dispatch(slideActions.updateSlide(slideObj, lid)),
        updateSlideFromCourseLesson: (slideObj, slideIndex, lessonIndex) => dispatch(courseActions.updateSlideFromCourseLesson(slideObj, slideIndex, lessonIndex)),
        createColumn: (columnObj) => dispatch(columnActions.createColumn(columnObj)),
        updateColumn: (columnObj, id) => dispatch(columnActions.updateColumn(columnObj, id)),
        appendSlideColumnsFromCourseLesson: (columnArray, slideIndex, lessonIndex) => dispatch(courseActions.appendSlideColumnsFromCourseLesson(columnArray, slideIndex, lessonIndex)),
        getSlideColumns: (id) => dispatch(slideActions.getSlideColumns(id)),
        getLatestLessonSlide: (id) => dispatch(courseActions.getLatestLessonSlide(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideHandler);
