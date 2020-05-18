import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faFileAudio } from '@fortawesome/free-regular-svg-icons';

class Features extends Component {

    render() {
        return (
            <div className="sg-element-library">
                <div className="sg-element-library-item">
                    <FontAwesomeIcon className="feature-icon" icon={faFileAudio}/>
                    <h4>Audio</h4>
                    <FontAwesomeIcon icon={faArrowsAlt}/>
                </div>
                <div className="sg-element-library-item">
                    <FontAwesomeIcon className="feature-icon" icon={faSquare}/>
                    <h4>Content Area</h4>
                    <FontAwesomeIcon icon={faArrowsAlt}/>
                </div>
            </div>
        )
    }
}

export default Features;
