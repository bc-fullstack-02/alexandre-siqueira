import { useState } from "react"
import { Link } from "react-router-dom"
import logo_menu from "../../assets/logo-menu.svg"
import * as Dialog from "@radix-ui/react-dialog"
import { FaHome, FaUserAlt, FaUserFriends } from 'react-icons/fa';
import MenuItem from "../MenuItem"
import Text from "../../components/Text"
import CreatePostButton from '../../components/CreatePostButton'
import CreatePostDialog from "../../components/CreatePostDialog"

function Menu() {

    const  [open, setOpen] = useState(false)

    function closeDialog() {
        setOpen(false)
    }

    return(
        <div className="basis-1/6 border-r border-slate-400 ml-4 pt-4"> 
        <div className='flex items-center ml-4'>
            <img src={logo_menu} alt="Logo" />
            <Text className="font-extrabold ml-4">Parrot</Text>                    
        </div>
        <ul className="pr-2">
            <MenuItem menuTitle="Pagina Inicial" route="/home">
                <FaHome size={48} height="fill"/>
            </MenuItem>
            <MenuItem menuTitle="Perfil" route="/profile">
                <FaUserAlt size={44} height="fill"/>
            </MenuItem>
            <MenuItem menuTitle="Amigos" route="/friends">
                <FaUserFriends size={48} height="fill"/>
            </MenuItem>
        </ul>
      <div className="flex flex-col items-center">
        <Dialog.Root open={open} onOpenChange={setOpen}>
                <CreatePostButton />
                <CreatePostDialog closeDialog={closeDialog} />
            </Dialog.Root>
      </div>
    </div>

    )
}
export default Menu