import { useNavigate } from "react-router-dom"
import Heading from "../Heading"
import Text from "../Text"
import { FaRegUserCircle} from 'react-icons/fa';
import Button from "../Button";

function Profile(){
    const navigate = useNavigate()
    const user = localStorage.getItem("user")
    
    function handleLogout(){
        localStorage.clear();
        navigate("/")
    }

    return(
        <div className="basis-5/6 overflow-y-auto scroll-smooth">
            <Heading className="border-b border-slate-400 mt-4">
                <div className="flex flex-row items-center ml-5 my-4">
                    <FaRegUserCircle size={48} height="light" className="text-slate-100" />
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