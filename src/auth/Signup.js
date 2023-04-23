import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Signup({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      history.push('/');
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div>
        <div >
          <h2>Sign Up</h2>
          <div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label>Username</label>
                  <input
                      name='username'
                      value={formData.username}
                      onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                      type='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>

                <div>
                  <label>First name</label>
                  <input
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Last name</label>
                  <input
                      name='lastName'

                      value={formData.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>

                <button
                    type='submit'
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Signup;