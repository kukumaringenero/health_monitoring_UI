import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

export default function LineChartAm({ data, id, ylabel, name }) {
  const { theme, setTheme } = useContext(themeContext);
  useEffect(() => {
    const root = am5.Root.new(id);
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "panY",
        pinchZoomX: true,
      })
    );
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
        tooltip: am5.Tooltip.new(root, {}),
        visible: true,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.5,
          fontSize: "2.25vmin",
          stroke:
            theme == "light"
              ? am5.color("rgb(0,0,0)")
              : am5.color("rgb(255,255,255)"),
          // strokeWidth: 2,
        }),
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
        }),
      })
    );
    //  add axis title
    yAxis.children.unshift(
      am5.Label.new(root, {
        text: ylabel || "",
        textAlign: "center",
        y: am5.p50,
        X: am5.p0,
        rotation: -90,
        fontSize: "2.25vmin",
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
        fontSize: "2.25vmin",
        fill:
          theme == "light"
            ? am5.color("rgb(0,0,0)")
            : am5.color("rgb(255,255,255)"),
      })
    );

    // remove grid line
    yAxis.get("renderer").labels.template.setAll({
      fontSize: "2.25vmin",
      fill:
        theme == "light"
          ? am5.color("rgb(0,0,0)")
          : am5.color("rgb(255,255,255)"),
    });
    xAxis.get("renderer").labels.template.setAll({
      rotation: 0,
      fontSize: "2.25vmin",
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
      // visible: false,
    });

    xAxis.get("renderer").grid.template.setAll({
      location: 0,
      strokeWidth: 0,
      visible: false,
      stroke:
        theme == "light"
          ? am5.color("rgb(0,0,0)")
          : am5.color("rgb(255,255,255)"),
    });

    // Add series
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        stroke: am5.color("rgb(0,0,0)"),
        stroke: am5.color("#C55A11"),
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "timestamp",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );
    console.log(series.get("tooltip").get("background"));
    series.strokes.template.setAll({
      strokeWidth: 2,
    });

    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(90),
        centerY: am5.percent(0),
        y: am5.percent(-8.5),
        fontSize: "2.25vmin",
        fill:
          theme == "light"
            ? am5.color("rgb(0,0,0)")
            : am5.color("rgb(255,255,255)"),
      })
    );
    legend.data.setAll(chart.series.values);
    legend.labels.template.setAll({
      fill:
        theme == "light"
          ? am5.color("rgb(0,0,0)")
          : am5.color("rgb(255,255,255)"),
    });
    // series.get("tooltip").get("background").set("fillOpacity", 0.5);
    // xAxis.get("tooltip").get("background").set("fill", "#000000");
    // xAxis.get("tooltip").set("textColor", "#FF0000");
    // series.get("tooltip").get("background").set("fillOpacity", 0.5);

    // console.log(obj);
    root.dateFormatter.setAll({
      dateFormat: "yyyy-MM-dd",
      dateFields: ["valueX"],
    });
    series.data.processor = am5.DataProcessor.new(root, {
      numericFields: ["value"],
      dateFields: ["timestamp"],
      dateFormat: "yyyy-MM-dd hh:mm:ss",
    });
    series.data.setAll(data);
    chart.appear(1000, 100);
    series.appear(1000);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div
      id={id}
      style={{
        width: "100%",
        height: "80%",
      }}></div>
  );
}
