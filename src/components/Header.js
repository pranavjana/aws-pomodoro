import React from 'react';
import { Link } from 'react-router-dom';

function Header({ toggleDarkMode }) {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Calendar</Link></li>
          <li><Link to="/list">List</Link></li>
        </ul>
      </nav>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </header>
  );
}

export default Header;
