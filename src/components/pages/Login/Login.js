import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const validCredentials = {
  username: 'user',
  password: 'password'
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
    )} />
  );
};

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === validCredentials.username && password === validCredentials.password) {
      const token = Math.random().toString(36).substring(7);
      localStorage.setItem('token', token);
      props.history.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={event => setUsername(event.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

const Logout = (props) => {
  localStorage.removeItem('token');
  props.history.push('/login');
  return null;
};

export { PrivateRoute, Login, Logout };