import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { TaskService } from '../../service/Tasks';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const TaskGrid = () => {
    const [tasks, setTasks] = useState([]);
    const [newVisible, setNewVisible] = useState(false);
    const [newTaskOwner, setNewTaskOwner] = useState([]);
    const [newTaskPriority, setNewTaskPriority] = useState([]);
    const [owners, setOwners] = useState([{
      name: "Matheus",
      userId: 1
    }, {
      name: "Gian",
      userId: 2
    }, {
      name: "Leandro",
      userId: 3
    }, {
      name: "Gustavo",
      userId: 4
    }]);
    const [priority, setPriority] = useState([{
      typeName: "Alta",
      type: 1
    }, {
      typeName: "Média",
      type: 2
    }, {
      typeName: "Alta",
      type: 3
    }]);

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
           <Dialog header="Criar novo Item" visible={newVisible} style={{width: '60vw', height: '70vh'}} onHide={() => setNewVisible(false)}>
            <div className="flex flex-column gap-2">
              <label htmlFor="taskName">Nome da Tarefa: </label>
              <InputText id="taskName"/>
            </div>
            <div className='flex mt-2'>
              <Dropdown 
                placeholder="Selecione um Responsável"
                options={owners}
                value={newTaskOwner}
                optionLabel="name" 
                onChange={(e) => setNewTaskOwner(e.value)}
                className="w-full"
              />
              <Dropdown 
                placeholder="Prioridade"
                options={priority}
                optionLabel="typeName" 
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.value)}
                className="w-full"
              />
            </div>
           </Dialog>
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
        <DataTable size='normal' value={tasks} rows={10} paginator header={header} footer={footer} scrollable={true} tableStyle={{ width: '65rem'}}>
          <Column field="name" header="Name"></Column>
          <Column field="price" header="Price" body={priceBodyTemplate}></Column>
          <Column field="category" header="Category"></Column>
          <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
          <Column header="Status" body={statusBodyTemplate}></Column>
        </DataTable>
    );
};

export default TaskGrid;