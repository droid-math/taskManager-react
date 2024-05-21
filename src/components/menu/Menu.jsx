import React, { useState } from 'react';
import { Menu } from 'primereact/menu';
import NewUserDialog from '../dialogs/NewUser';

const LeftMenu = () => {
    const [newUserWindow, setNewUserWindow] = useState(false) 
    const [items, setItems] = useState([
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-home',
        },
        {
          label: 'Criar Usuário',
          icon: 'pi pi-fw pi-user',
          command: () => {
            setNewUserWindow(true)
          }
        },
      ]);
    return (
      <div className="mr-4  font-semibold text-lg">
        <Menu model={items} />
        <NewUserDialog setNewUserWindow={setNewUserWindow} newUserWindow={newUserWindow} />
      </div>
    );
};

export default LeftMenu;