import { useState, useEffect } from 'react'
import api from '../../services/api'
import { getAuthHeader } from '../../services/auth';
import Menu from '../../components/Menu'
import Feed from "../../components/Feed"
import { Post } from '../../Model/Post';

function Home(){

    const authHeader = getAuthHeader()
    const profile = localStorage.getItem("profile") as string
    const user = localStorage.getItem("user") as string
    
    const [ posts, setPosts] = useState<Post[]>([])    

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
    
    async function newPostCreated(post: Post) {
        try {
            const response = await api.get(`/posts/${post._id}`, authHeader)
            const newPost = response.data
            setPosts((posts) => [newPost, ...posts])
            
        } catch (err) {
            console.error(err)
        }
                        
    }

    return (
        <div className="w-screen h-screen flex"> 
            <Menu newPostCreated={newPostCreated}/>               
            <Feed posts={posts} handleLike={handleLike}/>                         
        </div>
    )
}
export default Home;