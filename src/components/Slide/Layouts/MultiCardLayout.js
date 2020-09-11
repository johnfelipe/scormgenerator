import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';

function MultiCardLayout(props) {

    const { output, cardClass, id, styles } = props;
    const [cardCounter, setCardCounter] = useState(0);

    const countCards = (output) => {
        if (output.firstCard.img.url !== '') {
            setCardCounter(cardCounter + 1);
        } else if (output.secondCard.img.url !== '') {
            setCardCounter(cardCounter + 1);
        } else if (output.thirdCard.img.url !== '') {
            setCardCounter(cardCounter + 1);
        } else if (output.fourthCard.img.url !== '') {
            setCardCounter(cardCounter + 1);
        }
    }

    const multiCardContent = (output, cardCounter) => {
        if (cardCounter === 0) {
            return (
                <div className="h-100 w-100 text-center">
                    <span>No content provided yet.</span>
                </div>
            );
        } else if (cardCounter === 1) {
            if (output.firstCard.img.url !== '') {
                return (
                    <>
                        <div className="image-container text-center">
                            {styles.imageShape === 'circle' ?
                                <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                            :
                                <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                            }
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{output.firstCard.title}</h5>
                            <p className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</p>
                            {output.firstCard.button.url &&
                                <a
                                    href={output.firstCard.button.url}
                                    className="btn btn-primary"
                                    style={{ background: styles.themeColor }}
                                >
                                    {output.firstCard.button.label}
                                </a>
                            }
                        </div>
                    </>
                );
            } else if (output.secondCard.img.url !== '') {
                return (
                    <>
                        <div className="image-container text-center">
                            {styles.imageShape === 'circle' ?
                                <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                            :
                                <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                            }
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{output.secondCard.title}</h5>
                            <p className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</p>
                            {output.secondCard.button.url &&
                                <a
                                    href={output.secondCard.button.url}
                                    className="btn btn-primary"
                                    style={{ background: styles.themeColor }}
                                >
                                    {output.secondCard.button.label}
                                </a>
                            }
                        </div>
                    </>
                );
            } else if (output.thirdCard.img.url !== '') {
                return (
                    <>
                        <div className="image-container text-center">
                            {styles.imageShape === 'circle' ?
                                <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                            :
                                <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                            }
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{output.thirdCard.title}</h5>
                            <p className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</p>
                            {output.thirdCard.button.url &&
                                <a
                                    href={output.thirdCard.button.url}
                                    className="btn btn-primary"
                                    style={{ background: styles.themeColor }}
                                >
                                    {output.thirdCard.button.label}
                                </a>
                            }
                        </div>
                    </>
                );
            } else if (output.fourthCard.img.url !== '') {
                return (
                    <>
                        <div className="image-container text-center">
                            {styles.imageShape === 'circle' ?
                                <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                            :
                                <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                            }
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{output.fourthCard.title}</h5>
                            <p className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</p>
                            {output.fourthCard.button.url &&
                                <a
                                    href={output.fourthCard.button.url}
                                    className="btn btn-primary"
                                    style={{ background: styles.themeColor }}
                                >
                                    {output.fourthCard.button.label}
                                </a>
                            }
                        </div>
                    </>
                );
            } else {
                return (
                    <>
                        <div className="image-container text-center">
                            <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Card Title</h5>
                            <p className="card-text h-100">Card Information</p>
                        </div>
                    </>
                );
            }
        }
    }

    return (
        <div id={id ? id : "card-layout"} className={"card " + cardClass}>
            {countCards(output)}
            {multiCardContent(output, cardCounter)}
            {/* <div className="image-container text-center">
                {output.firstCard.img.url ?
                    styles.imageShape === 'circle' ?
                        <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                    :
                        <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                :
                    <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                }
            </div>
            <div className="card-body">
                <h5 className="card-title">{output.firstCard.title}</h5>
                <p className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</p>
                {output.firstCard.button.url &&
                    <a
                        href={output.firstCard.button.url}
                        className="btn btn-primary"
                        style={{ background: styles.themeColor }}
                    >
                        {output.firstCard.button.label}
                    </a>
                }
            </div> */}
        </div>
    );
}

export default MultiCardLayout;
