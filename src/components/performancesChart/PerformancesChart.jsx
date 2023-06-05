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

function PerformancesChart({ userId }) {
  const { data: performances, error, isLoading } = useFetch(`http://localhost:3000/user/${userId}/performance`, PerformancesFactory, 'api');

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
      >
        <PolarGrid radialLines={false} />
        <PolarAngleAxis
          axisLine={false}
          dataKey="kind"
          stroke="white"
          dy={4}
          tickLine={false}
          tick={{
            fontSize: 10,
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