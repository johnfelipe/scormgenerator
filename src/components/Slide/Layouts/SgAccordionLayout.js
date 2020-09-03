import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

function SgAccordionLayout(props) {

    const { output, style, css } = props;
    
    return (
        <>
            <div id="sg-accordion-layout" style={{ backgroundImage: 'url("' + style.backgroundImg.url + '")', backgroundSize: 'cover' }}>
                <div className="content-area-container h-100 w-100 border border-light p-3 ">
                    {output.length > 0 ?
                        output.map((item, itemIndex) => (
                            <Accordion key={'accordion-sg-accordion-output-' + itemIndex}>
                                <Card>
                                    <Accordion.Toggle
                                        as={Card.Header}
                                        eventKey={itemIndex}
                                        className="p-2"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span>{item.title}</span>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={itemIndex}>
                                        <Card.Body className="p-2">
                                            {ReactHtmlParser(item.content)}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        ))
                    :
                        <span>No accordion added.</span>
                    }
                    {props.cssApplier(css, 'sg-accordion-layout')}
                </div>
            </div>
        </>
    );
}

export default SgAccordionLayout;
