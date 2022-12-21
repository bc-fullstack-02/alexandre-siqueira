import Heading from "../Heading";
import Text from "../Text";
import { FaRegUserCircle } from "react-icons/fa";
import { Post } from "../../Model/Post";
import PostItem from "../PostItem";
import { useEffect, useState } from "react";
import { Profile } from "../../Model/Profile";
import api from "../../services/api";
import { getAuthHeader } from "../../services/auth";
import { Avatar } from "@mui/material";

interface FeedProps {
  posts: Post[];
  handleLike: (postId: String) => void;
}

function Feed({ posts, handleLike }: FeedProps) {
  const user = localStorage.getItem("user");
  const authHeader = getAuthHeader();
  const profileId = localStorage.getItem("profile") as string;
  const [profile, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const profile = await api.get(`/profiles/${profileId}`, authHeader);
        setProfiles(profile.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProfiles();
  }, []);

  return (
    <div className="basis-5/6 overflow-y-auto scroll-smooth">
      <Heading className="border-b border-slate-400 mt-4">
        <Text size="lg" className="font-extrabold ml-5">
          Página Inicial
        </Text>
        <div className="flex flex-row items-center ml-5 my-4">
          {profile.image ? (
            <Avatar
              className="border-solid border-2 border-sky-500"
              alt={profile.name}
              src={profile.imageUrl}
              sx={{ width: 56, height: 56 }}
            />
          ) : (
            <FaRegUserCircle
              size={48}
              height="light"
              className="text-slate-100"
            />
          )}
          <Text className="font-extrabold ml-2">{user}</Text>
        </div>
      </Heading>
      <section>
        {posts &&
          posts.map((post: Post) => (
            <PostItem post={post} handleLike={handleLike} key={post._id} />
          ))}
      </section>
    </div>
  );
}
export default Feed;
