import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push('/companies');
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div>
        <div>
          <h3>Log In</h3>
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Username</label>
                  <input
                      name='username'
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete='username'
                      required
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                      type='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete='password'
                      required
                  />
                </div>

                <button onSubmit={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
        </div>
      </div>
  );
}

export default Login;
