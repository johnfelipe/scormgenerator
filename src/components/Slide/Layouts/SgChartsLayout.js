import React from 'react';
import { Pie, Doughnut } from "react-chartjs-2";

function SgChartsLayout(props) {

    // const { output, css, style } = props;
    const { output } = props;

    const data = {
        // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        labels: output.dataSets.labels,
        // datasets: [
        //   {
        //     label: "# of Votes",
        //     data: [12, 19, 3, 5, 2, 3],
        //     backgroundColor: [
        //       "rgba(255, 99, 132, 0.2)",
        //       "rgba(54, 162, 235, 0.2)",
        //       "rgba(255, 206, 86, 0.2)",
        //       "rgba(75, 192, 192, 0.2)",
        //       "rgba(153, 102, 255, 0.2)",
        //       "rgba(255, 159, 64, 0.2)"
        //     ],
        //     borderColor: [
        //       "rgba(255,99,132,1)",
        //       "rgba(54, 162, 235, 1)",
        //       "rgba(255, 206, 86, 1)",
        //       "rgba(75, 192, 192, 1)",
        //       "rgba(153, 102, 255, 1)",
        //       "rgba(255, 159, 64, 1)"
        //     ],
        //     borderWidth: 1
        //   }
        // ]
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
