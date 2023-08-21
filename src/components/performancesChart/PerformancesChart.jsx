/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './performancesChart.css';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import PerformancesFactory from '../../factories/PerformancesFactory';
import useFetch from '../customHook/useFetch';

/**
  PerformancesChart component.
  Displays a radar chart showing performance values for a user.
  @component
  @param {Object} props - The component props.
  @param {number} props.userId - The ID of the user.
  @returns {JSX.Element} PerformancesChart component JSX.
*/
function PerformancesChart({ userId }) {
  const url = process.env.REACT_APP_USE_MOCKED_DATA ? 'mockedDatas/performance.json' : `http://localhost:3000/user/${userId}/performance`;
  const { data: performances, error, isLoading } = useFetch(url, PerformancesFactory, 'api');

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
      <RadarChart
        data={performances}
        startAngle={30}
        endAngle={-330}
        outerRadius="75%"
      >
        <PolarGrid radialLines={false} />
        <PolarAngleAxis
          dataKey="kind"
          stroke="white"
          tickLine={false}
          tick={{
            fontSize: 11,
            fontWeight: 500,
          }}
        />
        <Radar
          dataKey="value"
          stroke="#ff0000"
          fill="#ff0000"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

PerformancesChart.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default PerformancesChart;
