import { useState } from 'react';
import { useAuthContext } from './useAuthContext.js';
import { getUserDetails } from '../services/userService.js';
import { loginUser } from '../services/authService.js';
import { setToken, getToken, removeToken } from '../utils/authUtil.js';

const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const data = await loginUser(email, password);
            setToken(data.token);

            const storedToken = getToken();
            const user = await getUserDetails(storedToken);

            console.log('user', user);
            if (user.isVerified) {
                dispatch({ type: 'LOGIN', payload: user });
            } else {
                // console.log('User is not verified.');
                setError('User is not verified. Please check your email for the verification link.');
                removeToken();               
            }

            setLoading(false);
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.');
            setLoading(false);
        }
    }

    return { login, loading, error };
}

export { useLogin };
