import React, { useEffect, useState } from 'react';
import { TaskService } from './service/Tasks';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menu } from 'primereact/menu';
import { Panel } from 'primereact/panel';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';

import 'primereact/resources/themes/soho-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';


const App = () => {
  const [tasks, setTasks] = useState([])
  const [items, setItems] = useState([
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
    },
    {
      label: 'Gerenciar Usuários',
      icon: 'pi pi-fw pi-user',
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-sign-out',
    },
  ]);
  useEffect(() => {
    setTasks(TaskService.getTasksData());
  }, []);

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
       <Button label="Novo" icon="pi pi-plus" size="small" />
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

  const handleEdit = (item) => {
    // Implementar a lógica de edição do item
    console.log('Editar item:', item);
  };

  return (
    <div className='app flex'>
      <Menu model={items} className="w-full mr-4 md:w-12 rem font-semibold text-lg"  />
      <div className='max-h-2rem'>
        <DataTable className='border-round-sm' size='normal' value={tasks} rows={10} paginator header={header} footer={footer} scrollable={true} tableStyle={{ minWidth: '60rem' }}>
          <Column field="name" header="Name"></Column>
          <Column field="price" header="Price" body={priceBodyTemplate}></Column>
          <Column field="category" header="Category"></Column>
          <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
          <Column header="Status" body={statusBodyTemplate}></Column>
      </DataTable>
      </div>
    </div>
  );
};

export default App;