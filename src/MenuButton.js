import React from 'react';
import './MenuButton.css';

function MenuButton({ isOpen, onClick }) {
  return (
    <button className={`menu-button ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <span className="menu-icon"></span>
    </button>
  );
}

export default MenuButton;
