import CreatePostForm from "../components/CreatePostForm"
import PostFeed from "../components/PostFeed"

const HomePage = () => {
  return (
    <>
      <div className="max-w-3xl w-full m-auto p-4">
        <CreatePostForm />
        <PostFeed />
      </div>
    </>
  )
}

export default HomePage