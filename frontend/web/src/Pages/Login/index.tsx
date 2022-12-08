import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import AuthForm from "../../components/AuthForm";
import api from "../../services/api"

interface UserToken{
    profile: Object._id
    user: string

}

function Login() {
  
  const navigate = useNavigate()

  async function handleLogin(user: string, password: string){
    try{
      const { data } = await api.post("/security/login", {
          user,
          password
      })
      
      const { token } = data
      const decodedToken = jwt_decode(token) as UserToken      
      localStorage.setItem("profile", decodedToken.profile._id)
      localStorage.setItem("user", decodedToken.user)
      localStorage.setItem("accessToken", token)

      return navigate("/home")

    }catch(err){
      console.error(err)      
      alert("Ocorreu um erro no login")
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
