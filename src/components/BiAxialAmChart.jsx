import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

export default function BiAxialAmChart({ data1, data2 }) {
  const { theme, setTheme } = useContext(themeContext);
  useEffect(() => {
    const root = am5.Root.new("biaxialLineChart");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        pinchZoomX: false,
      })
    );
    chart.get("colors").set("step", 2);

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    cursor.lineX.set("visible", false);

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        baseInterval: {
          timeUnit: "hour",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.5,
          stroke:
            theme == "light"
              ? am5.color("rgb(0,0,0)")
              : am5.color("rgb(255,255,255)"),
          fill:
            theme == "light"
              ? am5.color("rgb(0,0,0)")
              : am5.color("rgb(255,255,255)"),
        }),
        tooltip: am5.Tooltip.new(root, {}),

        // strokeWidth: 2,
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.5,
          stroke:
            theme == "light"
              ? am5.color("rgb(0,0,0)")
              : am5.color("rgb(255,255,255)"),
          fill:
            theme == "light"
              ? am5.color("rgb(0,0,0)")
              : am5.color("rgb(255,255,255)"),
        }),
      })
    );
    let yAxis1 = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.5,
          opposite: true,
          stroke:
            theme == "light"
              ? am5.color("rgb(0,0,0)")
              : am5.color("rgb(255,255,255)"),
          fill:
            theme == "light"
              ? am5.color("rgb(0,0,0)")
              : am5.color("rgb(255,255,255)"),
          // strokeWidth: 2,
        }),
      })
    );
    yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
    yAxis1.set("syncWithAxis", chart.yAxes.getIndex(0));

    // remove grid line
    yAxis.get("renderer").labels.template.setAll({
      fontSize: "2.5vmin",
      fill:
        theme == "light"
          ? am5.color("rgb(0,0,0)")
          : am5.color("rgb(255,255,255)"),
      stroke:
        theme == "light"
          ? am5.color("rgb(0,0,0)")
          : am5.color("rgb(255,255,255)"),
    });
    yAxis1.get("renderer").labels.template.setAll({
      fontSize: "2.5vmin",
      stroke:
        theme == "light"
          ? am5.color("rgb(0,0,0)")
          : am5.color("rgb(255,255,255)"),
      fill:
        theme == "light"
          ? am5.color("rgb(0,0,0)")
          : am5.color("rgb(255,255,255)"),
    });
    xAxis.get("renderer").labels.template.setAll({
      rotation: 0,
      fontSize: "2.5vmin",
      strokeWidth: 0,
      stroke:
        theme == "light"
          ? am5.color("rgb(0,0,0)")
          : am5.color("rgb(255,255,255)"),
      fill:
        theme == "light"
          ? am5.color("rgb(0,0,0)")
          : am5.color("rgb(255,255,255)"),
    });

    // remove grid
    yAxis.get("renderer").grid.template.setAll({
      strokeWidth: 0,
      stroke:
        theme == "light"
          ? am5.color("rgb(0,0,0)")
          : am5.color("rgb(255,255,255)"),
      fill:
        theme == "light"
          ? am5.color("rgb(0,0,0)")
          : am5.color("rgb(255,255,255)"),
      //   visible: false,
    });

    xAxis.get("renderer").grid.template.setAll({
      location: 0,
      strokeWidth: 0,
      visible: false,
    });

    // Add series
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Ram (GB)",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "Ram",
        valueXField: "timestamp",
        tooltip: am5.Tooltip.new(root, {
          labelText: "Ram : {valueY} GB",
          pointerOrientation: "horizontal",
          stroke:
            theme == "light"
              ? am5.color("rgb(0,0,0)")
              : am5.color("rgb(255,255,255)"),
        }),
        visible: true,
      })
    );

    let series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Cpu (%)",
        xAxis: xAxis,
        yAxis: yAxis1,
        valueYField: "Cpu",
        valueXField: "timestamp",
        stroke: "#40864B",
        tooltip: am5.Tooltip.new(root, {
          labelText: "Cpu: {valueY} %",
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 2,
    });

    series.get("tooltip").get("background").set("fillOpacity", 0.5);
    series.get("tooltip").get("background").set("fill", series.get("fill"));
    series2.get("tooltip").get("background").set("fill", series2.get("fill"));

    // yAxis.get("renderer").grid.template.set("strokeOpacity", 0.05);
    // // yAxis.get("renderer").grid.template.set("fill", series.get("fill"));
    // console.log(series.get("fill"));
    // console.log(series2.get("fill"));
    // yAxis1.get("renderer").grid.template.set("strokeOpacity", 0.05);
    // yAxis1.get("renderer").grid.template.set("fill", series2.get("fill"));

    // legends
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(76),
        centerY: am5.percent(0),
        y: am5.percent(-8.5),
        fontSize: "2.5vmin",
        fill:
          theme == "light"
            ? am5.color("rgb(0,0,0)")
            : am5.color("rgb(255,255,255)"),
        stroke:
          theme == "light"
            ? am5.color("rgb(0,0,0)")
            : am5.color("rgb(255,255,255)"),

        // strokeWidth: 2,
      })
    );
    legend.data.setAll(chart.series.values);
    legend.labels.template.setAll({
      fill:
        theme == "light"
          ? am5.color("rgb(0,0,0)")
          : am5.color("rgb(255,255,255)"),
    });

    // title
    yAxis.children.unshift(
      am5.Label.new(root, {
        text: "Ram (GB)",
        textAlign: "center",
        y: am5.p50,
        rotation: -90,
        fontSize: "2.5vmin",
        fill:
          theme == "light"
            ? am5.color("rgb(0,0,0)")
            : am5.color("rgb(255,255,255)"),
      })
    );

    yAxis1.children.push(
      am5.Label.new(root, {
        text: "Cpu (%)",
        textAlign: "center",
        y: am5.p50,
        rotation: -90,
        fontSize: "2.5vmin",
        fill:
          theme == "light"
            ? am5.color("rgb(0,0,0)")
            : am5.color("rgb(255,255,255)"),
      })
    );

    xAxis.children.push(
      am5.Label.new(root, {
        text: "Timestamp",
        textAlign: "center",
        x: am5.p50,
        fontSize: "2.5vmin",
        fill:
          theme == "light"
            ? am5.color("rgb(0,0,0)")
            : am5.color("rgb(255,255,255)"),
      })
    );
    series.data.processor = am5.DataProcessor.new(root, {
      numericFields: ["value"],
      dateFields: ["timestamp"],
      dateFormat: "yyyy-MM-dd hh:mm:ss",
    });
    series2.data.processor = am5.DataProcessor.new(root, {
      numericFields: ["value"],
      dateFields: ["timestamp"],
      dateFormat: "yyyy-MM-dd hh:mm:ss",
    });
    series.data.setAll(data1);
    series2.data.setAll(data2);
    series.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data1, data2]);

  return (
    <div
      id="biaxialLineChart"
      style={{
        width: "100%",
        height: "80%",
      }}></div>
  );
}
