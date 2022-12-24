import { useNavigate } from "react-router-dom";
import Heading from "../Heading";
import Text from "../Text";
import { User, UserCircle, Lock, Envelope } from "phosphor-react";
import Button from "../Button";
import { FormEvent, useEffect, useState } from "react";
import { getAuthHeader } from "../../services/auth";
import api from "../../services/api";
import { TextInput } from "../TextInput";
import Dropzone from "../Dropzone";

function Profile() {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [profile, setProfiles] = useState<Profile[]>([]);
  const user = localStorage.getItem("user");
  const authHeader = getAuthHeader();
  const profileId = localStorage.getItem("profile") as string;
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  function handleEdit() {
    navigate("/editprofile");
  }

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
    <div className="basis-4/6 overflow-y-auto scroll-smooth">
      <Heading className="border-b border-slate-400 mt-4">
        <Text size="lg" className="font-extrabold ml-5">
          Perfil
        </Text>
        <div className="flex flex-row items-center ml-5 my-4">
          {profile.image ? (
            <img
              className="border-solid border-2 border-sky-500"
              src={profile.imageUrl}
              style={{ width: "5%", borderRadius: "50px" }}
            />
          ) : (
            <UserCircle size={48} className="text-slate-100" />
          )}
          <Text className="font-extrabold ml-2">{user}</Text>
        </div>
      </Heading>
      <div className="mt-4 w-full flex flex-row items-stretch max-w-sm  justify-end">
        <Button className="ml-4 max-w-sm" onClick={handleLogout}>
          Sair
        </Button>
        <Button className="ml-4 max-w-sm" onClick={handleEdit}>
          Editar
        </Button>
      </div>
    </div>
  );
}
export default Profile;
