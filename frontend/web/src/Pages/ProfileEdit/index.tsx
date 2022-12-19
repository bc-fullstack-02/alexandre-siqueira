import { ChangeEvent, FormEvent, useState, useEffect } from "react"
import { Stack, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import Dropzone from "../../components/Dropzone"
import Menu from "../../components/Menu"
import Text from "../../components/Text"
import { TextInput } from "../../components/TextInput"
import { Profile } from "../../Model/Profile"
import api from "../../services/api"
import { toast } from "react-toastify"
import logo from "../../assets/logo-menu.svg"
import { Post } from "../../Model/Post"

function ProfileEdit() {
  
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
      } catch (error) {
          toast.warning('Erro ao obter o perfil!', {
              icon: () => <img src={logo} alt="logo" />,
          })
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
      toast.warning("Ocorreu um erro ao editar o perfil!", {
        icon: () => <img src={logo} alt="logo SocialMap" />,
      });
    }
  };


  return (
    <div className="w-screen h-screen flex">
      <Menu newPostCreated={function (post: Post): void {
              throw new Error("Function not implemented.");
          } } />
      <div className="mainNewPost">
        <div className="ProfileImageEdit">
          <Text>Foto de Perfil</Text>
          <TextInput.Root>
            <Dropzone onFileUploaded={setSelectedFile} />
          </TextInput.Root>
        </div>

        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <h3 className="titleEdit text-cyan-50">Nome</h3>
            <TextField
              variant="standard"
              name="name"
              value={formData.name}
              placeholder={profile.name}
              onChange={handleInputChange}
              style={{ marginTop: "5px" }}
            />

            <h3 className="titleEdit text-cyan-50">Email</h3>
            <TextField
              variant="standard"
              name="email"
              placeholder={profile.email}
              value={formData.email}
              onChange={handleInputChange}
              style={{ marginTop: "5px" }}
            />

            <div className="flex flex-1 gap-2">
              <Button onClick={() => window.location.reload()}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </Stack>
        </form>
      </div>
    </div>
  );
}
export default ProfileEdit;
