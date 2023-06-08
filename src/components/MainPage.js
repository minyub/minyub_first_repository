import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import background from './background.jpg';

const MainPage = () => {
  return (
    <div className="main-page">

      <div className="banner-section">
        <h1 className="banner-title">HOME</h1>
        <h1 className="banner-title">
          <Link to="/subwaylists">SUBWAYS</Link>
        </h1>
      </div>

      <div className="photo-section">
        <img src={background} alt="Background" className="background-image" style={{ width: '100%', height: '100%' }} />
      </div>
      
      <div className="photo-section">
        <img src={background} alt="Background" className="background-image" />
      </div>

    </div>
  );
};

export default MainPage;