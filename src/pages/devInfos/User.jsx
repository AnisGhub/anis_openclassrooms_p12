import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../components/customHook/useFetch';
import UserFactory from '../../factories/UserFactory';

function User() {
  const { id } = useParams();

  const { data: user } = useFetch(`http://localhost:3000/user/${id}`, UserFactory, 'api');

  return (
    <div>
      <p>{ user?.userDetails }</p>
    </div>
  );
}

export default User;
