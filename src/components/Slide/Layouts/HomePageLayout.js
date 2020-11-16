import React from 'react';
import { colorHelpers } from '../../../helpers';

function HomePageLayout(props) {

    const title = props.title;
    const subtitle = props.subtitle;
    const date = props.date;
    const courseId = props.courseId;
    const backgroundImg = props.backgroundImg.url;
    const homePageClass = props.homePageClass;
    const styles = props.styles;
    const borderBottomColor = colorHelpers.shade(styles.titleBoxColor, 0.45);
    const homePageCss = props.homePageCss;

    return (
        <div className="home-page-layout">
            <div className="home-page-container h-100 w-100" style={{ backgroundImage: 'url("' + backgroundImg + '")', backgroundSize: 'cover' }}>
                <div className="slide">
                    <div id="course-name" className={homePageClass} style={{ background: styles.titleBoxColor}}>
                        <h2
                            id="course-title"
                            className={"course-header p-2 pb-3 " + styles.titleBoxBorder}
                            // style={{ borderBottomColor: borderBottomColor }}
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
                    {/* <div className="course-bar" style={{ background: colorHelpers.shade(styles.titleBoxColor, 0.45)}}></div> */}
                    <h3 id="course-subtitle" className="course-sub-header p-2">
                        <span>{subtitle}</span>
                        {date &&
                            <>
                                <br/>
                                <span>{date}</span>
                            </>
                        }
                        {courseId &&
                            <>
                                <br/>
                                <span>COURSE ID: {courseId}</span>
                            </>
                        }
                        {props.cssApplier(homePageCss, 'course-subtitle')}
                    </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePageLayout;
