import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../components/customHook/useFetch';
import ActivityFactory from '../../factories/ActivityFactory';

function Activity() {
  const { id } = useParams();

  const { data: activity } = useFetch(`http://localhost:3000/user/${id}/activity`, ActivityFactory, 'api');

  return (
    <div>
      <p>{JSON.stringify(activity?.sessions)}</p>
    </div>
  );
}

export default Activity;
