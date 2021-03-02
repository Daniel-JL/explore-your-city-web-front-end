import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';

import Header from './components/layout/Header';
import Vision from './components/views/vision';
import Register from './components/views/register';
import Contribution from './components/views/contribution';

const App = () => (
    <div>
      <Header />
      <Switch>
        <Route exact path="/vision" children={<Vision />} />
        <Route exact path="/">
          <Redirect to="/vision" />
        </Route>
        <Route exact path="/register" children={<Register />} />
        <Route exact path="/contribute" children={<Contribution />} />

      </Switch>
    </div>
);

export default App;
