import React from 'react';

const Header = function(props) {
  return (
    <header>
        <div className="title">
          <h1 className="underline">Mastermind</h1>
        </div>
        <ul className="menu">
          <li
            className="btn btn-header"
            onClick={props.startNewGame}
            >New game
          </li>
          <li
            className="btn btn-header"
            onClick={props.handleInstructionsClick}
          >Instructions</li>
        </ul>
      </header>
  )
}

export default Header;