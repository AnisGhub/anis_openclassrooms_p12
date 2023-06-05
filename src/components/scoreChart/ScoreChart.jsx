/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './scoreChart.css';
import {
  RadialBar,
  RadialBarChart,
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

  return (
    <ResponsiveContainer>
      <RadialBarChart
        className="customRadial-chart"
        barSize={12}
        data={data}
        endAngle={450}
        innerRadius="100%"
        outerRadius="40%"
        startAngle={90}
      >
        <RadialBar
          dataKey="value"
        />
        <text
          x="10"
          y="20"
          textAnchor="start"
          fontSize={15}
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
          {`${Math.round(userScore * 100)}% de votre objectif`}
        </text>
      </RadialBarChart>
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
