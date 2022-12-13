import { useState, useEffect } from "react"
import api from "../../services/api"
import Text from "../Text"
import { FaRegUserCircle } from "react-icons/fa"
import Heading from "../Heading"
import Button from "../Button"
import { getAuthHeader } from "../../services/auth"

interface Profile{
    _id: string,
    name: string
    followers: string[]
}

function Profiles(){
    const authHeader = getAuthHeader()
    const user = localStorage.getItem("user")
    const profileId = localStorage.getItem("profile")

    const [profiles, setProfiles] = useState<Profile[]>([])

    useEffect(() => {
        const getProfiles = async () =>{
            try {
                const response = await api.get("/profiles", authHeader)
                setProfiles(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProfiles()
    }, [])

    async function handleFollow(profileId: string){
        try {
            await api.post(`/profiles/${profileId}/follow`, null, authHeader)
        } catch (err) {
            console.log(err)
        }
    }

    async function handleUnfollow(profileId: string){
        try {
            await api.post(`/profiles/${profileId}/unfollow`, null, authHeader)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="basis-5/6 overflow-y-auto scroll-smooth">
            <Heading className="border-b border-slate-400 mt-4">
                <Text size="lg" className="font-extrabold ml-5">Amigos</Text>
                <div className="flex flex-row items-center ml-5 my-4">
                    <FaRegUserCircle size={48} height="light" className="text-slate-100" />
                    <Text className="font-extrabold ml-2">{user}</Text>
                </div>
            </Heading>
            <ul>
                {profiles.map(profile => (
                <li key={profile._id} className="border-b border-slate-400 mt-4 pl-5">
                    <div className="flex flex-row items-center">
                        <FaRegUserCircle size={48} height="light" className="text-slate-100" />
                        <Text className="font-extrabold ml-2">{profile.name}</Text>
                    </div> 
                    <footer className='mt-4 flex justify-start gap-4 mb-4'>
                            <Button 
                                type='submit' 
                                className='flex-none h-12 w-48' 
                                onClick={() => handleFollow(profile._id)}
                                disabled={profile.followers.includes(profileId)}>
                                Seguir
                            </Button>
                            <button 
                                type='button' 
                                className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 focus:ring-2 ring-white' 
                                onClick={() => handleUnfollow(profile._id)}>
                                Deixar de seguir
                            </button>
                    </footer>
                </li>    
                ))}
            </ul>
        </div>
    )

}
export default Profiles 