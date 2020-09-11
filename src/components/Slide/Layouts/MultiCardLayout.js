import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';

function MultiCardLayout(props) {

    const { cardOutput, cardClass, cardId, cardStyles } = props;

    return (
        <div id={cardId ? cardId : "card-layout"} className={"card " + cardClass}>
            <div className="image-container text-center">
                {cardOutput.img.url ?
                    cardStyles.imageShape === 'circle' ?
                        <img className="card-img-top border border-secondary rounded-circle h-auto" src={cardOutput.img.url} alt={cardOutput.img.alt}/>
                    :
                        <img className="card-img-top border border-secondary h-auto" src={cardOutput.img.url} alt={cardOutput.img.alt}/>
                :
                    <FontAwesomeIcon icon={faImage} className="w-25 h-100"/>
                }
            </div>
            <div className="card-body">
                <h5 className="card-title">{cardOutput.title}</h5>
                <p className="card-text h-100">{ReactHtmlParser(cardOutput.content)}</p>
                {cardOutput.button.url &&
                    <a
                        href={cardOutput.button.url}
                        className="btn btn-primary"
                        style={{ background: cardStyles.themeColor }}
                    >
                        {cardOutput.button.label}
                    </a>
                }
            </div>
        </div>
    );
}

export default MultiCardLayout;
