import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { TaskService } from '../../service/Tasks';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import NewDialog from '../dialogs/New';
import './Grid.scss'

const TaskGrid = () => {
    const [tasks, setTasks] = useState([]);
    const [newVisible, setNewVisible] = useState(false);
    const [gridSelected, setGridSelected] = useState(null);
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
        return <Tag value={statusString[task.taskStatus]} severity={getSeverity(task)}></Tag>;
    };
      
      const header = (
        <div className="align-items-center justify-content-between">
           <Button label="Novo" icon="pi pi-plus" size="small" onClick={() => setNewVisible(true)} />
           <Button label="Apagar" icon="pi pi-trash" size="small" severity="danger" disabled={!gridSelected}/>
           <NewDialog setVisible={setNewVisible} newVisible={newVisible}/>
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
          <DataTable size='small' editMode="cell" selection={gridSelected} value={tasks} onSelectionChange={(e) => setGridSelected(e.value)} selectionMode="single" rows={9} paginator header={header} footer={footer} scrollable={true} tableStyle={{ width: '65rem'}}>
            <Column field="name" header="Descrição"></Column>
            <Column field="price" header="Responsável" body={priceBodyTemplate}></Column>
            <Column header="Prioridade" body={priorityBodyTemplate} align="center" alignHeader="center"></Column>
            <Column header="Status" body={statusBodyTemplate} align="center" alignHeader="center" editor={(options) => statusEditor(options)}></Column>
          </DataTable>
        </div>
    );
};

export default TaskGrid;