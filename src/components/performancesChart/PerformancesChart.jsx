/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './performancesChart.css';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import PerformanceFactory from '../../factories/PerformanceFactory';

function PerformancesChart({ userId }) {
  const [performances, setPerformances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchPerformances = async () => {
        try {
          const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
          const data = await response.json();
          const performanceInstances = data.data.data.map(
            (performanceData) => PerformanceFactory.create(performanceData, 'api'),
          );
          setPerformances(performanceInstances);
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          setError(`Une erreur est survenue : ${e.message}`);
        }
      };
      fetchPerformances();
    }, 2000);

    return () => clearTimeout(timer);
  }, [userId]);

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
