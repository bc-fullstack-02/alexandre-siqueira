import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import AuthForm, { Auth } from "../../components/AuthForm";
import api from "../../services/api"

interface UserToken{
    profile: string
    user: string

}

function Login() {
  
  const navigate = useNavigate()

  async function handleLogin(auth: Auth){
    try{

      const { data } = await api.post("/security/login", auth)      
      const { token } = data
      const decodedToken = jwt_decode(token) as UserToken      
      localStorage.setItem("profile", decodedToken.profile)
      localStorage.setItem("user", decodedToken.user)
      localStorage.setItem("accessToken", token)

      return navigate("/home")

    }catch(err){
      console.error(err)      
      alert("Usuário ou Senha: Inválidos!")
    }

  }
  return (
    <AuthForm
      formTitle="Faça login e comece a usar"
      submitFormButtonText="Entrar"
      submitFormButtonAction={handleLogin}
      linkDescription="Não possui conta? Crei uma conta agora!"      
      routeName="signup"
    />
  );
}

export default Login;
