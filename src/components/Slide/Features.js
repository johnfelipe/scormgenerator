import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

class Features extends Component {

    render() {
        return (
            <>{this.props.icon.length > 0 ?
                    <>
                        {this.props.icon.map((item, itemIndex) => {
                            return (
                                <FontAwesomeIcon
                                    key={"sg-icon-" + itemIndex}
                                    className={
                                        itemIndex === 0 ? 
                                            "feature-icon w-8 mr-1"
                                        :
                                            "feature-icon w-8"
                                    }
                                    icon={item}
                                />
                            );
                        })}
                        <h4>{this.props.name}</h4>
                        <FontAwesomeIcon icon={faArrowsAlt}/>
                    </>
                :
                    <>
                        <FontAwesomeIcon className="feature-icon" icon={this.props.icon}/>
                        <h4>{this.props.name}</h4>
                        <FontAwesomeIcon icon={faArrowsAlt}/>
                    </>
                }
            </>
        )
    }
}

export default Features;
