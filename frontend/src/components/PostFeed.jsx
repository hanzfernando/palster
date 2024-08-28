import { useEffect } from 'react';
import PostCard from './PostCard';
import { usePostContext } from '../hooks/usePostContext'; 
import { useAuthContext } from '../hooks/useAuthContext'; 
import { getPosts } from '../services/postService'; 
import PropTypes from 'prop-types'

const PostFeed = ({profile = false}) => {
    const { state, dispatch } = usePostContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await getPosts();
                let filteredPosts;

                if (profile) {
                    filteredPosts = posts.filter(post => post.author._id === user._id);
                } else {
                    filteredPosts = posts;
                }

                // console.log('Filtered Posts:');
                // console.log(filteredPosts);

                filteredPosts.reverse();

                dispatch({ type: 'FETCH_POSTS', payload: filteredPosts });

                // console.log('Fetching posts...');
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };
        
        fetchPosts();

    }, [user, dispatch, profile]);

    return (
        <div>
            {/* {console.log('Posts:', state.posts)} */}
            {state.posts.length > 0 ? (
                state.posts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

PostFeed.propTypes = {
    profile: PropTypes.bool
}

export default PostFeed;
