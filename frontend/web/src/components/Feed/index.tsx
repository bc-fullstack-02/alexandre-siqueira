import { useState, useEffect } from 'react'
import Heading from "../Heading"
import Text from "../Text"
import { FaRegUserCircle, FaRocketchat, FaRegHeart } from 'react-icons/fa';
import api from '../../services/api'
import { getAuthHeader } from '../../services/auth';


interface Post {
        _id: string,
        title: string,
        description: string,
        profile: {
            name: string
        },
        comments: [],
        likes: []
}

/* interface Profile{
        _id: string,
        name: string,
        user: string,
        following: [],
        followers: []
} */

function Feed(){
    const authHeader = getAuthHeader()
    const user = localStorage.getItem("user")
    const [ posts, setPosts] = useState<Post[]>([])    
    const profile = localStorage.getItem("profile")

    useEffect(()=>{
       async function getPosts(){
        const response = await api.get("/feed", authHeader)
        setPosts(response.data)
       }
       getPosts()
    }, [])
    
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
        <div className="basis-5/6 overflow-y-auto scroll-smooth">
            <Heading className="border-b border-slate-400 mt-4">
                <Text size="lg" className="font-extrabold ml-5">Página Inicial</Text>
                <div className="flex flex-row items-center ml-5 my-4">
                    <FaRegUserCircle size={48} height="light" className="text-slate-100" />
                    <Text className="font-extrabold ml-2">{user}</Text>
                </div>
            </Heading>
            <section>
                { posts && posts.map((post: Post) => (       
                    <div className="border-b border-slate-400 mt-4" key={post._id}>
                        <div className="flex flex-row items-center ml-5 my-4">
                            <FaRegUserCircle size={48} height="light" className="text-slate-100" />
                            <Text className="font-extrabold ml-2">{post.profile.name}</Text>
                        </div>
                        <div className="ml-16 flex flex-col gap-2">
                            <Heading size="sm">{post.title}</Heading>
                            <Text asChild >
                                <p>{post.description}</p>
                            </Text>
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
                ))}
            </section>
        </div>
    )
}
export default Feed