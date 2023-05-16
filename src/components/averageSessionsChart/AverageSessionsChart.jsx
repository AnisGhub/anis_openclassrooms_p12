/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
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
    <ResponsiveContainer className="timeSession">
      <LineChart
        data={sessions}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        background={{ fill: 'red' }}
      >
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
