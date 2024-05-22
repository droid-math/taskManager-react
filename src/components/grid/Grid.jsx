import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { TaskService } from '../../service/Tasks';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import NewDialog from '../dialogs/New';
import { Avatar } from 'primereact/avatar';
import userImage from '../../assets/user.png'
import './Grid.scss';
import axios from 'axios';

const TaskGrid = () => {
    const [tasks, setTasks] = useState([]);
    const [newVisible, setNewVisible] = useState(false);
    const [gridSelected, setGridSelected] = useState(null);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        if (!newVisible) {
            fetchTasks();
        }
    }, [newVisible]);

    const statusString = [{
      text: 'Á Fazer',
      id: 0
    }, { 
      text: 'Em Andamento',
      id: 1
    }, {
      text: 'Concluído',
      id: 2
    }];

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const priorityString = ['Baixa', 'Média', 'Alta']

    const handleEdit = (item) => {
        // Implementar a lógica de edição do item
        console.log('Editar item:', item);
    };
    
    const priorityBodyTemplate = (task) => {
      return <Tag value={task.priority}></Tag>;
    };
      
    const statusBodyTemplate = (task) => {
      return <Tag value={task.status} severity={getSeverity(task.status)}></Tag>;
    };

    const ownerBodyTemplate = (task) => {
      const photo = task.usuario.photo ? task.usuario.photo : userImage
      return (
        <div className='flex flex-wrap text-center justify-items-center align-items-center'>
          <Avatar image={photo} size="large" shape="circle" />
          <span className='vertical-align-baseline ml-2'>{task.usuario.name}</span>
        </div>
      );
    };
      
      const header = (
        <div className="align-items-center justify-content-between">
           <ConfirmPopup/>
           <Button label="Novo" icon="pi pi-plus" size="small" onClick={() => setNewVisible(true)} />
           <NewDialog setVisible={setNewVisible} newVisible={newVisible} setEditData={setEditData} editData={editData}/>
        </div>
      );
      const footer = `Existem ${tasks ? tasks.length : 0} tarefas cadastradas.`;
    
      const getSeverity = (task) => {
        switch (task) {
            case 'Não Finalizado':
                return null;
            case 'Em Andamento':
                return 'warning';
            case 'Finalizado':
                return 'success';
            case 'Abandonado':
                return 'danger';
            default:
                return null;
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => {
                    setNewVisible(true)
                    setEditData(rowData)
                }} />
            </React.Fragment>
        );
    };

    const statusEditor = (options) => {
      return (
          <Dropdown
              value={options.value}
              options={statusString}
              onChange={(e) => options.editorCallback(e.value)}
              placeholder="Select a Status"
              itemTemplate={(option) => {
                  return <Tag value={option} severity={getSeverity(option.id)}></Tag>;
              }}
          />
      );
    };

    return (
        <div className="grid">
          <DataTable size='small' style={{height: "95vh"}} editMode="cell" value={tasks} rows={9} alwaysShowPaginator={false} paginator header={header} footer={footer} scrollable={true} tableStyle={{ width: '60vw'}}>
            <Column field="name" header="Tarefa:"></Column>
            <Column header="Responsavél" body={ownerBodyTemplate} align="center" alignHeader="center"></Column>
            <Column header="Prioridade" body={priorityBodyTemplate} align="center" alignHeader="center"></Column>
            <Column header="Status" body={statusBodyTemplate} align="center" alignHeader="center"></Column>
            <Column body={actionBodyTemplate} exportable={false} style={{ width: '100px' }}></Column>
          </DataTable>
        </div>
    );
};

export default TaskGrid;