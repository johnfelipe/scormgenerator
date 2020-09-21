import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';

function ContentWithLeftPictureLayout(props) {

    const { output, style, css } = props;

    const content = () => {
        if (style.imgPosition === 'left') {
            if (style.layout === '50-50') {
                return (
                    <div className="row m-0">
                        <div className="col-md-6">
                            {output.image.url ?
                                <img src={output.image.url} alt={output.image.alt} className="h-auto" />
                            :
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            }
                        </div>
                        <div className={style.textColor ? "col-md-6 text-left webupps-vertical-center " + style.textColor : "col-md-6 text-left webupps-vertical-center"}>
                            {ReactHtmlParser(output.content)}
                        </div>
                    </div>
                );
            } else if (style.layout === '75-25') {
                return (
                    <div className="row m-0">
                        <div className="col-md-9">
                            {output.image.url ?
                                <img src={output.image.url} alt={output.image.alt} className="h-auto" />
                            :
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            }
                        </div>
                        <div className={style.textColor ? "col-md-3 text-left webupps-vertical-center " + style.textColor : "col-md-3 text-left webupps-vertical-center"}>
                            {ReactHtmlParser(output.content)}
                        </div>
                    </div>
                );
            }
        } else if (style.imgPosition === 'right') {
            if (style.layout === '50-50') {
                return (
                    <div className="row m-0">
                        <div className={style.textColor ? "col-md-6 text-left webupps-vertical-center " + style.textColor : "col-md-6 text-left webupps-vertical-center"}>
                            {ReactHtmlParser(output.content)}
                        </div>
                        <div className="col-md-6">
                            {output.image.url ?
                                <img src={output.image.url} alt={output.image.alt} className="h-auto" />
                            :
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            }
                        </div>
                    </div>
                );
            } else if (style.layout === '75-25') {
                return (
                    <div className="row m-0">
                        <div className={style.textColor ? "col-md-3 text-left webupps-vertical-center " + style.textColor : "col-md-3 text-left webupps-vertical-center"}>
                            {ReactHtmlParser(output.content)}
                        </div>
                        <div className="col-md-9">
                            {output.image.url ?
                                <img src={output.image.url} alt={output.image.alt} className="h-auto" />
                            :
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            }
                        </div>
                    </div>
                );
            }
        }
    }
    
    return (
        <>
            <div id="content-picture-layout" style={{ backgroundImage: 'url("' + style.backgroundImg.url + '")', backgroundSize: 'cover', background: style.backgroundColor }}>
                <div className="content-area-container h-100 w-100 border border-light p-3 ">
                    {content()}
                    {props.cssApplier(css, 'content-picture-layout')}
                    {style.backgroundAudio.url &&
                        <audio id="content-picture-bg-audio" controls autoPlay className="d-none">
                            <source src={style.backgroundAudio.url} type={style.backgroundAudio.type}/>
                            Your browser does not support the audio element.
                        </audio>
                    }
                </div>
            </div>
        </>
    );
}

export default ContentWithLeftPictureLayout;
