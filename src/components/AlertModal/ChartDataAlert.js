import React from 'react';
import { Modal } from 'react-bootstrap';

function ChartDataAlert(props) {

    const { modalShow, title } = props;

    const chartDataAlertModal = (
        <Modal
            show={modalShow}
            onHide={() => props.setModalShow(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="gallery-preview-modal w-50"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>
                    CSV Data format is incorrect. See/Download examples below:
                    <br/>
                    <span>Example #1:&nbsp;</span>
                    <a href="/assets/sample-csv/temperature-precipitation-data.csv" download>Temperature and Precipitation data through the months</a>
                    <p className="webupps-code">
                        <code>
                            month,temperature,precipitation<br/>
                            January,7,8<br/>
                            February,7,1<br/>
                            March,10,14.9<br/>
                            April,15,41<br/>
                            May,20,31.4<br/>
                            June,23,42.6<br/>
                            July,26,57.5<br/>
                            .<br/>
                            .<br/>
                            .<br/>
                        </code>
                    </p>
                    <span>Example #2:&nbsp;</span>
                    <a href="/assets/sample-csv/tennis-players.csv" download>Which tennis player was No.1 the longest?</a>
                    <p className="webupps-code">
                        <code>
                            Name,Weeks,Gender<br/>
                            Steffi Graf,377,Female<br/>
                            Martina Navratilova,332,Female<br/>
                            Serena Williams,319,Female<br/>
                            .<br/>
                            .<br/>
                            .<br/>
                            Evonne Goolagong Cawley,2,Female<br/>
                            Carlos Moya,2,Male<br/>
                            Patrick Rafter,1,Male<br/>
                        </code>
                    </p>
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