import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

class Features extends Component {

    render() {
        return (
            <>
                <FontAwesomeIcon className="feature-icon" icon={this.props.icon}/>
                <h4>{this.props.name}</h4>
                <FontAwesomeIcon icon={faArrowsAlt}/>
            </>
        )
    }
}

export default Features;
