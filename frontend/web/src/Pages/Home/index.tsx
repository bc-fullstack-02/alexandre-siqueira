/* logo_menu from "../../assets/logo_menu.svg" */
import * as Dialog from "@radix-ui/react-dialog"
import Text from "../../components/Text"

function Home(){
    return (
        <div className="w-screen h-screen flex">        
            <div className="basis-1/6 border-r border-slate-400 ml-4 pt-4"> 
                <div>
                    <img src="{logo_menu}" alt="Logo" />
                    <Text className="font-extrabold ml-4">Parrot</Text>                    
                </div>
            </div>
            <div>
                <Dialog.Root>
                    
                </Dialog.Root>
            </div>
            <div className="basis-5/6"></div>
        </div>
    )

}
export default Home;