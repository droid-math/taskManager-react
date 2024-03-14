import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menu } from 'primereact/menu';
import { Panel } from 'primereact/panel';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import TaskGrid from './components/Grid'

import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
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

  const handleEdit = (item) => {
    // Implementar a lógica de edição do item
    console.log('Editar item:', item);
  };

  return (
    <div className='app flex'>
      <Menu model={items} className="w-full mr-4 md:w-2 rem font-semibold text-lg"  />
      <div>
        <TaskGrid />
      </div>
    </div>
  );
};

export default App;