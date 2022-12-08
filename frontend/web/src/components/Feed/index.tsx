import Heading from "../Heading"
import Text from "../Text"
import { UserCircle, Chat, Heart } from "phosphor-react"

function Feed(){
    return(
        <div>
            <Heading className="border-b border-slate-400 mt-4">
                <Text size="lg" className="font-extrabold ml-5">Página Inicial</Text>
                <div className="flex flex-row items-center ml-5 my-4">
                    <UserCircle size={48} weight="light" className="text-slate-100" />
                    <Text className="font-extrabold ml-2">Fulano da Silva</Text>
                </div>
            </Heading>
            <section>
                <div className="border-b border-slate-400 mt-4">
                    <div className="flex flex-row items-center ml-5 my-4">
                        <UserCircle size={48} weight="light" className="text-slate-100" />
                        <Text className="font-extrabold ml-2">Fulano de Tal</Text>
                    </div>
                    <Text asChild className="ml-16">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </Text>
                    <div className="flex items-center ml-16 my-4 space-x-2">
                    <Chat size={24} className="text-slate-50" />
                    <Text size="sm">9.999</Text>
                    
                    <div className="hover:bg-sky-400 rounded-full p-1">
                        <Heart size={24} className="text-slate-50" />
                    </div>                    
                    <Text size="sm">9.999</Text>
                </div>
                </div>
                
            </section>
        </div>
    )

}

export default Feed