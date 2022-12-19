import { FaRegHeart, FaRegUserCircle, FaRocketchat } from "react-icons/fa"
import Heading from "../Heading"
import Text from "../Text"
import { Post } from '../../Model/Post';
import { Avatar } from "@mui/material";
import api from "../../services/api";

interface PostItemProps{
    post: Post
    handleLike: (postId: string) => void
}

function PostItem({ post}: PostItemProps){

    async function handleLike(postId: String){
        try {
                await api.post(`/posts/${postId}/like`, null, authHeader)
                const newPost = posts
                    .filter((post) => post._id === postId)
                    .map((post) => { 
                        post.likes.push(profile)
                        return post 
                    })

            setPosts((posts) => {
                const post = newPost[0]
                const index = posts.indexOf(post)
                posts[index] = post
                return [ ...posts]
            })
        } catch (err) {
            console.error(err)
        }
        
    }

    return(
        <div className="border-b border-slate-400 mt-4" key={post._id}>
                        <div className="flex flex-row items-center ml-5 my-4">
                        {post.profile && post.profile ? <Avatar 
                            className="border-solid border-2 border-sky-500" 
                            alt={post.profile.name} 
                            src={post.profile.imageUrl} 
                            sx={{ width: 56, height: 56 }}/>
                            : <FaRegUserCircle size={48} height="light" className="text-slate-100"/> }
                            <Text className="font-extrabold ml-2">{post.profile.name}</Text>
                        </div>
                        <div className="ml-16 flex flex-col gap-2">
                            <Heading size="sm">{post.title}</Heading>
                            {(post.image) ? <img src={post.imageUrl} alt="Image" className="max-w-lg rounded-lg"/> : ( 
                                <Text asChild >
                                     <p>{post.description}</p>
                                </Text>)
                            }   
                        </div>                        
                        <div className="flex items-center ml-16 my-4 space-x-2">
                            <FaRocketchat size={24} className="text-slate-50" />
                            <Text size="sm">{post.comments.length}</Text>
                            
                            <div className="hover:bg-sky-400 rounded-full p-1" onClick={() => handleLike(post._id)}>
                                <FaRegHeart size={24} className="text-slate-50" />
                            </div>                    
                            <Text size="sm">{post.likes.length}</Text>
                        </div>
                    </div>
    )

}
export default PostItem