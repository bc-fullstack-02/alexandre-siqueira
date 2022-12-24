import { useNavigate } from "react-router-dom";
import Heading from "../Heading";
import Text from "../Text";
import { User, UserCircle, Lock, Envelope } from "phosphor-react";
import Button from "../Button";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getAuthHeader } from "../../services/auth";
import api from "../../services/api";
import { TextInput } from "../TextInput";
import Dropzone from "../Dropzone";

function EditProfile() {
  const profileClean = {
    _id: "",
    name: "",
    email: "",
    image: true,
    imageUrl: "",
    user: "",
    following: [""],
    followers: [""],
  }

  const [selectedFile, setSelectedFile] = useState<File>()
  const navigate = useNavigate()
  const user = localStorage.getItem("user")
  const token = localStorage.getItem("accessToken")
  const profileId = localStorage.getItem("profile")

  const [profile, setProfile] = useState<Profile>(profileClean)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  useEffect(() => {
    const getProfile = async () => {
      try {
          const responseProfile = await api.get(`/profiles/${profileId}`, {
              headers: { authorization: `Bearer ${token}` }
          });
          setProfile(responseProfile.data)
          setFormData({
              name: responseProfile.data.name,
              email: responseProfile.data.email,
          })
      } catch (err) {
        console.error(err)
        alert('Erro ao carregar dados do usuário!')
      }
  }
  getProfile()
}, [token, profileId])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { name, email } = formData;
    const data = new FormData();

    data.append("name", name as string);
    data.append("email", email as string);
    if (selectedFile) {
      data.append("file", selectedFile);
    }
    try {
            console.log(data);
            const response = await api.put("/profiles", data, {
              headers: { authorization: `Bearer ${token}` },
            })
            console.log(response);
            navigate("/home");
    } catch (err) {
      console.error(err)
      alert('Erro ao tentar atualizar o perfil do usuário!')
    }
  }

  return (
    <div className="basis-4/6 overflow-y-auto scroll-smooth">
      <Heading className="border-b border-slate-400 mt-4">
        <Text size="lg" className="font-extrabold ml-5">
          Perfil
        </Text>
        <div className="flex flex-row items-center ml-5 my-4">
          {profile.image ? (
            <img
              className="border-solid border-2 border-sky-500"
              src={profile.imageUrl}
              style={{ width: "5%", borderRadius: "50px" }}
            />
          ) : (
            <UserCircle size={48} className="text-slate-100" />
          )}
          <Text className="font-extrabold ml-2">{user}</Text>
        </div>
      </Heading>
      <div className="mt-4 w-full flex flex-col items-stretch max-w-sm  justify-end">
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-stretch w-full max-w-sm mt-10 ml-4"
          >
            <label htmlFor="image" className="flex flex-col gap-2">
              <Text>Foto de Perfil</Text>
              <TextInput.Root>
                <Dropzone onFileUploaded={setSelectedFile} />
              </TextInput.Root>
            </label>

            <label htmlFor="name" className="flex flex-col gap-2">
              <Text>Nome</Text>
              <TextInput.Root>
                <TextInput.Icon>
                  <User />
                </TextInput.Icon>
                <TextInput.Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder={profile.name}
                  onChange={handleInputChange}
                />
              </TextInput.Root>
            </label>

            <label htmlFor="email" className="flex flex-col gap-2">
              <Text>E-mail</Text>
              <TextInput.Root>
                <TextInput.Icon>
                  <Envelope />
                </TextInput.Icon>
                <TextInput.Input
                  name="email"
                  id="email"
                  type="text"
                  placeholder={profile.email}
                  onChange={handleInputChange}
                />
              </TextInput.Root>
            </label>

            <div className="flex flex-1 gap-2">
              <Button onClick={() => window.location.reload()}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;
