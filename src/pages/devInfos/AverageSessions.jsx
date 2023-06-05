import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../components/customHook/useFetch';
import AverageSessionsFactory from '../../factories/AverageSessionsFactory';

function AverageSessions() {
  const { id } = useParams();

  const { data: avgSessions } = useFetch(`http://localhost:3000/user/${id}/average-sessions`, AverageSessionsFactory, 'api');

  return (
    <div>
      <p>{JSON.stringify(avgSessions?.sessions)}</p>
    </div>
  );
}

export default AverageSessions;
