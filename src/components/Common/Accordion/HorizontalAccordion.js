import React from 'react';
import './HorizontalAccordion.css';
import ReactHtmlParser from 'react-html-parser';

function HorizontalAccordion(props) {

    const { title, content, className, id, index } = props

    return (
        <div className="container p-0">
            <div className="sg-accordion m-0">
                <div className="tabs">
                    <div className="social-links w-100">
                        <span>{title}</span>
                    </div>
                    <div className="paragraph">
                        <h1>Twitter</h1>
                        <p>My thoughts in 140 characters or less. Sometimes, I do not know how to correctly use Twitter.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HorizontalAccordion;
