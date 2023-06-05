/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './activityChart.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import ActivityFactory from '../../factories/ActivityFactory';
import useFetch from '../customHook/useFetch';

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip--activity">
        <p className="label">{`${payload[0].value} kg`}</p>
        <p className="label">{`${payload[1].value} kCal`}</p>
      </div>
    );
  }
  return null;
}

function ActivityChart({ userId }) {
  const { data: activities, error, isLoading } = useFetch(`http://localhost:3000/user/${userId}/activity`, ActivityFactory, 'api');

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
      <BarChart data={activities.sessions} margin={{}}>
        <text x="10" y="20" fontSize="15" fontWeight="normal">
          Activité quotidienne
        </text>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickFormatter={(str) => parseInt(str.split('-')[2], 10)}
        />
        <YAxis
          yAxisId="weight"
          dataKey="kilogram"
          tickLine={false}
          orientation="right"
          axisLine={false}
          type="number"
          domain={['dataMin - 1', 'dataMax + 1']}
          tickFormatter={(tick) => Math.floor(tick)}
        />
        <YAxis yAxisId="calories" orientation="left" hide />
        <Tooltip content={CustomTooltip} />
        <Legend verticalAlign="top" align="right" />
        <Bar
          yAxisId="weight"
          name="Poids (kg)"
          dataKey="kilogram"
          radius={[10, 10, 0, 0]}
          barSize={7}
          fill="#282D30"
        />
        <Bar
          yAxisId="calories"
          name="Calories brûlées (kCal)"
          dataKey="calories"
          radius={[10, 10, 0, 0]}
          barSize={7}
          fill="#E60000"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

ActivityChart.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ActivityChart;
