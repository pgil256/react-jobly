import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './routes/Navigation';
import Routes from './routes/Routes';
import JoblyApi from './api/api';
import UserContext from './auth/UserContext';
import jwt from 'jsonwebtoken';
import useLocalStorage from "./hooks/useLocalStorage";

export const TOKEN_STORAGE_ID = 'jobly-token';

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error('Error: loadinfoFailed', err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('Login failed.', errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('signup failed', errors);
      return { success: false, errors };
    }
  }

  function hasApplied(id) {
    return applicationIds.has(id);
  }

  function apply(id) {
    if (hasApplied(id)) return;
    JoblyApi.apply(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  return (
      <BrowserRouter>
        <UserContext.Provider
            value={{ currentUser, setCurrentUser, hasApplied, apply }}>
          <div>
            <Navigation logout={logout} />
            <Routes login={login} signup={signup} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;