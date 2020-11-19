import React from 'react';
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import ReactHtmlParser from 'react-html-parser';

function SgChartsLayout(props) {

    // const { output, css, style } = props;
    const { output, style, slideName, slideSubtitle, showTitle } = props;
    let datasets = [];

    if (output.dataSets.data) {
        if (output.dataSets.data.length > 0) {
            for (const key of Object.keys(output.dataSets.data)) {
                const dataset = {
                    data: output.dataSets.data[key],
                    label: output.chartOptions.shownData[key].label,
                    backgroundColor: output.dataSets.colors,
                }

                datasets.push(dataset);
            }
        }
    }

    const data = {
        labels: output.dataSets.labels,
        datasets: datasets,
    };

    const chartLayoutContent = () => {
        if (output.dataSets.labels && output.dataSets.data) {
            if (output.chartType === "pie") {
                return (
                    <>
                        <div id="sg-pie-chart">
                            <Pie
                                data={data}
                                width={100}
                                height={225}
                                options={{ maintainAspectRatio: false }}
                            />
                            <label className="mt-1"><strong>{output.label}</strong></label>
                        </div>
                        <div id="sg-chart-description" className="webupps-text-indent-5 text-justify">
                            {ReactHtmlParser(output.description)}
                        </div>
                    </>
                );
            } else if (output.chartType === "doughnut") {
                return (
                    <>
                        <div id="sg-doughnut-chart">
                            <Doughnut
                                data={data}
                                width={100}
                                height={225}
                                options={{ maintainAspectRatio: false }}
                            />
                            <label className="mt-1"><strong>{output.label}</strong></label>
                        </div>
                        <div id="sg-chart-description" className="webupps-text-indent-5 text-justify">
                            {ReactHtmlParser(output.description)}
                        </div>
                    </>
                );
            } else if (output.chartType === "bar") {
                return (
                    <>
                        <div id="sg-bar-chart">
                            <Bar
                                data={data}
                                width={100}
                                height={225}
                                options={{ maintainAspectRatio: false }}
                            />
                            <label className="mt-1"><strong>{output.label}</strong></label>
                        </div>
                        <div id="sg-chart-description" className="webupps-text-indent-5 text-justify">
                            {ReactHtmlParser(output.description)}
                        </div>
                    </>
                );
            }
        } else {
            return (
                <span>No chart is shown.</span>
            );
        }
    };

    return (
        <div className="sg-charts-layout">
            <div className="w-100 h-100 p-4">
                <div className={showTitle ? "row" : "row d-none"}>
                    <div className="col-12">
                        {style.titleBoxBorder === 'border-left' ?
                            <div
                                className={"slide-header text-left " + style.titleBoxBorder}
                                ref={(el) => {
                                    if (el) {
                                        el.style.setProperty('border-left-color', style.titleBoxColor, 'important');
                                        el.style.setProperty('color', style.titleTextColor, 'important');
                                    }
                                }}
                            >
                                <h3 className="slide-subtitle">{slideName}</h3>
                                <h2 class="slide-title">{slideSubtitle}</h2>
                            </div>
                        :
                            <div className="slide-header text-left">
                                <h3 className="slide-subtitle">{slideName}</h3>
                                <h2 className="slide-title">
                                    <span
                                        className={style.titleBoxBorder}
                                        ref={(el) => {
                                            if (el) {
                                                el.style.setProperty('border-top-color', style.titleBoxColor, 'important');
                                            }
                                        }}
                                    >
                                        {slideSubtitle}
                                    </span>
                                </h2>
                            </div>
                        }
                    </div>
                </div>
                {chartLayoutContent()}
            </div>
        </div>
    );
}

export default SgChartsLayout;
