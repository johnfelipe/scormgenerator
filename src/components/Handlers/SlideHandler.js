import React, { Component } from 'react';
import { Accordion, Card, Modal, Tab, Tabs } from 'react-bootstrap';
import { Formik } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ContentEditable from 'react-contenteditable'

class SlideHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            column: this.props.currentColumns ? this.props.currentColumns : [],
            columnSizes: [
                { items: [{ size: "1/1", class: "sg-1-1"}]},
                { items: [{ size: "1/2", class: "sg-1-2"}, { size: "1/2", class: "sg-1-2"}]},
                { items: [{ size: "1/3", class: "sg-1-3"}, { size: "2/3", class: "sg-2-3"}]},
                { items: [{ size: "2/3", class: "sg-2-3"}, { size: "1/3", class: "sg-1-3"}]},
                { items: [{ size: "1/3", class: "sg-1-3"}, { size: "1/3", class: "sg-1-3"}, { size: "1/3", class: "sg-1-3"}]},
                { items: [{ size: "1/4", class: "sg-1-4"}, { size: "1/4", class: "sg-1-4"}, { size: "1/4", class: "sg-1-4"}, { size: "1/4", class: "sg-1-4"}]},
                { items: [{ size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}, { size: "1/5", class: "sg-1-5"}]},
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
    }

    setModalShow = (value, action) => {
        
        this.setState({
            modalShow: value,
        });

        if (!value && (action === "close")) {
            this.setState({
                column: this.props.currentColumns ? this.props.currentColumns : [],
            });
        }
    }

    addColumn = () => {
        const currentCount = this.state.column.length + 1
        const columnObj = { type: 'column', name: 'Column ' + currentCount, active: -1 }

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

    handleSizeActive = (columnIndex, sizeIndex) => {
        const columnSizesObj = this.state.column;

        columnSizesObj[columnIndex].active = sizeIndex;

        this.setState({
            column: columnSizesObj,
        })
    }

    onSave = (slide, columns, id) => {
        if (this.props.action === "add") {
            const slideObj = {slideName: slide, columns: columns}
            this.props.addSlideChange(slideObj, id);
            console.log("add");
        } else if (this.props.action === "edit") {
            const slideObj = {slideName: slide, columns: columns}
            this.props.editSlideChange(slideObj, id, this.props.currentClickedLessonId);
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
                            this.onSave(values.slideName, this.state.column, this.props.id);
                        }}
                    >
                        {props => {
                            const {
                            values,
                            isSubmitting,
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
                                        // checked={values.showTitle === true}
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
                                                        this.state.column.map((item, columnIndex) => (
                                                            <>
                                                                <Accordion key={columnIndex} className="mb-2">
                                                                    <Card>
                                                                        <Accordion.Toggle as={Card.Header} eventKey="0" className="section-header p-2">
                                                                            <ContentEditable
                                                                                html={item.name}
                                                                                onChange={(event) => this.handleContentEditable(event, columnIndex)}
                                                                                className="content-editable d-inline"
                                                                            />
                                                                            <button type="button" className="float-right column-item-remove-btn btn btn-link p-0" title="Remove" onClick={() => this.deleteColumn(columnIndex)}><FontAwesomeIcon icon={faTrash}/></button>
                                                                        </Accordion.Toggle>
                                                                        <Accordion.Collapse eventKey="0" className="collapsible-body pb-3">
                                                                            <Card.Body className="section-body">
                                                                                <ul className="sg-column-layout">
                                                                                    {this.state.columnSizes.map((item, sizeIndex) => (
                                                                                        this.state.column[columnIndex].active === sizeIndex ?
                                                                                            <li key={sizeIndex} className="sg-active" onClick={() => this.handleSizeActive(columnIndex, sizeIndex)}>
                                                                                                {this.state.columnSizes[sizeIndex].items.map((item, index) =>(
                                                                                                    <span key={index} className={item.class}>
                                                                                                        {item.size}
                                                                                                    </span>
                                                                                                ))}
                                                                                            </li>
                                                                                        :
                                                                                            <li key={sizeIndex} onClick={() => this.handleSizeActive(columnIndex, sizeIndex)}>
                                                                                                {this.state.columnSizes[sizeIndex].items.map((item, index) =>(
                                                                                                    <span key={index} className={item.class}>
                                                                                                        {item.size}
                                                                                                    </span>
                                                                                                ))}
                                                                                            </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </Card.Body>
                                                                        </Accordion.Collapse>
                                                                    </Card>
                                                                </Accordion>
                                                            </>
                                                        ))
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
                                                            <div key={index} id={item.name} className="border p-5 text-center mt-2">
                                                                {item.name}
                                                            </div>
                                                        ))
                                                        :
                                                        <span></span>
                                                    }
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success float-right mt-2" disabled={isSubmitting}>Save</button>
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
