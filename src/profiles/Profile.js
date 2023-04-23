import React, { useState, useContext } from 'react';
import JoblyApi from '../api/api';
import UserContext from '../auth/UserContext';

function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: '',
  });
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.saveProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(data => ({ ...data, password: '' }));
    setFormErrors([]);
    setSaveConfirmed(true);
    setCurrentUser(updatedUser);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
      <div>
        <h3>Profile</h3>
          <div>
            <form>
              <div>
                <label>Username</label>
                <p>{formData.username}</p>
              </div>
              <div>
                <label>First Name</label>
                <input
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                />
              </div>
              <div>
                <label>Confirm password to make changes:</label>
                <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                />
              </div>


              <button onClick={handleSubmit}>
                Save Changes
              </button>
            </form>
          </div>
      </div>
  );
}

export default Profile;

