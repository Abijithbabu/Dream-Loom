import React, { useState, useEffect } from 'react';
import { string, number, bool } from 'prop-types';

const INITIAL_OFFSET = 25;
const circleConfig = {
  viewBox: '0 0 38 38',
  x: '19',
  y: '19',
  radio: '15.91549430918954'
};

const CircleProgressBarBase = ({
  className,
  strokeColor,
  strokeWidth,
  innerText,
  legendText,
  percentage = 10,
  trailStrokeWidth,
  trailStrokeColor,
  trailSpaced,
  speed
}) => {
  const [progressBar, setProgressBar] = useState(0);
  const [show, setShow] = useState(false)
  const emoji = percentage < 50 ? "&#x1F44D;" : percentage < 90 ?
    "&#128076;" : "&#129321;"
  const color = progressBar < 30 ? "#FFA500" : progressBar < 60 ? "#FFD700" : progressBar < 90 ?
    "#7FFF00" : "#008000"
  const updatePercentage = () => {
    setTimeout(() => {
      setProgressBar(progressBar + 1);
    }, 10);
  };

  useEffect(() => {
    if (percentage > 0) updatePercentage();
  }, [percentage]);

  useEffect(() => {
    if (progressBar < percentage) updatePercentage();
    if (progressBar === percentage) setShow(true)
  }, [progressBar]);

  return (
    <figure className={className}>
      <svg viewBox={circleConfig.viewBox}>
        <circle
          className="donut-ring"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={trailStrokeColor}
          strokeWidth={trailStrokeWidth}
          strokeDasharray={trailSpaced ? 1 : 0}
        />

        <circle
          className="donut-segment"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progressBar} ${100 - progressBar}`}
          strokeDashoffset={INITIAL_OFFSET}
        />

        <g className="chart-text">
          <text x="50%" y="50%" className="chart-number">
            {parseInt(progressBar / 10)}/10
          </text>
          {show && <text x="50%" y="50%" className="chart-label" dangerouslySetInnerHTML={{ __html: emoji }} />}
        </g>
      </svg>
      {show && (
        <figcaption className="figure-key">
          <ul
            className="figure-key-list"
            aria-hidden="true"
            role="presentation"
          >
            <li>
              <span className="shape-circle" style={{ backgroundColor: color }} />
              <span>{percentage < 30 ? "Good attempt" : percentage < 60 ? "Nice work" : percentage < 90 ?
                "Very good" : "Excellent"}</span>
              <br />
            </li>
          </ul>
          <p style={{ textAlign: 'center' }}>Congragulations, you are here since you did a good job. keep going !</p>
        </figcaption>
      )}
    </figure>
  );
};

CircleProgressBarBase.propTypes = {
  className: string.isRequired,
  strokeColor: string,
  strokeWidth: number,
  innerText: string,
  legendText: string,
  percentage: number,
  trailStrokeWidth: number,
  trailStrokeColor: string,
  trailSpaced: bool,
  speed: number
};

CircleProgressBarBase.defaultProps = {
  strokeColor: 'blueviolet',
  strokeWidth: 1,
  innerText: "&#x1F44D;",
  legendText: 'hi',
  percentage: 50,
  trailStrokeWidth: 1,
  trailStrokeColor: '#d2d3d4',
  trailSpaced: false,
  speed: 1
};

export default CircleProgressBarBase;