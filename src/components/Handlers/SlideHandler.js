import React, { Component } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { Formik } from "formik";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// components
import SlideColumn from '../Slide/Columns';

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
            ]
        };
        
        this.setModalShow = this.setModalShow.bind(this);
        this.addColumn = this.addColumn.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
        this.handleSizeActive = this.handleSizeActive.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidUpdate() {
        console.log('state.columns: ');
        console.log(this.state.column);
        console.log('props.columns: ');
        console.log(this.props.currentColumns);
        console.log('props.action');
        console.log(this.props.action);
    }

    setModalShow = (value, action) => {
        
        this.setState({
            modalShow: value,
        });

        if (!value && (action === "close" || action === "edit")) {
            this.setState({
                column: this.props.currentColumns ? this.props.currentColumns : [],
            });
        }

        if (!value && (action === "save" || action === "add")) {
            this.setState({
                column: [],
            });
        }
    }

    addColumn = () => {
        const currentCount = this.state.column.length + 1
        const columnObj = { type: 'column', name: 'Column ' + currentCount, active: -1, sizeId: -1 }

        this.setState({
            column: [...this.state.column, columnObj],
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

        if (source.droppableId === destination.droppableId) {
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
    };

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
                                    <div className="row">
                                        <div id="slide-sidebar" className="col-md-3 pr-0">
                                            <Tabs defaultActiveKey="column" id="uncontrolled-tab" className="text-center">
                                                <Tab eventKey="column" title="Column" className="mt-3">
                                                    {
                                                        this.state.column.length !== 0 ?
                                                            <DragDropContext onDragEnd={this.onDragEnd}>
                                                                <Droppable droppableId="columns">
                                                                    {(provided) => (
                                                                        <div ref={provided.innerRef}>
                                                                            {this.state.column.map((item, columnIndex) => (
                                                                                <Draggable
                                                                                    key={'draggable-' + columnIndex}
                                                                                    draggableId={'' + columnIndex}
                                                                                    index={columnIndex}>
                                                                                    {(provided) => (
                                                                                        <div
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}
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
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                            </DragDropContext>
                                                        :
                                                        <span></span>
                                                    }

                                                    <button type="button" className="sg-add-sortable-item-after" onClick={this.addColumn}>Add Column</button>

                                                </Tab>
                                                <Tab eventKey="features" title="Features" className="mt-3">
                                                    <span>To me that languish'd for her sake: But when she saw my woeful state, </span>
                                                </Tab>
                                                <Tab eventKey="editor" title="Editor" className="mt-3">
                                                    <span>Straight in her heart did mercy come, Chiding that tongue that ever sweet Was us'd in giving gentle doom; And taught it thus anew to greet; 'I hate' she alter'd with an end, That followed it as gentle day,</span>
                                                </Tab>
                                            </Tabs>
                                        </div>
                                        <div id="slide-content" className="col-md-9 pl-0">
                                            <div id="slide-content-container" className="border p-3 h-100">
                                                    {
                                                        this.state.column.length !== 0 ?
                                                        this.state.column.map((item, index) => (
                                                            item.sizeId === 0 || item.sizeId === -1 ?
                                                                <div key={index} className="container p-0 pb-3">
                                                                    <div key={index} id={item.name} className="border p-5 text-center sg-column mt-2">
                                                                        {item.name}
                                                                    </div>
                                                                </div>
                                                            :
                                                                item.sizeId === 1 ?
                                                                    <div key={index} className="container p-0 pb-3">
                                                                        <div className="row w-100 m-0">
                                                                            <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-2">
                                                                                {item.name}
                                                                            </div>
                                                                            <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-2">
                                                                                {item.name}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                :
                                                                    item.sizeId === 2 ?
                                                                        <div key={index} className="container p-0 pb-3">
                                                                            <div className="row w-100 m-0">
                                                                                <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-3">
                                                                                    {item.name}
                                                                                </div>
                                                                                <div id={item.name} className="border d-inline p-5 text-center sg-column sg-2-3">
                                                                                    {item.name}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    :
                                                                        item.sizeId === 3 ?
                                                                            <div key={index} className="container p-0 pb-3">
                                                                                <div className="row w-100 m-0">
                                                                                    <div id={item.name} className="border d-inline p-5 text-center sg-column sg-2-3">
                                                                                        {item.name}
                                                                                    </div>
                                                                                    <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-3">
                                                                                        {item.name}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        :
                                                                            item.sizeId === 4 ?
                                                                                <div key={index} className="container p-0 pb-3">
                                                                                    <div className="row w-100 m-0">
                                                                                        <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-3">
                                                                                            {item.name}
                                                                                        </div>
                                                                                        <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-3">
                                                                                            {item.name}
                                                                                        </div>
                                                                                        <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-3">
                                                                                            {item.name}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            :
                                                                                item.sizeId === 5 ?
                                                                                    <div key={index} className="container p-0 pb-3">
                                                                                        <div className="row w-100 m-0">
                                                                                            <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-4">
                                                                                                {item.name}
                                                                                            </div>
                                                                                            <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-4">
                                                                                                {item.name}
                                                                                            </div>
                                                                                            <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-4">
                                                                                                {item.name}
                                                                                            </div>
                                                                                            <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-4">
                                                                                                {item.name}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                :
                                                                                    <div key={index} className="container p-0 pb-3">
                                                                                        <div className="row w-100 m-0">
                                                                                            <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-5">
                                                                                                {item.name}
                                                                                            </div>
                                                                                            <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-5">
                                                                                                {item.name}
                                                                                            </div>
                                                                                            <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-5">
                                                                                                {item.name}
                                                                                            </div>
                                                                                            <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-5">
                                                                                                {item.name}
                                                                                            </div>
                                                                                            <div id={item.name} className="border d-inline p-5 text-center sg-column sg-1-5">
                                                                                                {item.name}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                        ))
                                                        :
                                                        <span></span>
                                                    }
                                            </div>
                                        </div>
                                    </div>
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
