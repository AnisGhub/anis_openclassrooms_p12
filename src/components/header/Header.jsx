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
            <a href="">Accueil</a>
          </li>
          <li className="menu__link">
            <a href="">Profil</a>
          </li>
          <li className="menu__link">
            <a href="">Réglage</a>
          </li>
          <li className="menu__link">
            <a href="">Communauté</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
