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
                            <span class="sg-1-2 p-1 text-center"><FontAwesomeIcon icon={faImages}/>/<FontAwesomeIcon icon={faFilm}/></span>
                            <span class="sg-1-2 p-1 text-center"><FontAwesomeIcon icon={faImages}/>/<FontAwesomeIcon icon={faFilm}/></span>
                        </li>
                    </ul>
                    <h4>{this.props.name}</h4>
                    <FontAwesomeIcon icon={faArrowsAlt}/>
                </>
            );
        } else if (this.props.icon === 'template2') {
            renderContent = (
                <>
                    <ul class="sg-column-layout">
                        <li>
                            <span class="sg-1-3 p-1 text-center"><FontAwesomeIcon icon={faImages} className="mt-1"/>/<FontAwesomeIcon icon={faFilm} className="mt-1"/></span>
                            <span class="sg-2-3 p-1"></span>
                        </li>
                    </ul>
                    <h4>{this.props.name}</h4>
                    <FontAwesomeIcon icon={faArrowsAlt}/>
                </>
            );
        } else if (this.props.icon === 'template3') {
            renderContent = (
                <>
                    <ul class="sg-column-layout">
                        <li>
                            <span class="sg-2-3 p-1"></span>
                            <span class="sg-1-3 p-1 text-center"><FontAwesomeIcon icon={faImages} className="mt-1"/>/<FontAwesomeIcon icon={faFilm} className="mt-1"/></span>
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
