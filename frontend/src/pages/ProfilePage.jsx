import CreatePostForm from '../components/CreatePostForm'; 
import PostFeed from '../components/PostFeed';
import { useAuthContext } from '../hooks/useAuthContext'; 
import defaultCoverPhoto from '../assets/default-cover.png'; 
import defaultAvatar from '../assets/default-avatar.png';

const ProfilePage = () => {
    const { user } = useAuthContext(); // Get the current user from context

    return (
        <>
        <div className='bg-gradient-to-b from-gray-500 to-gray-300'>
            <div className="max-w-7xl w-full h-70 m-auto">
                {/* Cover Photo */}
                <div className="relative">
                    <img
                        src={user.coverPhoto || defaultCoverPhoto}
                        alt="Cover Photo"
                        className="w-full max-h-42 object-cover"
                    />
                    {/* Avatar Picture */}
                    <img
                        src={user.avatar || defaultAvatar}
                        alt="User Avatar"
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-36 h-36 rounded-full border-4 border-white"
                    />
                </div>
                
            </div>
        </div>
        <div className='pt-20 pb-10 bg-gradient-to-b from-gray-300 to-gray-200'>
            <h1 className="text-2xl font-bold text-gray-800 text-center">{user.name}</h1>       
        </div>

        <div className='w-full max-w-4xl mx-auto p-4'>

            {/* Create Post Form */}
            <CreatePostForm />

            {/* Post Feed */}
            <PostFeed profile={true} />
        </div>
        </>
    );
};

export default ProfilePage;
