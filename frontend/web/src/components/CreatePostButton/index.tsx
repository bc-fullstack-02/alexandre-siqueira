import * as Dialog from "@radix-ui/react-dialog"
function CreatePostButton(){
    return(
            <Dialog.Trigger className="px-5 h-12 w-48 mt-6 bg-sky-500 transition-colors hover:bg-cyan-300 rounded-full font-semibold">Novo Post
            </Dialog.Trigger>    
        )
}
export default CreatePostButton