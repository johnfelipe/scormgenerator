import React from 'react';
import { Tabs, Tab, Nav } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

function TabsLayout(props) {

    const { output, css, style } = props;

    return (
        <div id="tabs-layout" className="w-100 h-100 p-3 border border-light">
            {style.tabPosition === 'top' ?
                <>
                    {output.length > 0 ?
                        <Tabs id="tabs-layout-tabs-feature" variant={style.tabStyle}>
                            {output.map((item, itemIndex) => (
                                <Tab key={"tabs-nav-header-" + itemIndex} eventKey={item.tabHeader} title={item.tabHeader}>
                                    {ReactHtmlParser(item.tabContent)}
                                    {props.cssApplier(css, 'audio-layout')}
                                </Tab>
                            ))}
                        </Tabs>
                    :
                        <div>
                            <span>No tabs added.</span>
                        </div>
                    }
                </>
            :
                <Tab.Container id={"tabs-" + style.tabPosition} defaultActiveKey="first">
                    <div className="row">
                        <div className="col-sm-3">
                            <Nav variant={style.tabStyle} className="flex-column">
                                {output.map((item, itemIndex) => (
                                    <Nav.Item key={"tabs-feature-" + itemIndex}>
                                        <Nav.Link eventKey={item.tabHeader}>{item.tabHeader}</Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </div>
                        <div className="col-sm-9">
                            <Tab.Content>
                                {output.map((item, itemIndex) => (
                                    <Tab.Pane key={"tabs-tab-content-" + itemIndex} eventKey={item.tabHeader}>
                                        {ReactHtmlParser(item.tabContent)}
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </div>
                    </div>  
                </Tab.Container>
            }
        </div>
    );
}

export default TabsLayout;
