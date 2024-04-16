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
    
      const ratingBodyTemplate = (task) => {
        return <Rating value={task.rating} readOnly cancel={false} />;
      };
    
      const statusBodyTemplate = (task) => {
          return <Tag value={task.inventoryStatus} severity={getSeverity(task)}></Tag>;
      };
    
      const header = (
        <div className="align-items-center justify-content-between">
           <Button label="Novo" icon="pi pi-plus" size="small" onClick={() => setNewVisible(true)} />
           <NewDialog setVisible={setNewVisible} newVisible={newVisible}/>
        </div>
      );
      const footer = `In total there are ${tasks ? tasks.length : 0} products.`;
    
      const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';
    
            case 'LOWSTOCK':
                return 'warning';
    
            case 'OUTOFSTOCK':
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
            <Column field="category" header="Prioridade"></Column>
            <Column field="rating" header="Status" body={ratingBodyTemplate}></Column>
            <Column header="Status" body={statusBodyTemplate}></Column>
          </DataTable>
        </div>
    );
};

export default TaskGrid;