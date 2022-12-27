import { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import api from "../../services/api";
import Menu from "../../components/Menu";
import PostItem from "../../components/PostItem";
import Text from "../../components/Text";
import { TextInput } from "../../components/TextInput";
import { Post } from "../../Model/Post";
import { getAuthHeader } from "../../services/auth";
import { likePost, unlikePost } from "../../services/posts";
import { UserCircle } from "phosphor-react";

interface CommentFormElements extends HTMLFormControlsCollection {
  description: HTMLInputElement;
}

interface CommentFormElement extends HTMLFormElement {
  readonly elements: CommentFormElements;
}

function PostDetail() {
  const { postId } = useParams();
  const [postDetail, setPostDetail] = useState<Post>();
  const [comments, setComments] = useState([]);
  const profile = localStorage.getItem("profile") as string;
  const user = localStorage.getItem("user") as string;

  useEffect(() => {
    async function fetchPostDetail() {
      try {
        const responsePost = await api.get(`/posts/${postId}`, getAuthHeader());
        const responseComments = await api.get(
          `/posts/${postId}/comments`,
          getAuthHeader()
        );
        setPostDetail(responsePost.data);
        setComments(responseComments.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPostDetail();
  }, []);

  async function handleLike(postId: string) {
    try {
      if (postDetail?.likes.includes(profile)) {
        const newPost = await unlikePost(postDetail, profile);
        newPost && setPostDetail({ ...newPost });
      } else {
        const newPost = postDetail && (await likePost(postDetail, profile));
        newPost && setPostDetail({ ...newPost });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(event: FormEvent<CommentFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      description: form.elements.description.value,
    };

    try {
      const response = await api.post(`/posts/${postId}/comments`, data, getAuthHeader());
      const comment = {
        ...response.data,
        profile: { _id: profile, name: user },
      };
      setComments([comment, ...comments]);
      setPostDetail((post) => {
        post?.comments.push(comment);
        return { ...post };
      });
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-screen h-screen flex">
      <Menu />
      <div className="flex flex-col w-full overflow-y-auto scroll-smooth">
        {postDetail && <PostItem post={postDetail} handleLike={handleLike} />}
        <section>
          <form
            onSubmit={handleSubmit}
            className="mx-8 my-8 flex flex-col gap-4"
          >
            <Text>Insira seu comentário</Text>
            <TextInput.Root>
              <TextInput.Input
                id="description"
                placeholder="Comente este post..."
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
                {comments &&
                  comments.map((comment) => (
                    <li
                      className="p-4 my-8 border rounded-lg"
                      key={comment._id}
                    >
                      <div className="flex flex-row items-center">
                        {comment.profile.imageUrl ? (
                          <img
                            className="border-solid border-2 border-sky-500"
                            src={comment.profile.imageUrl}
                            style={{ width: "2%", borderRadius: "50px" }}
                          />
                        ) : (
                          <UserCircle
                            size={48}
                            weight="light"
                            className="text-slate-100"
                          />
                        )}
                        <Text className="ml-2" size="sm">{comment.profile.name}</Text>
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
  );
}

export default PostDetail;
