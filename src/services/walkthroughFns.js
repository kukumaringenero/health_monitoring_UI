import { driver } from "driver.js";
// const driverObj = driver();

var steps = [
  {
    element: "#driver_server",
    popover: {
      title: "Step 1",
      className: "tour-tooltip",
      description: "This is the machine address where iCAP is installed.",
      position: "bottom",
    },
  },
  {
    element: "#driver_totalProject",
    popover: {
      title: "Step 2",
      className: "tour-tooltip",
      description: "This shows total number of projects created in iCAP.",
      position: "bottom",
    },
  },
  {
    element: "#driver_countConnector",
    popover: {
      title: "Step 3",
      className: "tour-tooltip",
      description:
        "This section shows the count of all connectors available on iCAP with lagging and off status.",
      position: "bottom",
    },
  },
  {
    element: "#driver_countTable",
    popover: {
      title: "Step 4",
      className: "tour-tooltip",
      description:
        "This section shows the count of all tables available on iCAP with lagging and off status.",
      position: "bottom",
    },
  },
  {
    element: "#driver_countBlc",
    popover: {
      title: "Step 5",
      className: "tour-tooltip",
      description:
        "This section shows the count of all BLCs available on iCAP with lagging and off status.",
      position: "bottom",
    },
  },
  {
    element: "#driver_countLbt",
    popover: {
      title: "Step 6",
      className: "tour-tooltip",
      description:
        "This section shows the count of all LBTs available on iCAP with lagging and off status.",
      position: "bottom",
    },
  },
  {
    element: "#driver_totalUser",
    popover: {
      title: "Step 7",
      className: "tour-tooltip",
      description: "This shows total number of users created in iCAP.",
      position: "bottom",
    },
  },
  {
    element: "#driver_ramChart",
    popover: {
      title: "Step 8",
      className: "tour-tooltip",
      description:
        "This cahrt shows the RAM and CPU consumption of machine where iCAP is installed.",
      position: "bottom",
    },
  },
  {
    element: "#driver_sqlChart",
    popover: {
      title: "Step 9",
      className: "tour-tooltip",
      description: "This shows total number of users created in iCAP.",
      position: "bottom",
    },
  },
  {
    element: "#driver_table",
    popover: {
      title: "Step 10",
      className: "tour-tooltip",
      description:
        "This table shows the detailed project wise analysis for each component shown above along with their lagging and turned off status. ",
      position: "top",
    },
  },

  {
    element: "#last_updated_time",
    popover: {
      title: "Step 11",
      className: "tour-tooltip",
      description:
        "This area showcase the last run time for the data shown on the dashboard.",
      position: "bottom",
    },
  },

  {
    element: "#project_dropdown",
    popover: {
      className: "tour-tooltip",
      title: "Step 12",
      description:
        "use this dropdown to get the detail of a particular project.",
      position: "bottom",
    },
  },
  {
    element: "#driver_theme",
    popover: {
      className: "tour-tooltip",
      title: "Step 13",
      description: "Use this to turn on/off dark mode.",
      position: "bottom",
    },
  },
  {
    element: "#driver_configuration",
    popover: {
      className: "tour-tooltip",
      title: "Step 14",
      description: "Use this button to jump to project configuration page.",
      position: "bottom",
    },
  },
];
const driverObj = driver({
  showProgress: true,
  steps: steps,
});

export default driverObj;
