
import React from 'react';
import PropTypes from 'prop-types';

import LineChart from './lineChart';

import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './lineWidget.css';


const LineWidget = ({
  infoText,
  title,
  dateLastUpdated,
  viewport,
  series, xAxis, yAxis,
  displayHighContrast,
  chartDescription,
  widgetIndex = 0,
}) => {
  return (
    <article role="article" className="D_widget">
      <header>
        {infoText && <div className="D_SW_infoContainer">{infoText && <Tooltip text={infoText} viewport={viewport} />}</div>}
        <h1 className="highcharts-title">{title}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(dateLastUpdated)}>{dateFormats.dayMonthYear(dateLastUpdated)}</time></span>
      </header>
      <section>
        <LineChart series={series}
                     xAxis={xAxis}
                     yAxis={yAxis}
	                   chartDescription={infoText || chartDescription}
	                   widgetIndex={widgetIndex}
	                   displayHighContrast={displayHighContrast} />
      </section>
    </article>
  )
};

if (__DEV__) {
  LineWidget.propTypes = {
    widgetIndex: PropTypes.number,
    infoText: PropTypes.string,
    chartDescription: PropTypes.string,
  }
}

export default LineWidget;
