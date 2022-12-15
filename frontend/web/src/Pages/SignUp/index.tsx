import { useNavigate } from "react-router-dom"
import AuthForm, { Auth } from "../../components/AuthForm";
import api from "../../services/api";

function SignUp(){
    const navigate = useNavigate()
    async function handleRegister(auth: Auth){        
        try {
                await api.post("/security/register", auth)
                navigate("/") 

        }catch (err){
            console.log(err)
            alert("Erro na criação de usuario")
        }
    }
    return (
        <AuthForm 
            formTitle="Faça o cadastro e comece a usar"
            submitFormButtonText="Cadastar"
            submitFormButtonAction={handleRegister}
            linkDescription="Já possui conta? Entre agora!"            
            routeName="/"
            showOptional
        />
    )
}
export default SignUp;