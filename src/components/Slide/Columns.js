import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import ContentEditable from 'react-contenteditable';

class Columns extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapseID: false,
        };
        
        this.collapseListener = this.collapseListener.bind(this);
    }

    collapseListener = () => {
        let currentCollapseId = this.state.collapseID;

        if (currentCollapseId) {
            currentCollapseId = false;
        } else {
            currentCollapseId = true;
        }

        this.setState({
            collapseID: currentCollapseId,
        })
    }

    render() {
        return (
            <Accordion key={'accordion-column-' + this.props.columnIndex} className="mb-2">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" className="section-header p-2" onClick={this.collapseListener}>
                        <ContentEditable
                            html={this.props.name}
                            onChange={(event) => this.props.handleContentEditable(event, this.props.columnIndex)}
                            className="content-editable d-inline"
                        />
                        <button type="button" className="float-right column-item-remove-btn btn btn-link p-0" title="Remove" onClick={() => this.props.deleteColumn(this.props.columnIndex)}>
                            <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                        </button>
                        <span className="float-right mr-3"><FontAwesomeIcon icon={this.state.collapseID === true ? faCaretUp : faCaretDown}/></span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0" className="collapsible-body pb-3">
                        <Card.Body className="section-body">
                            <ul className="sg-column-layout">
                                {this.props.columnSizes.map((item, sizeIndex) => (
                                    this.props.column[this.props.columnIndex].active === sizeIndex ?
                                        <li key={sizeIndex} className="sg-active">
                                            {this.props.columnSizes[sizeIndex].items.map((item, index) => (
                                                <span key={index} className={item.class}>
                                                    {item.size}
                                                </span>
                                            ))}
                                        </li>
                                    :
                                        <li
                                            key={sizeIndex}
                                            onClick={() => {
                                                this.props.handleSizeActive(this.props.columnIndex, sizeIndex, item.id)
                                            }}
                                        >
                                            {this.props.columnSizes[sizeIndex].items.map((item, index) =>(
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
        )
    }
}

export default Columns;
