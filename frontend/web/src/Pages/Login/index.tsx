import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import AuthForm from "../../components/AuthForm";
import api from "../../services/api"

interface UserToken{
    profile: string
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
      console.log(JSON.stringify(data))
      /* const decodedToken =jwt_decode(token, ...data) as UserToken      
      localStorage.setItem("profile", decodedToken.profile)
      localStorage.setItem("user", decodedToken.user)
      localStorage.setItem("accessToken", data.accessToken) */

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
      linkDescription="Não possui conta? Crei uma conta agora!"
      submitFormButtonAction={handleLogin}
      routeName="/singup"
    />
  );
}

export default Login;
