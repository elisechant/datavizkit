
import React from 'react';
import merge from 'lodash/merge';

import PureComponentWithStaticProps from './../../classes/pureComponentWithStaticProps';
import {mapHighcontrastFill} from './../../utils/highcontrastPatterns';
import {
  createCartesianCustomLegendData,
  mapNullDataLayerToX,
} from './../../utils/chartOptionsHelpers';


const BASE_COLUMN_CHARTCONFIG = {
  chart: {
    type: 'column',
    height: 280,
  },
  title: {
    text: ''
  },
  subtitle: {
    text: '',
  },
  plotOptions: {
    column: {},
    series: {
      stickyTracking: false,
      animation: false,
      point: {},
      states: {
        hover: {
          brightness: -.2,
        },
        select: { // required because it can be selected programatically
          enabled: false
        }
      },
      allowPointSelect: false
    },
  },
  tooltip: {
    enabled: false,
  },
  yAxis: {
    title: {
      text: null
    },
  },
  xAxis: {
    crosshair: true,
  }
};


const withColumn = Composed => {

  return class extends PureComponentWithStaticProps {

    constructor(props) {
      super(props);
      this._chart = null;
      this._baseChartConfig = null;

      const colorProps = props.getColorProps(props.widgetIndex, props.cid);

      this.colorset = colorProps.colorset;
      this.highcontrastPatternIds = colorProps.highcontrastPatternIds;
      this.HighcontrastPatterns = colorProps.HighcontrastPatterns;
    }

    // create
    componentDidMount() {
      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);
      // draw chart for first time
      this.props.create(config);
    }

    // update
    componentWillUpdate(nextProps) {
      if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {

        const config = this.makeInstanceConfig(this._baseChartConfig, nextProps);
        // redraw chart
        this.props.redraw(config);
      }
    }

    // destroy
    componentWillUnmount() {
      this.props.destroy();
      this._chart = null;
      this._baseChartConfig = null;
      this.static = null;
    }

    createBaseConfig() {

      const setStatic = this.setStatic;

      // only create it once
      if (this._baseChartConfig) {
        return this._baseChartConfig;
      }

      const config = merge({}, BASE_COLUMN_CHARTCONFIG);

      config.colors  = this.colorset;
      config.chart.renderTo = this._chart;

      if (this.props.chartDescription) {
        config.chart.description = this.props.chartDescription;
      }

      // bind events to config
      config.chart.events = {
        render: function() {

          this.xAxis = mapNullDataLayerToX(this.xAxis, this.series, setStatic);

          setStatic({'customLegendData': createCartesianCustomLegendData(this.series)});

          // todo - extract
          // select nothing then..
          this.series.forEach(s => {
            s.data.filter((d,idx,arr) => {
              return idx === arr.length - 1;
            }).forEach(d => {
              d.setState('');
            });
          });

          // in 400ms "select" the last column
          this.series.forEach(s => {
            s.data.filter((d,idx,arr) => {
              return idx === arr.length - 1;
            }).forEach(d => {
              d.setState('hover');
            });
          });

        },
      };

      config.plotOptions.series.point.events = {
        mouseOver: function(e) {
          setStatic({'customLegendData': createCartesianCustomLegendData(this.series.chart.series, this.index)});

          // todo - extract
          // todo - make this data.selected = true rather than using Highcharts state
          this.series.chart.series.forEach(s => {
            s.data.filter((d,idx) => {
              return this.index === idx;
            }).forEach(d => {
              d.setState && d.setState('hover');
            });
          });
        },
        mouseOut: function() {
          // todo - extract
          this.series.chart.series.forEach(s => {
            s.data.forEach(d => {
              d.setState && d.setState('');
            });
          });
        }
      };

      this._baseChartConfig = config;

      return config;
    }

    makeInstanceConfig(config, passedProps) {
      const {series, xAxis, yAxis} = passedProps;

      let instanceConfig = merge({}, config, {
        xAxis,
        series,
        yAxis,
      });

      instanceConfig = mapHighcontrastFill(instanceConfig, passedProps.displayHighContrast, this.highcontrastPatternIds);

      return instanceConfig;
    }

    render() {
      const {HighcontrastPatterns} = this;

      const customLegendData = this.getStatic('customLegendData');
      const {displayHighContrast} = this.props;

      return (
        <div>
          <HighcontrastPatterns />
          <Composed {...this.props}
                    customLegendData={customLegendData} displayHighContrast={displayHighContrast}>
            <div ref={el => this._chart = el} />
          </Composed>
        </div>
      );
    }
  }

};

export default withColumn;
