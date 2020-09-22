import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';

function MultiCardLayout(props) {

    const { output, cardClass, id, styles } = props;

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
                            <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                            <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                            <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                            <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
        } else if (cardCounter === 2) {
            if (output.firstCard.img.url !== '' && output.secondCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url !== '' && output.thirdCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url !== '' && output.fourthCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.fourthCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.secondCard.img.url !== '' && output.thirdCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.thirdCard.img.url !== '' && output.fourthCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.fourthCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url !== '' && output.secondCard.img.url === '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url !== '' && output.thirdCard.img.url === '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url !== '' && output.fourthCard.img.url === '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-6">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                    </div>
                );
            }
        } else if (cardCounter === 3) {
            if (output.firstCard.img.url !== '' && output.secondCard.img.url !== '' && output.thirdCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url !== '' && output.secondCard.img.url !== '' && output.fourthCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.fourthCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.secondCard.img.url !== '' && output.thirdCard.img.url !== '' && output.fourthCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.fourthCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.thirdCard.img.url !== '' && output.fourthCard.img.url !== '' && output.firstCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.fourthCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url !== '' && output.secondCard.img.url === '' && output.thirdCard.img.url === '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url !== '' && output.secondCard.img.url !== '' && output.thirdCard.img.url === '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url === '' && output.secondCard.img.url !== '' && output.thirdCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url !== '' && output.secondCard.img.url === '' && output.thirdCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url !== '' && output.secondCard.img.url === '' && output.fourthCard.img.url === '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url !== '' && output.secondCard.img.url !== '' && output.fourthCard.img.url === '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url !== '' && output.secondCard.img.url === '' && output.fourthCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.fourthCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.firstCard.img.url === '' && output.secondCard.img.url !== '' && output.fourthCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.fourthCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.thirdCard.img.url !== '' && output.fourthCard.img.url === '' && output.firstCard.img.url === '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                    </div>
                );
            } else if (output.thirdCard.img.url !== '' && output.fourthCard.img.url !== '' && output.firstCard.img.url === '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.fourthCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                    </div>
                );
            } else if (output.thirdCard.img.url !== '' && output.fourthCard.img.url === '' && output.firstCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.thirdCard.img.url === '' && output.fourthCard.img.url !== '' && output.firstCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.fourthCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.secondCard.img.url !== '' && output.thirdCard.img.url === '' && output.fourthCard.img.url === '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                    </div>
                );
            } else if (output.secondCard.img.url !== '' && output.thirdCard.img.url !== '' && output.fourthCard.img.url === '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                    </div>
                );
            } else if (output.secondCard.img.url !== '' && output.thirdCard.img.url === '' && output.fourthCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.fourthCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
                        </div>
                    </div>
                );
            } else if (output.secondCard.img.url === '' && output.thirdCard.img.url !== '' && output.fourthCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Card Title</h5>
                                <p className="card-text h-100">Card Information</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                        <div className="col-md-4">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.fourthCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
                        </div>
                    </div>
                );
            }
        } else if (cardCounter === 4) {
            if (output.firstCard.img.url !== '' && output.secondCard.img.url !== '' && output.thirdCard.img.url !== '' && output.fourthCard.img.url !== '') {
                return (
                    <div className="row m-0">
                        <div className="col-md-3">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.firstCard.img.url} alt={output.firstCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.firstCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.firstCard.content)}</div>
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
                        </div>
                        <div className="col-md-3">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.secondCard.img.url} alt={output.secondCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.secondCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.secondCard.content)}</div>
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
                        </div>
                        <div className="col-md-3">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.thirdCard.img.url} alt={output.thirdCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.thirdCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.thirdCard.content)}</div>
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
                        </div>
                        <div className="col-md-3">
                            <div className="image-container text-center">
                                {styles.imageShape === 'circle' ?
                                    <img className="card-img-top border border-secondary rounded-circle h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                :
                                    <img className="card-img-top border border-secondary h-auto" src={output.fourthCard.img.url} alt={output.fourthCard.img.alt}/>
                                }
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{output.fourthCard.title}</h5>
                                <div className="card-text h-100">{ReactHtmlParser(output.fourthCard.content)}</div>
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
                        </div>
                    </div>
                );
            }
        }
    }

    return (
        <div id={id ? id : "card-layout"} className={"card " + cardClass}>
            {multiCardContent(output, output.cardCounter.length)}
            {styles.backgroundAudio.url &&
                <audio id="multi-card-bg-audio" controls autoPlay className="d-none">
                    <source src={styles.backgroundAudio.url} type={styles.backgroundAudio.type}/>
                    Your browser does not support the audio element.
                </audio>
            }
        </div>
    );
}

export default MultiCardLayout;
