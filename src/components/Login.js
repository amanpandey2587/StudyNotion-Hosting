import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const tryLogin = async () => {
        if (username.trim() !== '' && password.trim() !== '') {
            setLoading(true);
            setError('');

            try {
                // Make sure to replace with your actual login API endpoint
                const response = await axios.post('/api/faculty/verify', {
                    user_name: username,
                    password: password,
                });
                
                setLoading(false);
                
                if (response.data.status === "ALL OK") {
                    // Redirecting to attendance.js
                    window.location.replace("/attendance"); // Adjust the path as necessary
                } else {
                    setError(response.data.status);
                }
            } catch (error) {
                setLoading(false);
                setError('Oops, something went wrong');
            }
        }
    };

    const handleKeyUp = () => {
        setError('');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className={`p-4 rounded-lg shadow-lg ${loading ? 'applylockscreen' : ''}`}>
                <h2 className="text-xl font-bold">Login</h2>
                {error && <div className="text-red-600">{error}</div>}
                <input
                    type="text"
                    id="txtUsername"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyUp={handleKeyUp}
                    className="mt-2 p-2 border rounded"
                />
                <input
                    type="password"
                    id="txtPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={handleKeyUp}
                    className="mt-2 p-2 border rounded"
                />
                <button
                    id="btnLogin"
                    onClick={tryLogin}
                    disabled={username.trim() === '' || password.trim() === ''}
                    className={`mt-4 p-2 rounded ${username.trim() && password.trim() ? 'activecolor' : 'inactivecolor'}`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </div>
    );
};

export default Login;
