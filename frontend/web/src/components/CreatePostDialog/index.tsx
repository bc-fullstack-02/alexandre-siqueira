import * as Dialog from '@radix-ui/react-dialog'
import { FormEvent, useState } from 'react'
import Dropzone from '../Dropzone'
import api from '../../services/api'
import Button from '../Button'
import { TextInput } from '../TextInput'
import { Post } from '../../Model/Post'

interface CreatePostDialogProps{
    postCreated: (post: Post) => void
}

function CreatePostDialog({ postCreated }: CreatePostDialogProps){
    
    const token = localStorage.getItem("accessToken")
    const [selectedFile, setSelectedFile] = useState<File>()

    async function handleSubmit(event: FormEvent<HTMLFormElement>){ //subs <HTMLFormElement> por <PostFormElement>

        event.preventDefault()
        const form = event.currentTarget

        const data = new FormData()
        data.append("title", form.elements.title.value)
        data.append("description", form.elements.description.value)

        if(selectedFile){
            data.append("file", selectedFile)
        }

        try{
            const response = await api.post("/posts", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            postCreated(response.data)
        }catch(err){
            console.log(err)
            alert("Erro ao criar post")
        }
    }
    return(
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w[600px] h[600px] shadow-lg shadow-black/25'>
                <Dialog.DialogTitle className='text-2xl font-black'>Novo Post</Dialog.DialogTitle>
                    <form className='flex flex-col gap-2 mt-8' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                            <label htmlFor='title' className='font-semibold'>
                                Título do Post
                            </label>
                            <TextInput.Input id="title" placeholder="Qual o título do post..."></TextInput.Input>
                            <label htmlFor='description' className='font-semibold'>
                                O que você está pensando?
                            </label>
                            <TextInput.Input id="description" placeholder="Diga o que está pensando..."></TextInput.Input>
                            <Dropzone onFileUploaded={setSelectedFile}/>
                        </div>
                        <footer className='mt-4 flex justify-end gap-4'>
                            <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                                Fechar
                            </Dialog.Close>
                            <Button type='submit' className='flex-none h-12 w-48'>Postar</Button>
                        </footer>
                    </form>
            </Dialog.Content>
        </Dialog.Portal>
    )

}
export default CreatePostDialog