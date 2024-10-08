import PropTypes from 'prop-types';
import { FaRegThumbsUp, FaRegComment } from 'react-icons/fa';

const PostCard = ({ post }) => {
  const { author, content, image, likes = [], comments = [] } = post;

  if (!author) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-6 w-full mx-auto">
      {/* Author Section */}
      <div className="flex items-center mb-4">
        {/* {console.log('Author:', post.author)} */}
        <img
          src={author.avatar}
          alt={author.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{author.name}</h3>
          <p className="text-sm text-gray-600">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4">{content}</p>

      {/* Post Image */}
      {image && (
        <img
          src={image}
          alt="Post"
          className="w-full h-auto rounded-lg mb-4"
        />
      )}

      {/* Like and Comment Buttons */}
      <div className="flex items-center gap-4">
        <button
          className="flex items-center justify-center bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline w-full"
          onClick={() => console.log('Like post')}
        >
          <FaRegThumbsUp className="inline-block mr-2" />
          Like {likes.length > 0 ? likes.length : ''}
        </button>
        <button
          className="flex items-center justify-center bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline w-full"
          onClick={() => console.log('View comments')}
        >
          <FaRegComment className="inline-block mr-2" />
          Comments {comments.length > 0 ? `(${comments.length})` : ''}
        </button>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object
};

export default PostCard;
