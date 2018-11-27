import React from 'react';
import { Link } from "react-router-dom";

function Header({ currentUserLabel, signOut }) {
  return (
    <nav className="header">
    <div className="l-retainer">
      {currentUserLabel
        ? <div>
            <div className="header__session">
              <p>
                <span className="header__session__current-user-label">{currentUserLabel}</span>
                <button onClick={signOut} className="header__session__sign-out-btn">Sign out</button>
              </p>
            </div>
            <ul className="header__links">
              <li><Link to="/dinners/"><p>Dinners</p></Link></li>
              <li><Link to="/guests/"><p>Guests</p></Link></li>
              <li><Link to="/history/"><p>History</p></Link></li>
            </ul>
          </div>
        : <h1>Hallah</h1>}
    </div>
  </nav>
  );
}

export default Header;