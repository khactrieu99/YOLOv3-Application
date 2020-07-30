import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

// Components
import HomePage from './components/HomePage'
import Pretrained from './components/task1/Pretrained';
import Train from './components/task2/Train';

function App() {
  const style = {
    height: '100%',
    width: '100%'
  };

  return (
    <Router>
      <div style={style}>
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/pretrained">
              <Pretrained/>
          </Route>
          <Route path="/trained">
              <Train/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
