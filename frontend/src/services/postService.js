import { getToken } from '../utils/authUtil'; // Adjust the path according to your folder structure

const API_URL = '/api/posts';

export const createPost = async (postData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        throw new Error('Failed to create post');
    }

    return await response.json();
};

export const getPosts = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}` 
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }

    return await response.json();
};

export const getPostById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}` 
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }

    return await response.json();
};

export const updatePost = async (id, updatedPostData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify(updatedPostData)
    });

    if (!response.ok) {
        throw new Error('Failed to update post');
    }

    return await response.json();
};

export const deletePost = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getToken()}` 
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete post');
    }

    return await response.json();
};

export const likePost = async (id) => {
    const response = await fetch(`${API_URL}/${id}/like`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}` 
        }
    });

    if (!response.ok) {
        throw new Error('Failed to like post');
    }

    return await response.json();
};

export const unlikePost = async (id) => {
    const response = await fetch(`${API_URL}/${id}/unlike`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}` 
        }
    });

    if (!response.ok) {
        throw new Error('Failed to unlike post');
    }

    return await response.json();
};
