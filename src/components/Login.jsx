import { useState } from 'react';
import PropTypes from 'prop-types';
import loginService from '../services/login';

const Login = ({ setUser, setNotification, children }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        loginService
            .login({
                username,
                password,
            })
            .then((user) => {
                window.localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                setUsername('');
                setPassword('');
            })
            .catch((error) => {
                setNotification({
                    message: error.response.data.error,
                    type: 'error',
                });
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            });
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Log in to application</h1>
            {children}
            <div>
                username
                <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
    );
};

Login.propTypes = {
    setUser: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export default Login;
