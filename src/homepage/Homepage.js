import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import './Homepage.css';


function Homepage() {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <div id='container'>
        <h1 id='title'>Jobly</h1>
        {currentUser ? (
          <h2 id='msg'>
            Welcome back, {currentUser.firstName || currentUser.username}!
          </h2>
        ) : (
          <p>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
