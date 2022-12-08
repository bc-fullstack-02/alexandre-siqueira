import { useNavigate } from "react-router-dom"
import SingUpForm from "../../components/SingUpForm";
import api from "../../services/api";

function SignUp(){
    const navigate = useNavigate()
    async function handleRegister(name: string, user: string, password: string, email: string){        
        try {
                await api.post("/security/register", {
                    name,
                    user,
                    password,
                    email
            })

            navigate("/") 

        }catch (err){
            console.log(err)
            alert("Erro na criação de usuario")
        }
    }
    return (
        <SingUpForm 
            formTitle="Faça o cadastro e comece a usar"
            submitFormButtonText="Cadastar"
            submitFormButtonAction={handleRegister}
            linkDescription="Já possui conta? Entre agora!"            
            routeName="/"
        />
    )
}
export default SignUp;