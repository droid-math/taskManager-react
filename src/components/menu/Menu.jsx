import React, { useState } from 'react';
import { Menu } from 'primereact/menu';
import NewUserDialog from '../dialogs/NewUser';
import UsersDialog from '../dialogs/Users';

const LeftMenu = () => {
    const [newUserWindow, setNewUserWindow] = useState(false) 
    const [usersWindow, setUsersWindow] = useState(false) 
    const [items, setItems] = useState([
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-home',
        },
        {
          label: 'Usuários',
          icon: 'pi pi-fw pi-user',
          command: () => {
            setUsersWindow(true)
          }
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
      <div className="mr-4 font-semibold text-lg">
        <Menu model={items} style={{height: "95vh", width: "15vw"}}/>
        <NewUserDialog setNewUserWindow={setNewUserWindow} newUserWindow={newUserWindow} />
        <UsersDialog setUsersWindow={setUsersWindow} usersWindow={usersWindow} />
      </div>
    );
};

export default LeftMenu;