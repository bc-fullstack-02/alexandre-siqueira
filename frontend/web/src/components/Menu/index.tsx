import { useState } from "react"
import logo_menu from "../../assets/logo-menu.svg"
import * as Dialog from "@radix-ui/react-dialog"
import { HouseLine, User, UsersThree} from "phosphor-react"
import MenuItem from "../MenuItem"
import Text from "../../components/Text"
import CreatePostButton from '../../components/CreatePostButton'
import CreatePostDialog from "../../components/CreatePostDialog"
import { Post } from "../../Model/Post";

interface MenuProps{
    newPostCreated?: (post: Post) => void
}

function Menu(props: MenuProps) {

    const  [open, setOpen] = useState(false)

    function postCreated(post: Post) {
        setOpen(false)
        props.newPostCreated && props.newPostCreated(post)
    }

    return(
        <div className="basis-1/6 border-r border-slate-400 ml-4 pt-4"> 
        <div className='flex items-center ml-4'>
            <img src={logo_menu} alt="Logo" />
            <Text className="font-extrabold ml-4">Parrot</Text>                    
        </div>
        <ul className="pr-2">
            <MenuItem menuTitle="Pagina Inicial" route="/home">
                <HouseLine size={48} weight="fill"/>
            </MenuItem>
            <MenuItem menuTitle="Perfil" route="/profile">
                <User size={44} weight="fill"/>
            </MenuItem>
            <MenuItem menuTitle="Amigos" route="/friends">
                <UsersThree size={48} weight="fill"/>
            </MenuItem>
        </ul>
      <div className="flex flex-col items-center">
        <Dialog.Root open={open} onOpenChange={setOpen}>
                <CreatePostButton />
                <CreatePostDialog postCreated={postCreated} />
            </Dialog.Root>
      </div>
    </div>

    )
}
export default Menu