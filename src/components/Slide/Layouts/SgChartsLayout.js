import React from 'react';
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import ReactHtmlParser from 'react-html-parser';

function SgChartsLayout(props) {

    // const { output, css, style } = props;
    const { output } = props;
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
                            <Pie data={data} />
                            <label className="mt-1"><strong>{output.label}</strong></label>
                        </div>
                        <div id="sg-chart-description" className="sg-text-indent-5 text-justify">
                            {ReactHtmlParser(output.description)}
                        </div>
                    </>
                );
            } else if (output.chartType === "doughnut") {
                return (
                    <>
                        <div id="sg-doughnut-chart">
                            <Doughnut data={data} />
                            <label className="mt-1"><strong>{output.label}</strong></label>
                        </div>
                        <div id="sg-chart-description" className="sg-text-indent-5 text-justify">
                            {ReactHtmlParser(output.description)}
                        </div>
                    </>
                );
            } else if (output.chartType === "bar") {
                return (
                    <>
                        <div id="sg-bar-chart">
                            <Bar data={data} />
                            <label className="mt-1"><strong>{output.label}</strong></label>
                        </div>
                        <div id="sg-chart-description" className="sg-text-indent-5 text-justify">
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
        <div id="sg-charts-layout" className="w-100 h-100 p-3 border border-light">
            {chartLayoutContent()}
        </div>
    );
}

export default SgChartsLayout;
