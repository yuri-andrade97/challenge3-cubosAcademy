import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';

import { AuthContext } from './context/AuthContext';

function Routes() {
  const [token, setToken] = useState(localStorage.getItem("token") || '');

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/cadastro" component={Register}/> 
          <Route path="/produtos" component={Products}/> 
        </Switch>
      </Router>
    </AuthContext.Provider>
    )
}


export default Routes;