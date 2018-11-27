import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DinnersPage from './containers/DinnersPage';
import GuestsPage from './containers/GuestsPage';
import EditGuestPage from './containers/EditGuestPage';
import HistoryPage from './containers/HistoryPage';
import Header from './components/Header';

function App({ signOut, currentUser }) {
  return (
    <Router>
      <div>
        <Header signOut={signOut} currentUserLabel={currentUser.emails[0].address} />
        <Route path="/" exact component={DinnersPage} />
        <Route path="/dinners/" component={DinnersPage} />
        <Route path="/guests/" exact component={GuestsPage} />
        <Route path="/guests/:_id" component={EditGuestPage} />
        <Route path="/history/" component={HistoryPage} />
      </div>
    </Router>
  );
}

export default withTracker(({}) => {
  const currentUser = Meteor.user();
  const signOut = Meteor.logout;
  
  return {
    currentUser,
    signOut
  }
})(App);