import React from 'react';
import TaskGrid from '../../components/grid/Grid';
import LeftMenu from '../../components/menu/Menu';

import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './Dashboard.css';


const Dashboard = () => {
  return (
    <div className='app flex'>
      <LeftMenu />
      <TaskGrid />
    </div>
  );
};

export default Dashboard;