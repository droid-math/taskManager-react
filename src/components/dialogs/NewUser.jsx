import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';

const NewUserDialog = ({ setNewUserWindow, newUserWindow }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [foto, setFoto] = useState(null);

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users', {
        name: name,
        password: password,
        foto: foto
      });
  
      console.log('User created successfully');
      // Feche o diálogo após a criação bem-sucedida do usuário
      setNewUserWindow(false);
    } catch (error) {
      console.error('There was an error creating the user!', error);
      // Você pode exibir uma mensagem de erro ao usuário aqui
    }
  };

  const onFileSelect = async (event) => {
    const selectedFile = event.files[0];
    const base64Image = await convertImageToBase64(selectedFile);
    setFoto(base64Image);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <Dialog visible={newUserWindow} header="Criar um Novo Usuário" style={{ width: '30vw', height: '50vh' }} onHide={() => setNewUserWindow(false)}>
      <div className="p-field">
        <label htmlFor="foto">Foto:</label>
        <FileUpload name="foto" accept="image/*" mode='basic' customUpload onSelect={onFileSelect}/>
      </div>
      <div className="p-field flex flex-column gap-2 mt-4">
        <label htmlFor="name">Nome:</label>
        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="p-field flex flex-column gap-2">
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