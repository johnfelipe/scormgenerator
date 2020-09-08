import React from 'react';
import { Pie, Doughnut, Bar } from "react-chartjs-2";

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
                    <Pie data={data} />
                );
            } else if (output.chartType === "doughnut") {
                return (
                    <Doughnut data={data} />
                );
            } else if (output.chartType === "bar") {
                return (
                    <Bar data={data} />
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
