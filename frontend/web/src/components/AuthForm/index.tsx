import { Link } from 'react-router-dom'
import { FaRegUser, FaLock, FaRegEnvelope, FaAddressCard, FaRegUserCircle } from 'react-icons/fa';
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
  submitFormButtonAction: ( auth: Auth ) => void
  routeName: string;
  showOptional: boolean;
}

interface AuthFormElements extends HTMLFormControlsCollection{  
  user: HTMLInputElement;
  password: HTMLInputElement;
  fullName?: HTMLInputElement;
  email?: HTMLInputElement;
  image?: HTMLInputElement;
  
}

interface AuthFormElement extends HTMLFormElement{
  readonly elements: AuthFormElements
}

export interface Auth{
  user: string;
  password: string;
  fullName?: string;
  email?: string;
  image?: string;

}

function AuthForm({ 
  formTitle, 
  submitFormButtonText, 
  linkDescription, 
  submitFormButtonAction, 
  routeName,
  showOptional
}: AuthFormProps){

  function handleSubmit(event: FormEvent<AuthFormElement>){
    event.preventDefault()
    const form = event.currentTarget

      const auth = {
        user: form.elements.user.value,
        password: form.elements.password.value,
        fullName: form.elements.fullName?.value,
        email: form.elements.email?.value,
        image: form.elements.image?.value

      }

    submitFormButtonAction(auth)
  }

  return (
    <div className="text-cyan-50 flex flex-col items-center mt-16">
      <header className="flex flex-col items-center">
      <img src={logo} alt="Logo"/>
        <Heading size="lg" className="mt-2">Sysmap Parrot</Heading>
        <Text className="mt-1 opacity-50">{formTitle}</Text>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-stretch w-full max-w-sm mt-10">  
        <label htmlFor="user" className="flex flex-col gap-2">
          <Text>Login</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <FaRegUser />
            </TextInput.Icon>
            <TextInput.Input  id="user" type="text" placeholder="Digite seu login" />
          </TextInput.Root>
        </label>
        <label htmlFor="password" className="flex flex-col gap-2">
          <Text>Senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <FaLock />
            </TextInput.Icon>
            <TextInput.Input  id="password" type="password" placeholder="***********" />
          </TextInput.Root>
        </label>
        {showOptional && (
          <>
            <label htmlFor="fullName" className="flex flex-col gap-2">
              <Text>Nome</Text>
              <TextInput.Root>
                <TextInput.Icon>
                  <FaAddressCard />
                </TextInput.Icon>
                <TextInput.Input id="fullName" type="text" placeholder="Digite seu nome" />
              </TextInput.Root>
            </label>
            <label htmlFor="email" className="flex flex-col gap-2">
              <Text>E-mail</Text>
              <TextInput.Root>
                <TextInput.Icon>
                  <FaRegEnvelope />
                </TextInput.Icon>
                <TextInput.Input id="email" type="text" placeholder="Digite seu e-mail" />
              </TextInput.Root>
            </label>
            <label htmlFor="image" className="flex flex-col gap-2">
              <Text>Foto de Perfil</Text>
              <TextInput.Root>
                <TextInput.Icon>
                  <FaRegUserCircle />
                </TextInput.Icon>
                <TextInput.Input id="image" type="text" placeholder="Digite seu e-mail" />
              </TextInput.Root>
            </label>

          </>           
        )}
        
        <Button type="submit" className='mt-4'>{submitFormButtonText}</Button>
      </form>
      <footer className="flex flex-col items-center gap-4 mt-8">
          <Text asChild size="sm">
            <Link 
              to={routeName} 
              className="text-gray-400 underline hover:text-gray-200">{linkDescription}
            </Link>
        </Text>
      </footer>
    </div>
  );
}

export default AuthForm;