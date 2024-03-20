import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menu } from 'primereact/menu';
import { Panel } from 'primereact/panel';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import TaskGrid from './components/grid/Grid';
import LeftMenu from './components/menu/Menu';

import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';


const App = () => {
  const [tasks, setTasks] = useState([])

  const handleEdit = (item) => {
    // Implementar a lógica de edição do item
    console.log('Editar item:', item);
  };

  return (
    <div className='app flex'>
      <LeftMenu />
      <div>
        <TaskGrid />
      </div>
    </div>
  );
};

export default App;