import { FaRegHeart, FaRegUserCircle, FaRocketchat } from "react-icons/fa"
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom"
import Heading from "../Heading"
import Text from "../Text"
import { Post } from '../../Model/Post'
import { red } from "@mui/material/colors";

interface PostItemProps {
    post: Post;
    handleLike: (postId: string) => void
}

function PostItem({ post, handleLike }: PostItemProps) {
    const profile = localStorage.getItem("profile") as string
    return (<div className="border-b border-slate-400" key={post._id}>
        <div className="flex flex-row items-center ml-5 my-4">
        {post.profile.imageUrl ? (
            <img
              className="border-solid border-2 border-sky-500"
              src={post.profile.imageUrl}
              style={{ width: '4%', borderRadius: '50px' }}
            />
          ) : (
            <FaRegUserCircle
              size={48}
              height="light"
              className="text-slate-100"
            />
          )}
            <Text className="font-extrabold ml-2">{post.profile.name}</Text>
        </div>
        <div className="ml-16 flex flex-col gap-2">
            <Link to={`/posts/${post._id}`}>
                <Heading size="sm">{post.title}</Heading>
                {post.image ? (
                    <img
                        src={post.imageUrl}
                        alt="Foto"
                        className="max-w-lg rounded-lg" />
                ) : (
                    <Text asChild>
                        <p>{post.description}</p>
                    </Text>
                )}
            </Link>
        </div>
        <div className="flex items-center ml-16 my-4 space-x-2">
            <Link to={`/posts/${post._id}`}>
            <FaRocketchat size={24} className="text-slate-50" /></Link>
            <Text size="sm">{post.comments.length}</Text>
            <div className="hover:bg-sky-400 rounded-full p-1" onClick={() => handleLike(post._id)}>
                {post.likes.includes(profile) ? (
                    <FaRegHeart size={24} color='red'/>
                ) : (
                    <FaRegHeart size={24} className="text-slate-50" />
                )}

            </div>
            <Text size="sm">{post.likes.length}</Text>
        </div>
    </div>)
}

export default PostItem
