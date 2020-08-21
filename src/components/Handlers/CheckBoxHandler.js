import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

class CheckBoxHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressbar: this.props.value,
        };
    }

    render() {
        return (
            <div>
                <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                        <Tooltip id='tooltip-top'>
                            <label htmlFor="showTitle">
                            {
                                this.props.currentCbValue ?
                                    <span>Shown</span>
                                :
                                    <span>Hidden</span>
                            }
                                
                            </label>
                        </Tooltip>
                    }
                >
                    <label className="check-text ml-3">
                        &nbsp;&nbsp;
                        {this.props.label}
                        &nbsp;&nbsp;
                        <input
                            id={this.props.name}
                            name={this.props.name}
                            type="checkbox"
                            value={this.props.currentCbValue}
                            checked={this.props.currentCbValue}
                            onChange={this.props.handleChange}
                            onBlur={this.props.onBlur}
                            disabled={!this.props.courseNameExist}
                            className="d-none"
                        />
                            <FontAwesomeIcon icon={this.props.currentCbValue ? faEye : faEyeSlash}/>
                    </label>
                </OverlayTrigger>
            </div>
        )
    }
}

export default CheckBoxHandler;
