
import React from 'react';
import PropTypes from 'prop-types';

import HeroChart from './heroChart';
import Tooltip from './../tooltip/tooltip';
import {dateFormats} from './../../utils/displayFormats';

import './heroWidget.css';


const HeroWidget = ({
  infoText,
  title,
  dateLastUpdated,
  viewport,
  series, xAxis, yAxis,
  displayHighContrast,
  chartDescription,
}) => {

  return (
    <article role="article" className="D_widget">
      <header>
        {infoText && <div className="D_SW_infoContainer"><Tooltip text={infoText} viewport={viewport} /></div>}
        <h1 className="highcharts-title">{title}</h1>
        <span className="highcharts-subtitle">Last updated at <time dateTime={dateFormats.dateTime(dateLastUpdated)}>{dateFormats.dayMonthYear(dateLastUpdated)}</time></span>
      </header>
      <section>
        <HeroChart series={series}
                     xAxis={xAxis}
                     yAxis={yAxis}
	                   chartDescription={infoText || chartDescription}
	                   displayHighContrast={displayHighContrast} />
      </section>
    </article>
  )
};

if (__DEV__) {
  HeroWidget.propTypes = {
    widgetIndex: PropTypes.number,
    infoText: PropTypes.string,
    chartDescription: PropTypes.string,
  }
}
export default HeroWidget;
