import Highcharts from "highcharts";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

export const getChartOptions = (data: number[][]): Highcharts.Options => {
  return {
    yAxis: [
      {
        opposite: false,
        labels: {
          formatter: function (): string {
            return formatCurrency(this.value);
          },
        },
        crosshair: {
          zIndex: 5,
          width: 1,
          dashStyle: "Dash",
        },

        tickAmount: 12,
        showFirstLabel: false,
        zIndex: 2,
        plotLines: [
          {
            color: "grey",
            width: 1,
            value: data[0][1],
            dashStyle: "Dash",
            label: {
              useHTML: true,
              align: "left",
              text: formatCurrency(data[0][1]),
              y: 2,
              style: {
                backgroundColor: "rgb(17 24 39)",
                padding: "5px",
                color: "white",
                fontSize: "10px",
              },
            },
            zIndex: 4,
          },
        ],
      },
    ],
    xAxis: [
      {
        crosshair: {
          zIndex: 5,
          width: 1,
          dashStyle: "Dash",
        },
      },
    ],
    tooltip: {
      style: {
        fontSize: "10px",
        fontWeight: "bold",
      },
      split: true,
      shape: "square",

      useHTML: true,
      //TODO make tooltip better look
      formatter: function () {
        // The first returned item is the header, subsequent items are the
        // points
        return ["<div>" + formatDate(this.x) + "</div>"].concat(
          this.points!.map(
            (point) => point.series.name + ": " + formatCurrency(point.y) + "€"
          )
        );
      },
      borderRadius: 10,
      borderColor: "none",
      shadow: true,
      padding: 20,
      valueDecimals: 2,
      backgroundColor: "white",
      distance: 30,
    },

    plotOptions: {
      series: {
        zIndex: 5,
        showInNavigator: true,
        gapSize: 6,
        states: {
          hover: {
            enabled: true,
            lineWidth: 2,
          },
        },
        marker: {
          symbol: "circle",
          radius: 2,
          lineColor: "transparent",
          enabled: false,
          enabledThreshold: 1,
        },
      },
    },
    chart: {
      style: {
        padding: "0",
        margin: "0",
      },
    },
    credits: {
      enabled: false,
    },
    //ranges
    rangeSelector: {
      enabled: false,
    },
    //under the chart
    navigator: {
      adaptToUpdatedData: true,
      maskFill: "rgb(222,226, 255, 0.5)",
      handles: {
        backgroundColor: "rgb(17 24 39)",
        borderColor: "white",
        width: 10,
        lineWidth: 1,
      },
      series: {
        type: "areaspline",
        fillOpacity: 0.05,
        lineWidth: 1,
        marker: {
          enabled: false,
        },
        fillColor: "rgb(222,226, 252)",
        color: "rgb(45,77,255)",
      },
    },
    //scrollbar for the navigator
    scrollbar: {
      enabled: false,
    },
    //areaspline series
    series: [
      {
        name: "Price",
        type: "areaspline",
        color: "rgb(35,191,114)",
        data: data,
        threshold: data[0][1],
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgb(255,255,255)"],
            [1, "rgba(35,191,114,0.5)"],
          ],
        },
        negativeColor: "rgb(252,6,6)",
        negativeFillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgb(255,255,255)"],
            [1, "rgba(252,6,6,0.5)"],
          ],
        },
      },
    ],
  };
};
