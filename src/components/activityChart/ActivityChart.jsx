/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './activityChart.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import ActivityFactory from '../../factories/ActivityFactory';
import useFetch from '../customHook/useFetch';

/**
* CustomTooltip component for rendering custom tooltip content.
* @param {Object} props - Component props.
* @param {boolean} props.active - Indicates if the tooltip is active.
* @param {Array} props.payload - Tooltip data
* @returns {JSX.Element|null} - Rendered tooltip content or null if inactive.
*/
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

/**
 * ActivityChart component for displaying user activity.
 * @param {Object} props - Component props.
 * @param {number} props.userId - User ID.
 * @returns {JSX.Element} - ActivityChart JSX element.
 */
function ActivityChart({ userId }) {
  const url = process.env.REACT_APP_USE_MOCKED_DATA ? 'mockedDatas/activity.json' : `http://localhost:3000/user/${userId}/activity`;
  const { data: activities, error, isLoading } = useFetch(url, ActivityFactory, 'api');

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
      <BarChart
        data={activities.sessions}
        margin={{
          top: 40, right: 0, bottom: 10, left: 0,
        }}
      >
        <text
          x="10"
          y="20"
          fontSize="15"
          fontWeight="bold"
          textAnchor="start"
          fill="#333"
        >
          Activité quotidienne
        </text>
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
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
          allowDuplicatedCategory={false}
        />
        <YAxis yAxisId="calories" orientation="left" hide />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          align="right"
          iconType="circle"
          iconSize={10}
          wrapperStyle={{
            top: 5, left: 0, fontSize: '14px', fontWeight: '500',
          }}
        />
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
