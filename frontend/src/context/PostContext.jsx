import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
    posts: [],
    loading: false,
    error: null
};

const postReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return {
                ...state,
                posts: action.payload,
                loading: true,
                error: null
            };

        case 'CREATE_POST':
            return {
                ...state,
                posts: [action.payload, ...state.posts], // New post added at the beginning
                loading: false,
                error: null
            };
        case 'UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === action.payload.id ? action.payload : post
                ),
                loading: false,
                error: null
            };
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload),
                loading: false,
                error: null
            };
        default:
            return state;
    }
};

const PostContext = createContext();

const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, initialState);

    return (
        <PostContext.Provider value={{ state, dispatch }}>
            {children}
        </PostContext.Provider>
    );
};

PostProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { PostContext, PostProvider };
