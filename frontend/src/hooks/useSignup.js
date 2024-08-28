import { useState } from 'react';
// import { useAuthContext } from './useAuthContext';
// import { getUserDetails } from '../services/userService';
import { signupUser } from '../services/authService';
// import { setToken, getToken } from '../utils/authUtil';
import { useNavigate } from 'react-router-dom';
const useSignup = () => {
    // const { dispatch } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signup = async (name, email, password) => {
        setLoading(true);
        setError(null);

        try {
            await signupUser(name, email, password);
            navigate('/login');
            // setToken(data.token);

            // Verify the token
            // const storedToken = getToken();
            // console.log('storedToken', storedToken);

            // const user = await getUserDetails(storedToken);

            // if (user.isVerified) {
            //     dispatch({ type: 'LOGIN', payload: user });
            // } else {
            //     setError('User is not verified.');
            // }

            setLoading(false);
        } catch (error) {
            setError(error);    
            
        }
    }
    return { signup, loading, error };
}

export { useSignup };