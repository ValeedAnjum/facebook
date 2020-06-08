import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
