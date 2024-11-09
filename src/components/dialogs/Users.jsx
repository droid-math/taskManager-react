import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { TaskService } from '../../service/Tasks';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import NewDialog from '../dialogs/New';
import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import '../grid/Grid.scss';
import NewUserDialog from '../dialogs/NewUser';
import userImage from '../../assets/user.png'
import axios from 'axios';

const UsersDialog = ({ setUsersWindow, usersWindow }) => {
    const [users, setUsers] = useState([]);
    const [newUserWindow, setNewUserWindow] = useState(false)

    const onShowUsers = () => {
        fetchUsers();
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const onConfirmDelete = (rowData) => {
        confirmDialog({
            message: 'Você realmente quer deletar esse usuário?',
            header: 'Confirmação',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => accept(rowData),
            reject
        });
    };

    const accept = async (rowData) => {
        try {
            const response = await axios.delete(`http://localhost:5000/users/${rowData.userid}`)
            if (response.status === 200) {
                fetchUsers();
            } else {
                const errorData = await response.json()
                alert(errorData.message || "Erro ao excluir usuário")
            }
        } catch (error) {
            console.error('Erro no processo:', error);
        }
    }

    const reject = () => {
    }

    const actionBodyTemplate = (rowData) => {
      return (
          <React.Fragment>
              <Button icon="pi pi-trash" severity='danger' rounded outlined className="mr-2" onClick={() => onConfirmDelete(rowData)}/>
          </React.Fragment>
      );
  };

    const iconUserTemplate = (user) => {
        const photo = user.foto ? user.foto : userImage;
        return <Avatar image={photo} size="large" shape="circle" />
    };

  return (
    <div>
        <Dialog visible={usersWindow} header="Usuários" style={{ width: '500px', height: '540px' }} onShow={onShowUsers} onHide={() => setUsersWindow(false)}>
          <Button label="Novo" className="mb-3" icon="pi pi-plus" size="small" onClick={() => setNewUserWindow(true)} />
          <div className="grid">
              <DataTable size='small' showHeaders={false} value={users} rows={10} paginator tableStyle={{ width: '480px', height: '314px'}}>
                <Column body={iconUserTemplate} exportable={false} style={{ minWidth: '1rem' }}></Column>
                <Column field="name" style={{ minWidth: '22rem' }}></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ width: '100px' }}></Column>
              </DataTable>
              <ConfirmDialog/>
            </div>
        </Dialog>
        <NewUserDialog setNewUserWindow={setNewUserWindow} newUserWindow={newUserWindow} />
    </div>
  );
};

export default UsersDialog;