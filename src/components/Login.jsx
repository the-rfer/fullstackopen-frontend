import { useState } from 'react';
import loginService from '../services/login';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            console.log('ERROR: ', exception);
            // setErrorMessage('Wrong credentials');
            // setTimeout(() => {
            //     setErrorMessage(null);
            // }, 5000);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Log in to application</h1>
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

export default Login;
