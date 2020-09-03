import React from 'react';
import { Modal } from 'react-bootstrap';

function ChartDataAlert(props) {

    const { modalShow } = props;

    const chartDataAlertModal = (
        <Modal
            show={modalShow}
            onHide={() => props.setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="gallery-preview-modal w-50"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Alert
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>
                    CSV Data format is incorrect. Download examples below:
                    <br/>
                    Example #1:&nbsp;
                    <a href="/assets/sample-csv/temperature-precipitation-data.csv" download>Temperature and Precipitation data through the months</a>
                    <br/>
                    Example #2:&nbsp;
                    <a href="/assets/sample-csv/tennis-players.csv" download>Which tennis player was No.1 the longest?</a>
                </span>
            </Modal.Body>
        </Modal>
    );

    return (
        <>
            {chartDataAlertModal}
        </>
    );
}

export default ChartDataAlert;