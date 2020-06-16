import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import ModelManager from './components/Models/ModelManager';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';


function App() {
  return (
    <BrowserRouter>
      <ModelManager />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
