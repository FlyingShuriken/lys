// import { useState, useEffect, useRef } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import { firebase } from './config.json'
import { initializeApp } from 'firebase/app';

initializeApp(firebase)

const App = () => {

  return (
    <Router>
      <div className="lys-App">
        <Route>
          <Switch path="/">
            <Home />
          </Switch>
        </Route>
      </div>
    </Router>
  );
};

export default App;
