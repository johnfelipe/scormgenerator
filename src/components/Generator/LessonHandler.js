import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

class AddLesson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            lessonName: this.props.currentLessonName,
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    handleChange = (event) => {
        this.setState({
            lessonName: event.target.value,
        })
    }

    onSave = () => {
        if (this.props.action === "add") {
            this.props.addLessonNameChange(this.state.lessonName);
            this.setState({
                lessonName: '',
            })
        } else if (this.props.action === "edit") {
            this.props.editLessonNameChange(this.state.lessonName, this.props.id);
        }
        
        this.setModalShow(false)
    }

    render() {
        const lessonModal = (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Lesson Name
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        id="lessonName"
                        name="lessonName"
                        type="text"
                        className="form-control"
                        onChange={(event) => this.handleChange(event)}
                        value={this.state.lessonName ? this.state.lessonName : ''}
                        placeholder="Type lesson name here . . ."
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.onSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        );

        return (
            <div id="lesson-handler-container" className="d-inline">
                {this.props.action === "add" ?
                    <div id="add-lesson-btn" className="float-left">
                        <button type="button" className="btn btn-success" onClick={() => this.setModalShow(true)}>Add Lesson</button>
                    </div>
                :
                    <div id="edit-lesson-btn" className="d-inline">
                        <button type="button" className="btn btn-link pl-0" onClick={() => this.setModalShow(true)}>| Edit</button>
                    </div>
                }
                {lessonModal}
            </div>
        )
    }
}

export default AddLesson;
