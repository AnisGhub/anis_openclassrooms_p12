/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './averageSessionsChart.css';
import {
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Rectangle,
} from 'recharts';
import AverageSessionsFactory from '../../factories/AverageSessionsFactory';
import useFetch from '../customHook/useFetch';

/**
 * Custom tooltip component for the average sessions chart tooltip content.
 * Displays the session duration in minutes.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.active - Indicates if the tooltip is active.
 * @param {Array} props.payload - Tooltip data.
 * @returns {JSX.Element|null} The tooltip content or null if inactive.
 */
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip--averageSesions">
        <p>{`${payload[0].value} minutes`}</p>
      </div>
    );
  }
  return null;
}

/**
 * Custom cursor component for the average sessions chart tooltip cursor.
 * Displays a semi-transparent rectangle over the chart line.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.points - Array of data points.
 * @param {number} props.width - Width of the cursor.
 * @param {number} props.height - Height of the cursor.
 * @returns {JSX.Element} The cursor element.
 */
function CustomCursor({ points, width, height }) {
  const { x } = points[0];
  return (
    <Rectangle
      x={x}
      y={0}
      width={width}
      height={height}
      opacity={0.1}
    />
  );
}

/**
 * Average sessions chart component.
 * Displays a line chart of average session durations.
 *
 * @param {Object} props - The component props.
 * @param {number} props.userId - The user ID.
 * @returns {JSX.Element} The average sessions chart.
 */
function AverageSessionsChart({ userId }) {
  const url = process.env.REACT_APP_USE_MOCKED_DATA ? 'mockedDatas/average-sessions.json' : `http://localhost:3000/user/${userId}/average-sessions`;
  const { data: averageSessions, error, isLoading } = useFetch(url, AverageSessionsFactory, 'api');

  /**
   * Format the day of the week.
   *
   * @param {number} day - The day of the week.
   * @returns {string} The formatted day.
   * @description This function is invoked for each value on the X-axis to format the day labels.
   */
  const formatDay = (day) => {
    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    return daysOfWeek[day - 1];
  };

  if (isLoading) {
    return <div>chargement en cours...</div>;
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  return (
    <ResponsiveContainer>
      <LineChart
        data={averageSessions.sessions}
        margin={{
          top: 40,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        background={{ fill: 'red' }}
      >
        <text x="15" y="30" fontSize="15" fontWeight="bold" opacity={0.5} fill="#FFFFFF">
          <tspan x="20" dy="0">Durée moyenne des</tspan>
          <tspan x="20" dy="20">sessions</tspan>
        </text>
        <defs>
          <linearGradient id="colorGradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="1.19%" stopColor="#FFFFFF" stopOpacity={1} />
            <stop offset="81.27%" stopColor="rgba(255, 255, 255, 0.403191)" stopOpacity={1} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="day"
          tickFormatter={formatDay}
          stroke="white"
          tickLine={false}
          tick={{ opacity: 0.6 }}
          axisLine={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={<CustomCursor width={500} height={500} />}
        />
        <Line
          type="basis"
          dataKey="sessionLength"
          stroke="url(#colorGradient)"
          strokeWidth={3}
          activeDot={{ r: 4 }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

AverageSessionsChart.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default AverageSessionsChart;
