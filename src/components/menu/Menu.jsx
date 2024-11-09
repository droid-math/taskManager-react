import React, { useState } from 'react';
import { Menu } from 'primereact/menu';
import NewUserDialog from '../dialogs/NewUser';
import UsersDialog from '../dialogs/Users';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from 'react-router-dom';

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
          label: 'Sair',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            onConfirmLogout()
          }
        },
      ]);
      const navigate = useNavigate();
      const onConfirmLogout = () => {
        confirmDialog({
            message: 'Você realmente quer se deslogar?',
            header: 'Confirmação',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept,
            reject
        });
    };

    const accept = () => {
      navigate("/login")
    }

    const reject = () => {
    }
    return (
      <div className="mr-4 font-semibold text-lg">
        <Menu model={items} style={{height: "92vh", width: "280px"}}/>
        <NewUserDialog setNewUserWindow={setNewUserWindow} newUserWindow={newUserWindow} />
        <UsersDialog setUsersWindow={setUsersWindow} usersWindow={usersWindow} />
        <ConfirmDialog />
      </div>
    );
};

export default LeftMenu;