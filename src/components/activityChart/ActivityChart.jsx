import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

function CustomTooltip({ active, payload }) {
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value} kg`}</p>
        <p className="label">{`${payload[1].value} kCal`}</p>
      </div>
    );
  }
  return null;
}

function ActivityChart(props) {
  const { userId } = props;
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
        const data = await response.json();
        setActivities(data.data.sessions);
        console.log(data.data.sessions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivities();
  }, [userId]);

  // Render your chart using the activities state

  return (
    <ResponsiveContainer>
      <BarChart
        data={activities}
        margin={{}}
      >
        <text x="10" y="20" fontSize="15" fontWeight="normal">Activité quotidienne</text>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickFormatter={(str) => parseInt(str.split('-')[2], 10)} />
        <YAxis dataKey="kilogram" tickLine={false} orientation="right" axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
        <YAxis dataKey="calories" yAxisId="calorie" hide />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" align="right" />
        <Bar name="Poids (kg)" dataKey="kilogram" radius={[10, 10, 0, 0]} barSize={7} fill="#282D30" />
        <Bar name="Calories brûlées (kCal)" dataKey="calories" radius={[10, 10, 0, 0]} barSize={7} yAxisId="calorie" fill="#E60000" />
      </BarChart>
    </ResponsiveContainer>

  );
}
ActivityChart.propTypes = {
  userId: PropTypes.number.isRequired,
};
CustomTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  payload: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })),
};
CustomTooltip.defaultProps = {
  payload: [],
};

export default ActivityChart;
