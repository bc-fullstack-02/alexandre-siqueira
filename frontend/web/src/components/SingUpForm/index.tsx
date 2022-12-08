import { Link } from 'react-router-dom'
import { FaRegUser, FaLock, FaRegEnvelope, FaAddressCard } from 'react-icons/fa';
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import logo from '../../assets/parrot.svg';
import { FormEvent } from 'react';

interface SingUpFormProps{
  formTitle: string;
  submitFormButtonText: string;
  linkDescription: string;
  submitFormButtonAction: (name: string, user: string, password: string, email: string) => void
  routeName: string;
}

function SingUpForm({ 
  formTitle, 
  submitFormButtonText, 
  linkDescription, 
  submitFormButtonAction, 
  routeName 
}: SingUpFormProps){

  function handleSubmit(event: FormEvent){
    event.preventDefault()
    const form = event.target as HTMLFormElement

    submitFormButtonAction(
        form.elements.name.value,
        form.elements.user.value, 
        form.elements.password.value,
        form.elements.email.value
      )
  }

  return (
    <div className="text-cyan-50 flex flex-col items-center mt-16">
      <header className="flex flex-col items-center">
      <img src={logo} alt="Logo"/>
        <Heading size="lg" className="mt-2">Sysmap Parrot</Heading>
        <Text className="mt-1 opacity-50">{formTitle}</Text>
      </header>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4 items-stretch w-full max-w-sm mt-10">
      <label htmlFor="name" className="flex flex-col gap-2">
          <Text>Nome</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <FaAddressCard />
            </TextInput.Icon>
            <TextInput.Input  id="name" type="text" placeholder="Digite seu nome" />
          </TextInput.Root>
        </label>
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
        <label htmlFor="name" className="flex flex-col gap-2">
          <Text>E-mail</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <FaRegEnvelope />
            </TextInput.Icon>
            <TextInput.Input  id="email" type="text" placeholder="Digite seu e-mail" />
          </TextInput.Root>
        </label>
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

export default SingUpForm;