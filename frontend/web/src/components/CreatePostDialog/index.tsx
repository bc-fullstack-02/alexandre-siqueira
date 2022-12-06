import * as Dialog from '@radix-ui/react-dialog'
import { TextInput } from '../TextInput'
function CreatePostDialog(){
    return(
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w[480px] shadow-lg shadow-black'>
                <Dialog.DialogTitle className='text-2xl font-black'>Novo Post</Dialog.DialogTitle>
                <form className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='description' className='font-semibold'>
                            O que você está pensando?
                        </label>
                        <TextInput.Input id="description" placeholder="Diga o que está pensando..."></TextInput.Input>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )

}
export default CreatePostDialog