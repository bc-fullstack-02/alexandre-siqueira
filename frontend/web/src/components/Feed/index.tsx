import Heading from "../Heading"
import Text from "../Text"
import { FaRegUserCircle, FaRocketchat, FaRegHeart } from 'react-icons/fa';
import { Post } from '../../Model/Post';
import PostItem from '../PostItem';

interface FeedProps{
    posts: Post[]
    handleLike: (postId: String) => void;
}

function Feed({posts, handleLike}: FeedProps){
    const user = localStorage.getItem("user")
    
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
                    <PostItem post ={post} handleLike={handleLike} key={post._id} />
                ))}
            </section>
        </div>
    )
}
export default Feed