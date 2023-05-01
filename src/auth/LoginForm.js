import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AuthForm.css';
import Alert from '../common/Alert';

const LoginForm = ({ login }) => {
	const history = useHistory();
	const [ formData, setFormData ] = useState({
		username: '',
		password: ''
	});
	const [ formErrors, setFormErrors ] = useState([]);

	async function handleSubmit(e) {
		e.preventDefault();
		let res = await login(formData);
		if (res.success) {
			history.push('./companies');
		} else {
			setFormErrors(res.errors);
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((l) => ({ ...l, [name]: value }));
	};
	return (
		<div>
			<div>
				<form onSubmit={handleSubmit}>
					<h2 >Log In</h2>
					<label htmlFor="username">Username</label>
					<input
						name="username"
						value={formData.username}
						onChange={handleChange}
						placeholder="Username"
						required
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						autoComplete="current-password"
						required
					/>
					<button>Submit</button>

					{formErrors.length ? <Alert messages={formErrors} /> : null}

				</form>
			</div>
		</div>
	);
};

export default LoginForm;
