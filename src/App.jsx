import React, { Component, useState, useEffect } from 'react';
import './scss/App.scss';
import Router from './components/functional/Router';

const App = () => (
  <React.Fragment>
    <div className="rfu-navbar">
      <img
        alt="England Rugby"
        src="https://www.englandrugby.com/b60e6e31-e1cd-4d88-a268-4b6e76fb6593/dxresources/7de5/7de5d9c8-5755-4168-bccd-57e1513ed587.svg"
      />
      <div className="rfu-navbar-navigation">
        <a>Home</a>
        <a>News</a>
        <a>England</a>
        <a>Fixtures &amp; Results</a>
        <a>Participation</a>
        <a>Governance</a>
      </div>
    </div>
    <div className="rfu-container">
      <div className="rfu-sidebar" />
      <div className="rfu-content">
        <Router />
      </div>
    </div>
  </React.Fragment>
);

export default App;
