/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import './home.css';
import ActivityChart from '../../components/activityChart/ActivityChart';
// import ActivityChart from "./components/ActivityChart";
// import TimeSessionsChart from "./components/TimeSessionsChart";
// import RadarChart from "./components/RadarChart";
// import ScoreChart from "./components/ScoreChart";
// import InfoCard from "./components/InfoCard";

export default function Home() {
  const userId = 18;
  const [infoUser, setInfoUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        const data = await response.json();
        setInfoUser(data.data.userInfos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <main className="main">
      <div>
        <p className="main__profileName">
          Bonjour <span>{infoUser?.firstName ?? ''}</span>
        </p>
        <p className="main__text">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
      <div className="main__userActivity">
        <ActivityChart userId={userId} />
      </div>
    </main>
  );
}
