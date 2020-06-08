import React, { Component } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { Formik } from "formik";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faFileAudio } from '@fortawesome/free-regular-svg-icons';
import ReactHtmlParser from 'react-html-parser';

// components
import SlideColumn from '../Slide/Columns';
import SlideFeature from '../Slide/Features';
import SlideEditor from '../Slide/Editor';
import HtmlEditor from '../Slide/HtmlEditor';
import CssEditor from '../Slide/CssEditor';

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
                { type: 'content-area', name: 'Content Area', icon: faSquare, },
            ],
            activeFeature: '',
            activeTab: 'column',
            activeColumnId: -1,
            showHtmlEditor: false,
            showCssEditor: false,
            activeContentIndex: 0,
            currentColumnContentIndex: '',
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
        this.onSave = this.onSave.bind(this);
    }

    componentDidUpdate() {
        console.log('state.columns: ');
        console.log(this.state.column);
        console.log('props.columns: ');
        console.log(this.props.currentColumns);
        console.log('props.action');
        console.log(this.props.action);
        console.log('state.activeFeature');
        console.log(this.state.activeFeature);
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
                activeColumnId: -1,
                activeTab: 'column',
                activeContentIndex: 0,
            });
        }

        if (action === "add") {
            this.setState({
                column: [],
                activeFeature: '',
                activeColumnId: -1,
                activeTab: 'column',
                activeContentIndex: 0,
            });
        }
    }

    addColumn = () => {
        const currentCount = this.state.column.length + 1
        const columnObj = { type: 'column', name: 'Column ' + currentCount, active: -1, sizeId: -1, id: 'column' + currentCount, content: [] }
        columnObj.content['first'] = [];

        this.setState({
            column: [...this.state.column, columnObj],
            currentColumnContentIndex: 'first',
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

    handleSizeActive = (columnIndex, sizeIndex, sizeId) => {
        const columnSizesObj = this.state.column;

        columnSizesObj[columnIndex].active = sizeIndex;
        columnSizesObj[columnIndex].sizeId = sizeId;

        if (sizeId === 1 || sizeId === 2 || sizeId === 3) {
            columnSizesObj[columnIndex].content['first'] = [];
            columnSizesObj[columnIndex].content['second'] = [];
        } else if (sizeId === 4) {
            columnSizesObj[columnIndex].content['first'] = [];
            columnSizesObj[columnIndex].content['second'] = [];
            columnSizesObj[columnIndex].content['third'] = [];
        } else if (sizeId === 5) {
            columnSizesObj[columnIndex].content['first'] = [];
            columnSizesObj[columnIndex].content['second'] = [];
            columnSizesObj[columnIndex].content['third'] = [];
            columnSizesObj[columnIndex].content['fourth'] = [];
        } else if (sizeId === 6) {
            columnSizesObj[columnIndex].content['first'] = [];
            columnSizesObj[columnIndex].content['second'] = [];
            columnSizesObj[columnIndex].content['third'] = [];
            columnSizesObj[columnIndex].content['fourth'] = [];
            columnSizesObj[columnIndex].content['fifth'] = [];
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
        
        // dropped outside the list
        if (!destination) {
            return;
        }

        if ((source.droppableId === "columns") && (destination.droppableId === "columns")) {
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
                        currentColumnContentIndex: 'first',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;
                    
                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        });
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        });
                    }
                    
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-2-1')) {
                    // Second Size

                    this.setState({
                        currentColumnContentIndex: 'first',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        });
                    }

                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-2-2')) {

                    this.setState({
                        currentColumnContentIndex: 'second',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['second'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['second'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['second'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['second'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-1')) {
                    // Third Size

                    this.setState({
                        currentColumnContentIndex: 'first',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-2-3-2')) {

                    this.setState({
                        currentColumnContentIndex: 'second',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['second'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['second'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['second'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['second'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-2-3-1')) {
                    // Fourth Size

                    this.setState({
                        currentColumnContentIndex: 'first',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-2')) {

                    this.setState({
                        currentColumnContentIndex: 'second',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['second'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['second'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['second'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['second'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-1-1')) {
                    // Fifth Size

                    this.setState({
                        currentColumnContentIndex: 'first',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-1-2')) {

                    this.setState({
                        currentColumnContentIndex: 'second',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['second'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['second'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['second'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['second'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-3-1-3')) {

                    this.setState({
                        currentColumnContentIndex: 'third',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['third'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['third'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['third'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['third'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-4-1')) {
                    // Sixth Size

                    this.setState({
                        currentColumnContentIndex: 'first',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-4-2')) {

                    this.setState({
                        currentColumnContentIndex: 'second',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['second'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['second'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['second'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['second'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-4-3')) {

                    this.setState({
                        currentColumnContentIndex: 'third',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['third'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['third'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['third'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['third'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-4-4')) {

                    this.setState({
                        currentColumnContentIndex: 'fourth',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['fourth'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['fourth'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['fourth'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['fourth'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-1')) {
                    // Seventh Size

                    this.setState({
                        currentColumnContentIndex: 'first',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['first'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['first'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-2')) {

                    this.setState({
                        currentColumnContentIndex: 'second',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['second'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['second'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['second'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['second'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-3')) {

                    this.setState({
                        currentColumnContentIndex: 'third',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['third'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['third'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['third'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['third'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-4')) {

                    this.setState({
                        currentColumnContentIndex: 'fourth',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['fourth'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['fourth'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['fourth'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['fourth'].length - 1),
                        });
                    }
                } else if (destination.droppableId === (currentColumns[key]['id'] + '-sg-1-5-5')) {

                    this.setState({
                        currentColumnContentIndex: 'fifth',
                    });

                    destination.index = parseInt(key);
                    console.log("Drag!");
                    console.log(source);
                    console.log(destination);
                    const currentFeatures = this.state.features;

                    if (currentFeatures[source.index]['type'] === 'content-area') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '<span>This content will show up directly in its container.</span>', class: '', id: '' };
                        currentColumns[key].content['fifth'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['fifth'].length - 1),
                        })
                    } else if (currentFeatures[source.index]['type'] === 'audio') {
                        let currentContent = { type: currentFeatures[source.index]['type'], output: '', class: '', id: ''  };
                        currentColumns[key].content['fifth'].push(currentContent);
                        this.setState({
                            column: currentColumns,
                            activeFeature: currentFeatures[source.index]['type'],
                            activeColumnId: destination.index,
                            activeContentIndex: (currentColumns[key].content['fifth'].length - 1),
                        });
                    }
                }
            }
        }
    }

    setActiveTab = (value) => {
        this.setState({
            activeTab: value,
        })
    }

    setShowHtmlEditor = (value, contentIndex) => {
        this.setState({
            showHtmlEditor: value,
            activeContentIndex: contentIndex,
        })
    }

    onChangeTextArea = (event, contentIndex) => {
        const currentColumnObj = this.state.column[this.state.activeColumnId];
        const currentColumnContentIndex = this.state.currentColumnContentIndex;

        currentColumnObj.content[currentColumnContentIndex][contentIndex].output = event.target.value;

        const columns = this.state.column;
        columns[this.state.activeColumnId] = currentColumnObj;

        this.setState({
            column: columns,
        })
    }

    contentPaneClick = (index, contentIndex, elementId, currentColumnContentIndex) => {
        const elem = document.getElementById(elementId);
        const prevElemId = localStorage.getItem('prevElemId');

        if (((prevElemId === null) || (prevElemId !== null)) && (elem !== null)) {
            localStorage.setItem('prevElemId', elementId);
            elem.focus();
            elem.classList.add("border");
            elem.classList.add("border-dark");

            if (elementId.includes("content-output")) {
                elem.classList.add("active-column");
            }
        } 

        if ((prevElemId !== elementId) && (prevElemId !== null)) {
            const prevElem = document.getElementById(prevElemId);

            if (prevElem !== null) {
                prevElem.classList.remove("border");
                prevElem.classList.remove("border-dark");

                if (prevElemId.includes("content-output")) {
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
        delete currentColumnContent[contentIndex];

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

    onSave = (slide, columns, slideId) => {
        if (this.props.action === "add") {
            const slideObj = {slideName: slide, columns: columns}
            this.props.addSlideChange(slideObj, slideId);
            console.log("add");
        } else if (this.props.action === "edit") {
            const slideObj = {slideName: slide, columns: columns}
            this.props.editSlideChange(slideObj, slideId, this.props.currentClickedLessonId);
            console.log("edit");
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
                            showTitle: this.props.showTitleValue,
                        }}

                        onSubmit={values => {
                            console.log(values.slideName);
                            console.log(values.showTitle);
                            this.onSave(values.slideName, this.state.column, this.props.slideId);
                        }}
                    >
                        {props => {
                            const {
                                values,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="slideName">Slide Name:</label>
                                    <input
                                        id="slideName"
                                        name="slideName"
                                        type="text"
                                        className="form-control d-inline"
                                        onChange={handleChange}
                                        value={values.slideName}
                                        onBlur={handleBlur}
                                        placeholder="Type slide name here (Optional) . . ."
                                    />
                                    <input
                                        id="showTitle"
                                        name="showTitle"
                                        type="checkbox"
                                        value={true}
                                        checked={values.showTitle === true}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label htmlFor="showTitle" className="ml-1"> Display Title</label>
                                    <DragDropContext onDragEnd={this.onDragEnd}>
                                        <div className="row">
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
                                                                                                    name={item.name}
                                                                                                    deleteColumn={this.deleteColumn}
                                                                                                    columnSizes={this.state.columnSizes}
                                                                                                    column={this.state.column}
                                                                                                    handleSizeActive={this.handleSizeActive}
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

                                                            <button type="button" className="sg-add-sortable-column-after" onClick={this.addColumn}><span><FontAwesomeIcon icon={faPlus}/>Add Column</span></button>
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
                                                        />
                                                    </Tab>
                                                </Tabs>
                                            </div>
                                            <div id="slide-content" className="col-md-9 pl-0">
                                                <div id="slide-content-container" className="border p-3 h-100">
                                                    {
                                                        this.state.column.length > 0 ?
                                                            this.state.column.map((item, index) => (
                                                                item.sizeId === 0 || item.sizeId === -1 ?
                                                                    <Droppable key={index} droppableId={item.id}>
                                                                        {/* First Size */}
                                                                        {(provided) => (
                                                                            <div ref={provided.innerRef} className="container p-0 pb-3">
                                                                                { 
                                                                                    typeof item.content['first'] != "undefined" ? 
                                                                                        item.content['first'].length > 0 ?
                                                                                            <div id={item.id} className="p-5 text-center sg-column mt-2 w-100" tabIndex="0">
                                                                                                {
                                                                                                    item.content['first'].map((contentFirst, contentFirstIndex) =>(
                                                                                                        <div key={item.id + '-content-output-' + contentFirstIndex} id={item.id + '-content-output-' + contentFirstIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentFirstIndex, item.id + '-content-output-' + contentFirstIndex, 'first')}>
                                                                                                            {ReactHtmlParser(contentFirst.output)}
                                                                                                        </div>
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
                                                                    item.sizeId === 1 ?
                                                                        <div  className="container p-0 pb-3">
                                                                            {/* Second Size */}
                                                                            <div className="row w-100 m-0">
                                                                                <Droppable droppableId={item.id + '-sg-1-2-1'}>
                                                                                    {(provided) => (
                                                                                        <div key={'sg-1-2-1-' + index} ref={provided.innerRef} id={'sg-1-2-1-' + index} className="d-inline p-5 text-center sg-column sg-1-2" tabIndex="0">
                                                                                            {
                                                                                                typeof item.content['first'] != "undefined" ? 
                                                                                                    item.content['first'].length > 0 ?
                                                                                                        item.content['first'].map((contentFirst, contentFirstIndex) =>(
                                                                                                            <div key={'sg-1-2-1-content-output-' + contentFirstIndex} id={'sg-1-2-1-content-output-' + contentFirstIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentFirstIndex, 'sg-1-2-1-content-output-' + contentFirstIndex, 'first')}>
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
                                                                                        <div key={'sg-1-2-2-' + index} ref={provided.innerRef} id={'sg-1-2-2-' + index} className="d-inline p-5 text-center sg-column sg-1-2" tabIndex="1">
                                                                                            {
                                                                                                typeof item.content['second'] != "undefined" ? 
                                                                                                    item.content['second'].length > 0 ?
                                                                                                        item.content['second'].map((contentSecond, contentSecondIndex) =>(
                                                                                                            <div key={'sg-1-2-2-content-output-' + contentSecondIndex} id={'sg-1-2-2-content-output-' + contentSecondIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentSecondIndex, 'sg-1-2-2-content-output-' + contentSecondIndex, 'second')}>
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
                                                                        item.sizeId === 2 ?
                                                                            
                                                                            <div  className="container p-0 pb-3">
                                                                                {/* Third Size */}
                                                                                <div className="row w-100 m-0">
                                                                                    <Droppable droppableId={item.id + '-sg-1-3-1'}>
                                                                                        {(provided) => (
                                                                                            <div key={'sg-1-3-1-' + index} ref={provided.innerRef} id={'sg-1-3-1-' + index} className="d-inline p-5 text-center sg-column sg-1-3" tabIndex="0">
                                                                                                {
                                                                                                    typeof item.content['first'] != "undefined" ? 
                                                                                                        item.content['first'].length > 0 ?
                                                                                                            item.content['first'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                <div key={'sg-1-3-1-content-output-' + contentFirstIndex} id={'sg-1-3-1-content-output-' + contentFirstIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentFirstIndex, 'sg-1-3-1-content-output-' + contentFirstIndex, 'first')}>
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
                                                                                            <div key={'sg-2-3-2-' + index} ref={provided.innerRef} id={'sg-2-3-2-' + index} className="d-inline p-5 text-center sg-column sg-2-3" tabIndex="1">
                                                                                                {
                                                                                                    typeof item.content['second'] != "undefined" ? 
                                                                                                        item.content['second'].length > 0 ?
                                                                                                            item.content['second'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                <div key={'sg-2-3-2-content-output-' + contentSecondIndex} id={'sg-2-3-2-content-output-' + contentSecondIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentSecondIndex, 'sg-2-3-2-content-output-' + contentSecondIndex, 'second')}>
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
                                                                            item.sizeId === 3 ?
                                                                                
                                                                                <div className="container p-0 pb-3">
                                                                                    {/* Fourth Size */}
                                                                                    <div className="row w-100 m-0">
                                                                                        <Droppable droppableId={item.id + '-sg-2-3-1'}>
                                                                                            {(provided) => (
                                                                                                <div key={'sg-2-3-1-' + index} ref={provided.innerRef} id={'sg-2-3-1-' + index} className="d-inline p-5 text-center sg-column sg-2-3" tabIndex="0">
                                                                                                    {
                                                                                                        typeof item.content['first'] != "undefined" ? 
                                                                                                            item.content['first'].length > 0 ?
                                                                                                                item.content['first'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                    <div key={'sg-2-3-1-content-output-' + contentFirstIndex} id={'sg-2-3-1-content-output-' + contentFirstIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentFirstIndex, 'sg-2-3-1-content-output-' + contentFirstIndex, 'first')}>
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
                                                                                                <div key={'sg-1-3-2-' + index} ref={provided.innerRef} id={'sg-1-3-2-' + index} className="d-inline p-5 text-center sg-column sg-1-3" tabIndex="1">
                                                                                                    {
                                                                                                        typeof item.content['second'] != "undefined" ? 
                                                                                                            item.content['second'].length > 0 ?
                                                                                                                item.content['second'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                    <div key={'sg-1-3-2-content-output-' + contentSecondIndex} id={'sg-1-3-2-content-output-' + contentSecondIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentSecondIndex, 'sg-1-3-2-content-output-' + contentSecondIndex, 'second')}>
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
                                                                                item.sizeId === 4 ?
                                                                                    
                                                                                    <div className="container p-0 pb-3">
                                                                                        {/* Fifth Size */}
                                                                                        <div className="row w-100 m-0">
                                                                                        <Droppable droppableId={item.id + '-sg-1-3-1-1'}>
                                                                                            {(provided) => (
                                                                                                <div key={'sg-1-3-1-1-' + index} ref={provided.innerRef} id={'sg-1-3-1-1-' + index} className="d-inline p-5 text-center sg-column sg-1-3" tabIndex="0">
                                                                                                    {
                                                                                                        typeof item.content['first'] != "undefined" ? 
                                                                                                            item.content['first'].length > 0 ?
                                                                                                                item.content['first'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                    <div key={'sg-1-3-1-1-content-output-' + contentFirstIndex} id={'sg-1-3-1-1-content-output-' + contentFirstIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentFirstIndex, 'sg-1-3-1-1-content-output-' + contentFirstIndex, 'first')}>
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
                                                                                                <div key={'sg-1-3-1-2-' + index} ref={provided.innerRef} id={'sg-1-3-1-2-' + index} className="d-inline p-5 text-center sg-column sg-1-3" tabIndex="1">
                                                                                                    {
                                                                                                        typeof item.content['second'] != "undefined" ? 
                                                                                                            item.content['second'].length > 0 ?
                                                                                                                item.content['second'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                    <div key={'sg-1-3-1-2-content-output-' + contentSecondIndex} id={'sg-1-3-1-2-content-output-' + contentSecondIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentSecondIndex, 'sg-1-3-1-2-content-output-' + contentSecondIndex, 'second')}>
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
                                                                                                <div key={'sg-1-3-1-3-' + index} ref={provided.innerRef} id={'sg-1-3-1-3-' + index} className="d-inline p-5 text-center sg-column sg-1-3" tabIndex="2">
                                                                                                    {
                                                                                                        typeof item.content['third'] != "undefined" ? 
                                                                                                            item.content['third'].length > 0 ?
                                                                                                                item.content['third'].map((contentThird, contentThirdIndex) =>(
                                                                                                                    <div key={'sg-1-3-1-3-content-output-' + contentThirdIndex} id={'sg-1-3-1-3-content-output-' + contentThirdIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentThirdIndex, 'sg-1-3-1-3-content-output-' + contentThirdIndex, 'third')}>
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
                                                                                    item.sizeId === 5 ?
                                                                                        
                                                                                        <div className="container p-0 pb-3">
                                                                                            {/* Sixth Size */}
                                                                                            <div className="row w-100 m-0">
                                                                                                <Droppable droppableId={item.id + '-sg-1-4-1'}>
                                                                                                    {(provided) => (
                                                                                                        <div key={'sg-1-4-1-' + index} ref={provided.innerRef} id={'sg-1-4-1-' + index} className="d-inline p-5 text-center sg-column sg-1-4" tabIndex="0">
                                                                                                            {
                                                                                                                typeof item.content['first'] != "undefined" ? 
                                                                                                                    item.content['first'].length > 0 ?
                                                                                                                        item.content['first'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                            <div key={'sg-1-4-1-content-output-' + contentFirstIndex} id={'sg-1-4-1-content-output-' + contentFirstIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentFirstIndex, 'sg-1-4-1-content-output-' + contentFirstIndex, 'first')}>
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
                                                                                                        <div key={'sg-1-4-2-' + index} ref={provided.innerRef} id={'sg-1-4-2-' + index} className="d-inline p-5 text-center sg-column sg-1-4" tabIndex="1">
                                                                                                            {
                                                                                                                typeof item.content['second'] != "undefined" ? 
                                                                                                                    item.content['second'].length > 0 ?
                                                                                                                        item.content['second'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                            <div key={'sg-1-4-2-content-output-' + contentSecondIndex} id={'sg-1-4-2-content-output-' + contentSecondIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentSecondIndex, 'sg-1-4-2-content-output-' + contentSecondIndex, 'second')}>
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
                                                                                                        <div key={'sg-1-4-3-' + index} ref={provided.innerRef} id={'sg-1-4-3-' + index} className="d-inline p-5 text-center sg-column sg-1-4" tabIndex="2">
                                                                                                            {
                                                                                                                typeof item.content['third'] != "undefined" ? 
                                                                                                                    item.content['third'].length > 0 ?
                                                                                                                        item.content['third'].map((contentThird, contentThirdIndex) =>(
                                                                                                                            <div key={'sg-1-4-3-content-output-' + contentThirdIndex} id={'sg-1-4-3-content-output-' + contentThirdIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentThirdIndex, 'sg-1-4-3-content-output-' + contentThirdIndex, 'third')}>
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
                                                                                                        <div key={'sg-1-4-4-' + index} ref={provided.innerRef} id={'sg-1-4-4-' + index} className="d-inline p-5 text-center sg-column sg-1-4" tabIndex="3">
                                                                                                            {
                                                                                                                typeof item.content['fourth'] != "undefined" ? 
                                                                                                                    item.content['fourth'].length > 0 ?
                                                                                                                        item.content['fourth'].map((contentFourth, contentFourthIndex) =>(
                                                                                                                            <div key={'sg-1-4-4-content-output-' + contentFourthIndex} id={'sg-1-4-4-content-output-' + contentFourthIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentFourthIndex, 'sg-1-4-4-content-output-' + contentFourthIndex, 'fourth')}>
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
                                                                                        
                                                                                        <div className="container p-0 pb-3">
                                                                                            {/* Seventh Size */}
                                                                                            <div className="row w-100 m-0">
                                                                                                <Droppable droppableId={item.id + '-sg-1-5-1'}>
                                                                                                    {(provided) => (
                                                                                                        <div key={'sg-1-5-1-' + index} ref={provided.innerRef} id={'sg-1-5-1-' + index} className="d-inline p-5 text-center sg-column sg-1-5" tabIndex="0">
                                                                                                            {
                                                                                                                typeof item.content['first'] != "undefined" ? 
                                                                                                                    item.content['first'].length > 0 ?
                                                                                                                        item.content['first'].map((contentFirst, contentFirstIndex) =>(
                                                                                                                            <div key={'sg-1-5-1-content-output-' + contentFirstIndex} id={'sg-1-5-1-content-output-' + contentFirstIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentFirstIndex, 'sg-1-5-1-content-output-' + contentFirstIndex, 'first')}>
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
                                                                                                        <div key={'sg-1-5-2-' + index} ref={provided.innerRef} id={'sg-1-5-2-' + index} className="d-inline p-5 text-center sg-column sg-1-5" tabIndex="1">
                                                                                                            {
                                                                                                                typeof item.content['second'] != "undefined" ? 
                                                                                                                    item.content['second'].length > 0 ?
                                                                                                                        item.content['second'].map((contentSecond, contentSecondIndex) =>(
                                                                                                                            <div key={'sg-1-5-2-content-output-' + contentSecondIndex} id={'sg-1-5-2-content-output-' + contentSecondIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentSecondIndex, 'sg-1-5-2-content-output-' + contentSecondIndex, 'second')}>
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
                                                                                                        <div key={'sg-1-5-3-' + index} ref={provided.innerRef} id={'sg-1-5-3-' + index} className="d-inline p-5 text-center sg-column sg-1-5" tabIndex="2">
                                                                                                            {
                                                                                                                typeof item.content['third'] != "undefined" ? 
                                                                                                                    item.content['third'].length > 0 ?
                                                                                                                        item.content['third'].map((contentThird, contentThirdIndex) =>(
                                                                                                                            <div key={'sg-1-5-3-content-output-' + contentThirdIndex} id={'sg-1-5-3-content-output-' + contentThirdIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentThirdIndex, 'sg-1-5-3-content-output-' + contentThirdIndex, 'third')}>
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
                                                                                                        <div key={'sg-1-5-4-' + index} ref={provided.innerRef} id={'sg-1-5-4-' + index} className="d-inline p-5 text-center sg-column sg-1-5" tabIndex="3">
                                                                                                            {
                                                                                                                typeof item.content['fourth'] != "undefined" ? 
                                                                                                                    item.content['fourth'].length > 0 ?
                                                                                                                        item.content['fourth'].map((contentFourth, contentFourthIndex) =>(
                                                                                                                            <div key={'sg-1-5-4-content-output-' + contentFourthIndex} id={'sg-1-5-4-content-output-' + contentFourthIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentFourthIndex, 'sg-1-5-4-content-output-' + contentFourthIndex, 'fourth')}>
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
                                                                                                        <div key={'sg-1-5-5-' + index} ref={provided.innerRef} id={'sg-1-5-5-' + index} className="d-inline p-5 text-center sg-column sg-1-5" tabIndex="4">
                                                                                                            {
                                                                                                                typeof item.content['fifth'] != "undefined" ? 
                                                                                                                    item.content['fifth'].length > 0 ?
                                                                                                                        item.content['fifth'].map((contentFifth, contentFifthIndex) =>(
                                                                                                                            <div key={'sg-1-5-5-content-output-' + contentFifthIndex} id={'sg-1-5-5-content-output-' + contentFifthIndex} className="content-output" onClick={() => this.contentPaneClick(index, contentFifthIndex, 'sg-1-5-5-content-output-' + contentFifthIndex, 'fifth')}>
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
                                            />
                                            <CssEditor 
                                                currentColumn={this.state.column[this.state.activeColumnId]}
                                                setShowCssEditor={this.setShowCssEditor}
                                                showCssEditor={this.state.showCssEditor}
                                                onChangeTextArea={this.onChangeTextArea}
                                                contentIndex={this.state.activeContentIndex}
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

export default SlideHandler;
