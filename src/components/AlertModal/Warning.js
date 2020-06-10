import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class Warning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        };
        this.setModalShow = this.setModalShow.bind(this);
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    render() {

        // Warning modal
        const warningModal = (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Warning
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Please enter a course name first</span>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={() => this.setModalShow(false)}>Okay</button>
                </Modal.Footer>
            </Modal>
        );

        let value = '';

        if (this.props.fieldType === 'label') {
            value = (
                <label htmlFor={this.props.htmlFor} className={this.props.labelClasses} id={this.props.labelId} onClick={() => {this.setModalShow(true)}}>
                    <span>{this.props.label}</span>
                </label>
            );
        } else if (this.props.fieldType === 'buttonWithLabel') {
            value = (
                <>
                    <label htmlFor={this.props.htmlFor} className={this.props.labelClasses}>{this.props.label}</label>
                    <button type="button" className={this.props.btnClasses} onClick={() => this.setModalShow(true)}>{this.props.btnLabel}</button>
                </>
            );
        }

        return (
            <>
                {value}
                {warningModal}
            </>
        )
    }
}

export default Warning;