import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menu } from 'primereact/menu';
import { Panel } from 'primereact/panel';

import 'primereact/resources/themes/soho-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';


const App = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Item 1', description: 'Descrição do Item 1' },
    { id: 2, name: 'Item 2', description: 'Descrição do Item 2' },
    { id: 3, name: 'Item 3', description: 'Descrição do Item 3' },
  ]);
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

  const columns = [
    <Column field="name" header="Nome" />,
    <Column field="description" header="Descrição" />,
  ];


  return (
    <div className='app flex'>
      <Menu model={items} className="w-full mr-4 md:w-8 rem font-semibold text-lg"  />
      <div>
        <div className='flex mx-auto'>
          <Panel header="Header" className='mr-2'>
            <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Panel>
          <Panel header="Header" className='ml-2'>
            <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default App;