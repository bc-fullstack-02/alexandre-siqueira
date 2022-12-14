import LoggedUser from "../../components/LoggedUser"
import Menu from "../../components/Menu"
import Profile from "../../components/Profile"

function ProfilePage(){
    return (
        <div className="w-screen h-screen flex"> 
            <Menu />               
            <Profile />        
            <LoggedUser />                        
        </div>
    )
}
export default ProfilePage