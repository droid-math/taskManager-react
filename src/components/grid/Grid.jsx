import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { TaskService } from '../../service/Tasks';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import NewDialog from '../dialogs/New';
import './Grid.scss'

const TaskGrid = () => {
    const [tasks, setTasks] = useState([]);
    const [newVisible, setNewVisible] = useState(false);
    const [gridSelected, setGridSelected] = useState(null);
    const [editData, setEditData] = useState(null);
    useEffect(() => {
        setTasks(TaskService.getTasksData());
    }, []);

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

    const priorityString = ['Baixa', 'Média', 'Alta']

    const handleEdit = (item) => {
        // Implementar a lógica de edição do item
        console.log('Editar item:', item);
    };

    const onDeleteTask = (event) => {
      confirmPopup({
          target: event.currentTarget,
          message: 'Tem certeza que deseja apagar essa tarefa',
          icon: 'pi pi-info-circle',
          defaultFocus: 'reject',
          acceptClassName: 'p-button-danger',
          accept,
          reject
      });
  };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      };
    
      const priceBodyTemplate = (task) => {
        return formatCurrency(task.price);
      };
    
      const priorityBodyTemplate = (task) => {
          return <Tag value={priorityString[task.taskPriority]}></Tag>;
      };
      
      const statusBodyTemplate = (task) => {
        return <Tag value={statusString[task.taskStatus].text} severity={getSeverity(task.taskStatus)}></Tag>;
    };
      
      const header = (
        <div className="align-items-center justify-content-between">
           <ConfirmPopup/>
           <Button label="Novo" icon="pi pi-plus" size="small" onClick={() => setNewVisible(true)} />
           <NewDialog setVisible={setNewVisible} newVisible={newVisible} editData={editData}/>
        </div>
      );
      const footer = `Existem ${tasks ? tasks.length : 0} tarefas cadastradas.`;
    
      const getSeverity = (task) => {
        switch (task) {
            case 2:
                return 'success';
    
            case 1:
                return 'warning';
    
            case 0:
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
          <DataTable size='small' editMode="cell" value={tasks} rows={9} paginator header={header} footer={footer} scrollable={true} tableStyle={{ width: '65rem'}}>
            <Column field="name" header="Descrição"></Column>
            <Column field="price" header="Responsável" body={priceBodyTemplate}></Column>
            <Column header="Prioridade" body={priorityBodyTemplate} align="center" alignHeader="center"></Column>
            <Column header="Status" body={statusBodyTemplate} align="center" alignHeader="center"></Column>
            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '3rem' }}></Column>
          </DataTable>
        </div>
    );
};

export default TaskGrid;