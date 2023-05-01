import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import CompanyList from '../companies/CompanyList';
import JobList from '../jobs/JobList';
import CompanyDetail from '../companies/CompanyDetail';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../profiles/ProfileForm';
import PrivateRoute from './PrivateRoute';

const Routes = ({ login, signup }) => {
	return (
		<div>
			<Switch>
				<Route exact path="/">
					<Homepage />
				</Route>
				<Route exact path="/login">
					<LoginForm login={login} />
				</Route>
				<Route exact path="/signup">
					<SignupForm signup={signup} />
				</Route>
				<PrivateRoute exact path="/companies">
					<CompanyList />
				</PrivateRoute>
				<PrivateRoute exact path="/companies/:handle">
					<CompanyDetail />
				</PrivateRoute>
				<PrivateRoute exact path="/jobs">
					<JobList />
				</PrivateRoute>
				<PrivateRoute exact path="/profile">
					<ProfileForm />
				</PrivateRoute>
				<Redirect to="/" />
			</Switch>
		</div>
	);
};

export default Routes;
