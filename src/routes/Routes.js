import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import Companies from '../companies/Companies';
import Jobs from '../jobs/Jobs';
import Company from '../companies/Company';
import Login from '../auth/Login';
import Profile from '../profiles/Profile';
import Signup from '../auth/Signup';
import PrivateRoute from './PrivateRoute';


function Routes({ login, signup }) {
  return (
      <div>
        <Switch>
          <Route exact path='/'>
            <Homepage />
          </Route>

          <Route exact path='/login'>
            <Login login={login} />
          </Route>

          <Route exact path='/signup'>
            <Signup signup={signup} />
          </Route>

          <PrivateRoute exact path='/companies/:handle'>
            <Company />
          </PrivateRoute>

          <PrivateRoute exact path='/companies'>
            <Companies/>
          </PrivateRoute>

          <PrivateRoute exact path='/jobs'>
            <Jobs />
          </PrivateRoute>

          <PrivateRoute path='/profile'>
            <Profile />
          </PrivateRoute>

          <Redirect to='/' />
        </Switch>
      </div>
  );
}

export default Routes;
