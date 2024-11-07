import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/image';
import { Avatar } from 'primereact/avatar';
import axios from 'axios';
import previewImage from '../../assets/user.png'

const NewUserDialog = ({ setNewUserWindow, newUserWindow }) => {
    const toast = useRef(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [foto, setFoto] = useState(null);
    const [userPicture, setUserPicture] = useState(previewImage);

    const handleCreateUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/users', {
                name: name,
                password: password,
                foto: foto
            });
        
            toast.current.show({severity:'success', summary: 'Sucesso', detail:'Usuário criado com Sucesso!', life: 2000});
            setNewUserWindow(false);
        } catch (error) {
            toast.current.show({severity:'error', summary: 'Erro', detail:'Erro ao criar Usuário', life: 2000});
        }
    };

    const onFileSelect = async (event) => {
        const selectedFile = event.files[0];
        const base64Image = await convertImageToBase64(selectedFile);
        setFoto(base64Image);
        setUserPicture(base64Image);
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        });
    };

    const onHide = () => {
        setName(null);
        setPassword(null);
        setFoto(null);
        setNewUserWindow(false)
    }

    return (
        <Dialog visible={newUserWindow} className='dialog' header="Criar um Novo Usuário" style={{ width: '500px', height: '484px' }} onHide={onHide}>
            <Toast ref={toast} />
            <div className="flex justify-content-center flex-wrap">
                <div className='text-center'>
                    <Image imageStyle={{borderRadius: "50%"}} src={userPicture} width='100' height='100'/>
                    <FileUpload name="foto" accept="image/*" className='mt-2' chooseLabel="Escolher Imagem" mode='basic' customUpload onSelect={onFileSelect}/>
                </div>
            </div>
            <div className="p-field flex flex-column gap-2 mt-2">
                <label htmlFor="name">Nome:</label>
                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="p-field flex flex-column gap-2 mt-2">
                <label htmlFor="password">Senha:</label>
                <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="p-dialog-footer">
                <Button label="Cancelar" onClick={() => setNewUserWindow(false)} className="p-button-text" />
                <Button label="Criar" icon="pi pi-plus" onClick={handleCreateUser} autoFocus />
            </div>
        </Dialog>
    );
};

export default NewUserDialog;