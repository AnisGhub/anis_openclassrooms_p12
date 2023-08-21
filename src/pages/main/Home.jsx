/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import './home.css';
import ActivityChart from '../../components/activityChart/ActivityChart';
import AverageSessionsChart from '../../components/averageSessionsChart/AverageSessionsChart';
import PerformancesChart from '../../components/performancesChart/PerformancesChart';
import UserFactory from '../../factories/UserFactory';
import ScoreChart from '../../components/scoreChart/ScoreChart';
import UserCard from '../../components/userCard/UserCard';
import useFetch from '../../components/customHook/useFetch';

/**
 * Home component.
 * Renders the main content (user Profile) of the home page.
 * @returns {JSX.Element} The rendered component.
 */
export default function Home() {
  const userId = 18;

  // Fetch user details using the useFetch custom hook
  const url = process.env.REACT_APP_USE_MOCKED_DATA ? 'mockedDatas/userInfos.json' : `http://localhost:3000/user/${userId}`;
  const { data: userDetails, error, isLoading } = useFetch(url, UserFactory, 'api');

  return (
    <main className="main">
      <div>
        <p className="main__userName">
          Bonjour <span>{userDetails?.firstName ?? ''}</span>
        </p>
        <p className="main__text">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
      <div className="main__data">
        <div className="main__charts">
          <div className="main__userActivity">
            <ActivityChart userId={userId} />
          </div>
          <div className="main__userAverageSessions">
            <AverageSessionsChart userId={userId} />
          </div>
          <div className="main__userPerformances">
            <PerformancesChart userId={userId} />
          </div>
          <div className="main__userScore">
            <ScoreChart userScore={userDetails?.score} isLoading={isLoading} error={error} />
          </div>
        </div>
        <div className="main__userCard">
          <UserCard user={userDetails} isLoading={isLoading} error={error} />
        </div>
      </div>
    </main>
  );
}
