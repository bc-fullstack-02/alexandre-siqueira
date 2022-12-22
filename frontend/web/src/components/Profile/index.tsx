import { useNavigate } from "react-router-dom"
import Heading from "../Heading"
import Text from "../Text"
import { UserCircle } from "phosphor-react"
import Button from "../Button";
import { useEffect, useState } from "react";
import { getAuthHeader } from "../../services/auth";
import api from "../../services/api";

function Profile(){
    const [profile, setProfiles] = useState<Profile[]>([]);
    const user = localStorage.getItem("user")
    const authHeader = getAuthHeader();
    const profileId = localStorage.getItem("profile") as string;
    const navigate = useNavigate()
    
    function handleLogout(){
        localStorage.clear();
        navigate("/")
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

    return(
        <div className="basis-4/6 overflow-y-auto scroll-smooth">
            <Heading className="border-b border-slate-400 mt-4">
            <Text size="lg" className="font-extrabold ml-5">Perfil</Text>
            <div className="flex flex-row items-center ml-5 my-4">
                {profile.image ? (
                <img
                    className="border-solid border-2 border-sky-500"
                    src={profile.imageUrl}
                    style={{ width: '5%', borderRadius: '50px' }}
                />
                ) : (
                    <UserCircle
                    size={48}
                    height="light"
                    className="text-slate-100"
                    />
                )}
            <Text className="font-extrabold ml-2">{user}</Text>
            </div>
            </Heading>
            <div className="mt-4 w-full flex flex-col items-stretch max-w-sm  justify-end">
                <Button className="ml-4 max-w-sm" onClick={handleLogout}>Sair</Button>
            </div>
        </div>
    )

}
export default Profile