import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { TaskService } from '../../service/Tasks';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import NewDialog from '../dialogs/New';
import './Grid.scss'

const TaskGrid = () => {
    const [tasks, setTasks] = useState([]);
    const [newVisible, setNewVisible] = useState(false);

    useEffect(() => {
        setTasks(TaskService.getTasksData());
    }, []);

    const statusString = ['Á Fazer', 'Em Andamento', 'Concluído'];
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
           <NewDialog setVisible={setNewVisible} newVisible={newVisible}/>
        </div>
      );
      const footer = `In total there are ${tasks ? tasks.length : 0} products.`;
    
      const getSeverity = (task) => {
        switch (task.taskStatus) {
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

    return (
        <div className="grid">
          <DataTable size='small' value={tasks} selectionMode="single" rows={9} paginator header={header} footer={footer} scrollable={true} tableStyle={{ width: '65rem'}}>
            <Column field="name" header="Descrição"></Column>
            <Column field="price" header="Responsável" body={priceBodyTemplate}></Column>
            <Column header="Prioridade" body={priorityBodyTemplate} align="center" alignHeader="center"></Column>
            <Column header="Status" body={statusBodyTemplate} align="center" alignHeader="center"></Column>
          </DataTable>
        </div>
    );
};

export default TaskGrid;