import React from 'react';
import './header.css';
import logo from './logosportsee.png';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img className="logo__img" src={logo} alt="" />
      </div>
      <nav className="navigation">
        <ul className="menu">
          <li className="menu__link">
            <button type="button">Accueil</button>
          </li>
          <li className="menu__link">
            <button type="button">Profil</button>
          </li>
          <li className="menu__link">
            <button type="button">Réglage</button>
          </li>
          <li className="menu__link">
            <button type="button">Communauté</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
