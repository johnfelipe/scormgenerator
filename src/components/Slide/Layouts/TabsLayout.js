import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

function TabsLayout(props) {

    const { output, css } = props;
    // const [key, setKey] = useState();

    return (
        <div id="tabs-layout" className="w-100 h-100 p-3 border border-light">
            {output.length > 0 ?
                <Tabs id="tabs-layout-tabs-feature">
                    {output.map((item, itemIndex) => (
                        <Tab key={"tabs-feature-" + itemIndex} eventKey={item.tabHeader} title={item.tabHeader}>
                            {ReactHtmlParser(item.tabContent)}
                            {/* {setKey(item.tabHeader)} */}
                            {props.cssApplier(css, 'audio-layout')}
                        </Tab>
                    ))}
                </Tabs>
            :
                <div>
                    <span>No tabs added.</span>
                </div>
            }
        </div>
    );
}

export default TabsLayout;
