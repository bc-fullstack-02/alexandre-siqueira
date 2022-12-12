import { FaHome, FaUserAlt, FaUserFriends } from 'react-icons/fa';
import MenuItem from "../MenuItem"

function Menu(){
    return(
        <ul className="pr-2">
            <MenuItem menuTitle="Pagina Inicial">
                <FaHome size={48} height="fill"/>
            </MenuItem>
            <MenuItem menuTitle="Perfil">
                <FaUserAlt size={44} height="fill"/>
            </MenuItem>
            <MenuItem menuTitle="Amigos">
                <FaUserFriends size={48} height="fill"/>
            </MenuItem>
        </ul>
    )
}
export default Menu