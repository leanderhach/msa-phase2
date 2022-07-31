import React from 'react';
import logo from './logo.svg';
import './App.css';
import CurrentConditions from "./CurrentConditions";
import DayOverview from './DayOverview';
import WeekOverview from "./WeekOverview";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

function App() {
  return (
    <div className="App">
      <header>
          <div className="container"></div>
      </header>
      <main>
          <CurrentConditions></CurrentConditions>
          <DayOverview></DayOverview>
          <WeekOverview></WeekOverview>
      </main>
    </div>
  );
}

export default App;
