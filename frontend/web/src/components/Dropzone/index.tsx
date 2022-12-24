import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Image, UserCircle } from "phosphor-react";
import Text from "../Text";
import './index.css'

interface DropzoneProps{
    onFileUploaded: (file: File) => void
}

function Dropzone({onFileUploaded}: DropzoneProps){

    const [ selectedFileUrl, setSelectedFileUrl ] = useState("")

    const onDrop = useCallback((acceptedFiles: any[]) => {
        
        const file = acceptedFiles[0]
        const fileUrl = URL.createObjectURL(file)
        setSelectedFileUrl(fileUrl)
        onFileUploaded(file)

      }, [onFileUploaded])

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
      <div {...getRootProps()}>
      <input {...getInputProps()} />

      {selectedFileUrl ?
          (<div className='DropImageWithImage'>
              <img className="imageSelected" src={selectedFileUrl} alt='Point thumbnail' />
          </div>)
          :
          (<div className='DropImage'>
              <Image size={38} className="text-slate-100" />
              <h3>Selecione sua imagem</h3>
          </div>)}
  </div>
      )
}

interface IProps {
  onFileUploaded: (file: File) => void;
  midia: string | undefined;
}

export function DropZoneEdit({ onFileUploaded, midia }: IProps) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
      (acceptedFiles: any[]) => {
          const file = acceptedFiles[0];

          const fileUrl = URL.createObjectURL(file);
          setSelectedFileUrl(fileUrl);
          onFileUploaded(file);
      },
      [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
      onDrop,
  });

  return (
      <div {...getRootProps()}>
          <input {...getInputProps()} />

          {selectedFileUrl ?
              <img className="ImageEdit" src={selectedFileUrl} alt='Point thumbnail'style={{ width: '88px', borderRadius: '50px' }} />
              :
              (midia ?
                  <img src={midia} alt="profile" className="ImageEdit"/>
                  :
                  <div>
                      <UserCircle size={88} className="text-slate-100" />
                  </div>
              )
          }
      </div>
  );
}

export default Dropzone