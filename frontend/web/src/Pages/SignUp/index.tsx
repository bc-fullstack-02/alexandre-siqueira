import { useNavigate} from "react-router-dom"
import AuthForm from "../../components/AuthForm";
import api from "../../services/api";

function SignUp(){
    async function handleRegister(user: string, password: string){
        const navigate = useNavigate()
        try {
            api.post("/security/register", {
                user,
                password
            })
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
            linkDescription="Já possui conta? Entre agora!"
            submitFormButtonAction={handleRegister}
            routeName="/"
        />
    )
}
export default SignUp;