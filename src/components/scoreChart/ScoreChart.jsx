/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './scoreChart.css';
import {
  Pie,
  PieChart,
  ResponsiveContainer,
} from 'recharts';

function ScoreChart({ userScore, isLoading, error }) {
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

  const data = [
    {
      fill: '#FF0000',
      value: userScore * 100,
    },
    {
      fill: 'transparent',
      value: 100,
    },
  ];
  const data02 = [
    {
      fill: '#FFFFFF',
      value: 100,
    },
  ];

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={80}
          outerRadius={90}
          startAngle={90}
          endAngle={450}
          stroke="none"
        />
        <Pie
          data={data02}
          dataKey="value"
          innerRadius={0}
          outerRadius={80}
          isAnimationActive={false}
        />
        <text
          x="20"
          y="30"
          textAnchor="start"
          fontSize={15}
          fontWeight="bold"
          fill="#20253A"
        >
          Score
        </text>

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={16}
          fill="#74798C"
        >
          <tspan x="50%" dy="-2em" fontWeight="bold" fill="#20253A">
            {`${Math.round(userScore * 100)}%`}
          </tspan>
          <tspan x="50%" dy="1.5em">
            de votre
          </tspan>
          <tspan x="50%" dy="1.5em">
            objectif
          </tspan>

        </text>
      </PieChart>

    </ResponsiveContainer>
  );
}

ScoreChart.propTypes = {
  userScore: PropTypes.number,
};
ScoreChart.defaultProps = {
  userScore: null,
};

export default ScoreChart;
