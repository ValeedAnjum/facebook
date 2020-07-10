import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import ModelManager from './components/Models/ModelManager';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';
import ProfileSetting from './components/ProfileSetting/ProfileSetting';
import Users from './components/Users/Users';


function App() {
  return (
    <BrowserRouter>
      <ModelManager />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/profile" component={ProfileSetting} />
        <Route path="/users" component={Users} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
