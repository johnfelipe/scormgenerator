import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt, faImages, faFilm } from '@fortawesome/free-solid-svg-icons';

class Templates extends Component {

    render() {

        let renderContent = '';

        if (this.props.icon === 'template1') {
            renderContent = (
                <>
                    <ul class="sg-column-layout">
                        <li>
                            <span class="sg-1-2 p-1"><FontAwesomeIcon icon={faImages} className="fa-w-10"/>/<FontAwesomeIcon icon={faFilm} className="fa-w-10"/></span>
                            <span class="sg-1-2 p-1"><FontAwesomeIcon icon={faImages} className="fa-w-10"/>/<FontAwesomeIcon icon={faFilm} className="fa-w-10"/></span>
                        </li>
                    </ul>
                    <h4>{this.props.name}</h4>
                    <FontAwesomeIcon icon={faArrowsAlt}/>
                </>
            );
        } else {
            renderContent = (
                <>
                    <FontAwesomeIcon className="feature-icon" icon={this.props.icon}/>
                    <h4>{this.props.name}</h4>
                    <FontAwesomeIcon icon={faArrowsAlt}/>
                </>
            );
        }

        return (
            <>
                {renderContent}
            </>
        )
    }
}

export default Templates;
