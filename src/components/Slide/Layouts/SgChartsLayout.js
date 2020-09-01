import React from 'react';
import { Pie, Doughnut } from "react-chartjs-2";

function SgChartsLayout(props) {

    // const { output, css, style } = props;
    const { output } = props;

    const data = {
        labels: output.dataSets.labels,
        datasets: [
            {
              data: output.dataSets.data,
            }
          ]
    };

    return (
        <div id="sg-charts-layout" className="w-100 h-100 p-3 border border-light">
            {output.chartType === "pie" &&  output.dataSets.labels &&  output.dataSets.data ?
                <Pie data={data} />
            :
                output.chartType === "doughnut" ?
                    <Doughnut data={data} />
                :
                    <span>No chart is shown.</span>
            }
        </div>
    );
}

export default SgChartsLayout;
