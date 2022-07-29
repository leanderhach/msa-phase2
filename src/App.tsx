import React from 'react';
import logo from './logo.svg';
import './App.css';
import CurrentConditions from "./CurrentConditions";

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
      </main>
    </div>
  );
}

export default App;
