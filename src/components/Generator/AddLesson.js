import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

// styling
import '../../css/styles.css';
import '../../assets/bootstrap/css/bootstrap.min.css';

// components
import TextInput from './TextInput';

class AddLesson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            lessonList: this.props.lessonList,
        };
        this.setModalShow = this.setModalShow.bind(this);
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    lessonNameHandler = (name) => {
        
    }

    render() {
        const addLessonModal = (
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
                    <TextInput
                        placeholder="Type lesson name here . . ."
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => this.setModalShow(false)}>Save</Button>
                </Modal.Footer>
            </Modal>
        );

        return (
            <div id="add-lesson-container" className="float-left">
                <button type="button" className="btn btn-success" onClick={() => this.setModalShow(true)}>Add Lesson</button>
                {addLessonModal}
            </div>
        )
    }
}

export default AddLesson;
