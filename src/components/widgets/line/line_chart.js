
import React, {PropTypes} from 'react';
import Highcharts from 'highcharts';
import {BASE_CHART_OPTIONS} from './../../../hocs/withHighcharts';


const createLineChart = ({
  domNode,
  onRender = () => {},
  onPointUpdate = () => {}
}) => {

  const options = {
    ...BASE_CHART_OPTIONS,

    // default pie options
    chart: {
      type: 'line',
      events: {   // todo - abstract
        render: onRender
      },
      renderTo: domNode
    },
    plotOptions: {
      line: {
        animation: false,
        allowPointSelect: true,
        stickyTracking: true
      },
      series: {
        animation: false,
        point: {
          events: {
            mouseOver: onPointUpdate,
          }
        },
        states: {
          select: { // required because can be selected programatically
            enabled: false
          }
        },
        allowPointSelect: false,
      },
    },

    // instance props
    series: [{
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    },
      // {
      // name: 'Manufacturing',
      // data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    // }, {
    //   name: 'Sales & Distribution',
    //   data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    // }, {
    //   name: 'Project Development',
    //   data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    // }, {
    //   name: 'Other',
    //   data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    // }
    ]
  };

  return new Highcharts.Chart(options);

};


createLineChart.propTypes = {
  domNode: PropTypes.node.isRequired,
  onRender: PropTypes.func
};

export default createLineChart;