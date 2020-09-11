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
                                            this.props.category === "fixed" ? 
                                                "feature-icon w-8 mr-1 text-primary" 
                                            : 
                                                "feature-icon w-8 mr-1"
                                        :
                                            this.props.category === "fixed" ? 
                                                "feature-icon w-8 text-primary"
                                            :
                                                "feature-icon w-8"
                                    }
                                    icon={item}
                                />
                            );
                        })}
                        <h4 className={this.props.category === "fixed" ? "text-primary" : ""}>{this.props.name}</h4>
                        <FontAwesomeIcon icon={faArrowsAlt} className={this.props.category === "fixed" ? "text-primary" : ""}/>
                    </>
                :
                    <>
                        <FontAwesomeIcon className={this.props.category === "fixed" ? "feature-icon text-primary" : "feature-icon"} icon={this.props.icon}/>
                        <h4 className={this.props.category === "fixed" ? "text-primary" : ""}>{this.props.name}</h4>
                        <FontAwesomeIcon icon={faArrowsAlt} className={this.props.category === "fixed" ? "text-primary" : ""}/>
                    </>
                }
            </>
        )
    }
}

export default Features;
