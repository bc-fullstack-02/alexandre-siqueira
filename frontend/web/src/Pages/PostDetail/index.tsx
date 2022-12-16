import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Menu from "../../components/Menu"
import { Post } from "../../Model/Post"
import api from "../../services/api"
import { getAuthHeader } from "../../services/auth"

function PostDetail(){
    const { postId } = useParams()
    const [PostDetail, setPostDetail] = useState<Post>()

    useEffect(() => {
        async function fetchPostDetails(){
            try {
                const response = await api.get(`/posts/${postId}`, getAuthHeader())
                setPostDetail(response.data)
            } catch (error) {
                
            }
        }
        fetchPostDetails()
    },[])

    return(
        <div className="w-screen h-screen flex">
            <Menu />
            {PostDetail && <PostDetail post={PostDetail} />}
        </div>        
    )
}
export default PostDetail