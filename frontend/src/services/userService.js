const API_URL = '/api/users';

const getUserDetails = async (token) => {
    try {
        const res = await fetch(`${API_URL}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if(!res.ok) {
            throw new Error('Failed to fetch user details');
        }

        const data = res.json();
        return data;
    } catch (error) {
        throw new Error(error.message || 'An error occurred while fetching user details');
    }
}

export { getUserDetails };