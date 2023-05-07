/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './averageSessionsChart.css';
import {
  ComposedChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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

function AverageSessionsChart({ userId }) {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchSessions = async () => {
        try {
          const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);
          const data = await response.json();
          setSessions(data.data.sessions);
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          setError(`Une erreur est survenue : ${e.message}`);
        }
      };
      fetchSessions();
    }, 2000);

    return () => clearTimeout(timer);
  }, [userId]);

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
      <ComposedChart
        data={sessions}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis dataKey="day" tickFormatter={formatDay} stroke="white" tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="sessionLength" stroke="white" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

AverageSessionsChart.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default AverageSessionsChart;
