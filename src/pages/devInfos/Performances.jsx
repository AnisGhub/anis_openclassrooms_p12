import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../components/customHook/useFetch';
import PerformancesFactory from '../../factories/PerformancesFactory';

function Performances() {
  const { id } = useParams();

  const { data: perf } = useFetch(`http://localhost:3000/user/${id}/performance`, PerformancesFactory, 'api');

  return (
    <div>
      {perf && perf.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <p>
            kind:
            {' '}
            {item.kind}
          </p>
          <p>
            value:
            {' '}
            {item.value}
          </p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Performances;
