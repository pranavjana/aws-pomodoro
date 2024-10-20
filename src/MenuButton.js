import React from 'react';

const MenuButton = ({ isOpen, onClick }) => {
  return (
    <button className={`menu-button ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <span className="line line-1"></span>
      <span className="line line-2"></span>
      <span className="line line-3"></span>
    </button>
  );
};

export default MenuButton;
