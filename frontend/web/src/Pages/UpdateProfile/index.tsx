import EditProfile from "../../components/EditProfile"
import LoggedUser from "../../components/LoggedUser"
import Menu from "../../components/Menu"

function UpdateProfile(){
    return (
        <div className="w-screen h-screen flex"> 
            <Menu />               
            <EditProfile />
            <LoggedUser />                         
        </div>
    )
}
export default UpdateProfile