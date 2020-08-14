import React from 'react';
import { colorHelpers } from '../../../helpers';

function EndingLayout(props) {

    const title = props.title;
    const subtitle = props.subtitle;
    const backgroundImg = props.backgroundImg.url;
    const homePageClass = props.homePageClass;
    const styles = props.styles;
    const borderBottomColor = colorHelpers.shade(styles.titleBoxColor, 0.45);
    const homePageCss = props.homePageCss;

    return (
        <div id="ending-layout">
            <div className="ending-container h-100 w-100 border border-light" style={{ backgroundImage: 'url("' + backgroundImg + '")', backgroundSize: 'cover' }}>
                <div className="slide">
                    <div id="course-name" className={homePageClass} style={{ background: styles.titleBoxColor}}>
                        <h2
                            id="course-title"
                            className={"course-header p-2 pb-3 " + styles.titleBoxBorder}
                            ref={(el) => {
                                if (el) {
                                    el.style.setProperty('border-bottom-color', borderBottomColor, 'important');
                                    el.style.setProperty('border-left-color', borderBottomColor, 'important');
                                }
                            }}
                        >
                            {title}
                            {props.cssApplier(homePageCss, 'course-title')}
                        </h2>
                    <h3 id="course-subtitle" className="course-sub-header p-2">
                        <span>{subtitle}</span>
                        {props.cssApplier(homePageCss, 'course-subtitle')}
                    </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EndingLayout;
