import { Link } from 'react-router-dom'
import { User, Lock } from "phosphor-react"
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import logo from '../../assets/parrot.svg';
import { FormEvent } from 'react';

interface AuthFormProps{
    formTitle: string;
    submitFormButtonText: string;
    linkDescription: string;
    submitFormButtonAction: (user: string, password: string) => void
    routeName: string;
}

function AuthForm({ formTitle, submitFormButtonText, linkDescription, submitFormButtonAction, routeName }: AuthFormProps){

  function handleSubmit(event: FormEvent){
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    submitFormButtonAction(
      form.elements.user.value, 
      form.elements.password.value)
  }

  return (
    <div className="text-cyan-50 flex flex-col items-center mt-16">
      <header className="flex flex-col items-center">
      <img src={logo} alt="Logo"/>
        <Heading size="lg" className="mt-2">Sysmap Parrot</Heading>
        <Text className="mt-1 opacity-50">{formTitle}</Text>
      </header>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4 items-stretch w-full max-w-sm mt-10">
        <label htmlFor="user" className="flex flex-col gap-2">
          <Text>Login</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <User />
            </TextInput.Icon>
            <TextInput.Input  id="user"type="text" placeholder="Digite seu login" />
          </TextInput.Root>
        </label>
        <label htmlFor="user" className="flex flex-col gap-2">
          <Text>Senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input  id="password"type="password" placeholder="*******" />
          </TextInput.Root>
        </label>
        <Button type="submit">{submitFormButtonText}</Button>
      </form>

        <footer className="flex flex-col items-center gap-4 mt-8">
            <Text size="sm">
              <Link to={routeName} className="text-gray-400 underline">{linkDescription}</Link>
            </Text>
        </footer>
    </div>
  );
}

export default AuthForm;