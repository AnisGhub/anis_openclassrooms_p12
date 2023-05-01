import React, { useEffect, useState } from 'react';
import './home.css';
// import ActivityChart from "./components/ActivityChart";
// import TimeSessionsChart from "./components/TimeSessionsChart";
// import RadarChart from "./components/RadarChart";
// import ScoreChart from "./components/ScoreChart";
// import InfoCard from "./components/InfoCard";

export default function Home() {
  // as a prototype, this website need the userID to be set manually
  const userId = 18;

  const [infoUser, setInfoUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/mockedDatas/data.json`);
        const data = await response.json();
        const userInfo = data.USER_MAIN_DATA.find((user) => user.id === 18);
        setInfoUser(userInfo);
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
          Bonjour
          <span>{infoUser?.userInfos?.firstName}</span>
        </p>
        <p className="main__text">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
    </main>
  );
}
