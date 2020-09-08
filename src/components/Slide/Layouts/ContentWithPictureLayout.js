import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';

function ContentWithLeftPictureLayout(props) {

    const { output, style, css } = props;
    
    return (
        <>
            <div id="content-picture-layout" style={{ backgroundImage: 'url("' + style.backgroundImg.url + '")', backgroundSize: 'cover', background: style.backgroundColor }}>
                <div className="content-area-container h-100 w-100 border border-light p-3 ">
                    {style.imgPosition === 'left' ?
                        <div className="row m-0">
                            <div className="col-md-6">
                                {output.image.url ?
                                    <img src={output.image.url} alt={output.image.alt} className="h-100" />
                                :
                                    <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                                }
                            </div>
                            <div className={style.textColor ? "col-md-6 text-left sg-vertical-center " + style.textColor : "col-md-6 text-left sg-vertical-center"}>
                                {ReactHtmlParser(output.content)}
                            </div>
                        </div>
                    :
                        <div className="row m-0">
                            <div className={style.textColor ? "col-md-6 text-left sg-vertical-center " + style.textColor : "col-md-6 text-left sg-vertical-center"}>
                                {ReactHtmlParser(output.content)}
                            </div>
                            <div className="col-md-6">
                                {output.image.url ?
                                    <img src={output.image.url} alt={output.image.alt} className="h-100" />
                                :
                                    <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                                }
                            </div>
                        </div>
                    }
                    {props.cssApplier(css, 'content-picture-layout')}
                </div>
            </div>
        </>
    );
}

export default ContentWithLeftPictureLayout;
