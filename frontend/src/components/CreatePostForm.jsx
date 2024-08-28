import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { FaCamera } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePostContext } from '../hooks/usePostContext';
import { createPost } from '../services/postService';

const CreatePostForm = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const imageInputRef = useRef();
  const { user } = useAuthContext();
  const { dispatch } = usePostContext();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Compress the image
        const options = {
          maxSizeMB: 5, // Adjust the maximum size in MB
          maxWidthOrHeight: 1024, // Adjust the maximum width or height
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          setImage(reader.result); // Set the base64 image data
          setImagePreview(reader.result); // Set the image preview
        };
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    
    const post = {
      content,
      image // Base64 image data
    };

    console.log('Post:', post);

    try {
      const newPostData = await createPost(post);
      dispatch({ type: 'CREATE_POST', payload: newPostData }); // Dispatch new post
      setContent('');
      setImage(null);
      setImagePreview('');
      imageInputRef.current.value = "";
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };


  return (
    <div className="w-full rounded-lg shadow-md p-6 bg-white mb-4">
      <form onSubmit={handlePostSubmit} className="flex flex-col">
        {/* Content with Avatar */}
        <div className="flex items-start mb-4">
          <img
            src={user.avatar} 
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <textarea
            className="w-full border-b-2 rounded focus:outline-none p-2"
            placeholder="What's on your mind?"
            rows="1"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mb-4 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="max-h-80 object-contain"
            />
            <button 
              type="button" 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => {
                setImage(null);
                setImagePreview('');
                imageInputRef.current.value = "";
              }}
            >
              &#x2715; {/* X symbol for cancel */}
            </button>
          </div>
        )}
        <div className='flex justify-between'>
          {/* Image Upload Input */}
          <label htmlFor="file" className="flex items-center cursor-pointer text-blue-600 ">
            <div className="flex text-2xl w-10 h-10 justify-center items-center bg-blue-500 text-white rounded-xl">
              <FaCamera className="w-5 h-5" />
            </div>
            <input
              type="file"
              accept="image/*"
              id="file"
              onChange={handleImageChange}
              className="hidden"
              ref={imageInputRef}
            />
            {/* Submit Button */}
            
          </label>
          <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-md font-medium"
            >
              Post
            </button>
          </div>
        
      </form>
    </div>
  );
};

export default CreatePostForm;
