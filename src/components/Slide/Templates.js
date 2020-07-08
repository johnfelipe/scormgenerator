import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt, faImages, faFilm } from '@fortawesome/free-solid-svg-icons';

class Templates extends Component {

    render() {

        let renderContent = '';

        // if (this.props.icon) {
        //     renderContent = (
        //         <>
        //             <FontAwesomeIcon className="feature-icon" icon={this.props.icon}/>
        //             <h4>{this.props.name}</h4>
        //             <FontAwesomeIcon icon={faArrowsAlt}/>
        //         </>
        //     );
        // } else {
        if (this.props.icon === 'template1') {
            renderContent = (
                <>
                    <ul class="sg-column-layout">
                        <li>
                            <span class="sg-1-2"><FontAwesomeIcon icon={faImages} size="10px"/><FontAwesomeIcon icon={faFilm} size="10px"/></span>
                            <span class="sg-1-2"><FontAwesomeIcon icon={faImages} size="10px"/><FontAwesomeIcon icon={faFilm} size="10px"/></span>
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
        // }

        return (
            <>
                {renderContent}
            </>
        )
    }
}

export default Templates;
