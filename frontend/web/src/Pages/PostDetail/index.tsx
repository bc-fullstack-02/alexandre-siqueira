import { useState, useEffect, FormEvent } from "react"
import { useParams } from "react-router-dom"
import Button from "../../components/Button"
import { FaRegUserCircle } from "react-icons/fa";
import Menu from "../../components/Menu"
import PostItem from "../../components/PostItem"
import Text from '../../components/Text'
import { TextInput } from "../../components/TextInput"
import { Post } from "../../Model/Post"
import api from "../../services/api"
import { getAuthHeader } from "../../services/auth"
import { likePost, unlikePost } from "../../services/posts"

interface CommentFormElements extends HTMLFormControlsCollection {
    description: HTMLInputElement;
}

interface CommentFormElement extends HTMLFormElement {
    readonly elements: CommentFormElements
}

function PostDetail() {
    const { postId } = useParams()
    const [postDetail, setPostDetail] = useState<Post>()
    const [comments, setComments] = useState([])
    const profile = localStorage.getItem("profile") as string
    const user = localStorage.getItem("user") as string

    useEffect(() => {
        async function fetchPostDetail() {
            try {
                const response = await api.get(`/posts/${postId}`, getAuthHeader())
                const post = response.data
                setPostDetail(post)
                setComments(post.comments)
            } catch (err) {
                console.error(err)
            }
        }
        fetchPostDetail()
    }, [])

    async function handleLike(postId: string) {
        try {
            if(postDetail?.likes.includes(profile)) {
                const newPost = await unlikePost(postDetail, profile)
                newPost && setPostDetail({ ...newPost })
            } else {
                const newPost = postDetail && (await likePost(postDetail, profile))
                newPost && setPostDetail({ ...newPost })
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function handleSubmit(event: FormEvent<CommentFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;

        const data = {
            description: form.elements.description.value
        }

        try {
            const response = await api.post(`/posts/${postId}/comments`, data, getAuthHeader())
            const comment = {
                ...response.data,
                profile: { _id: profile, name: user }
            }
            setComments([comment, ...comments])
            setPostDetail((post) => {
                post?.comments.push(comment)
                return { ...post }
            })
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <div className="w-screen h-screen flex">
            <Menu />
            <div className="flex flex-col w-full overflow-y-auto scroll-smooth">
                {postDetail && <PostItem post={postDetail} handleLike={handleLike} />}
                <section>
                    <form onSubmit={handleSubmit} className='mx-8 my-8 flex flex-col gap-4'>
                        <Text>Insira seu comentário</Text>
                        <TextInput.Root>
                            <TextInput.Input
                                id='description'
                                placeholder='Comente este post...'
                            />
                        </TextInput.Root>
                        <Button type="submit" className="mt-4">
                            Incluir comentário
                        </Button>
                    </form>
                    <div className="border-t border-slate-400 w-full">
                        <div className="mx-8 my-8">
                            <Text size="lg">Comentários:</Text>
                            <ul>
                                {comments && comments.map((comment) => (
                                    <li className="p-4 my-8 border rounded-lg" key={comment._id}>
                                        <div className="flex flex-row items-center">
                                            <FaRegUserCircle size={32} weight='light' className="text-slate-50" />
                                            <Text size="sm">{comment.profile.name}</Text>
                                        </div>
                                        <Text size="md">{comment.description}</Text>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default PostDetail