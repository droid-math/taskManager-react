import React, { useState } from 'react';
import { Menu } from 'primereact/menu';

const LeftMenu = () => {
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
        {
          label: 'Login',
          icon: 'pi pi-fw pi-sign-out',
        },
      ]);
    return (
        <Menu model={items} className="w-full mr-4 md:w-4 rem font-semibold text-lg"  />
    );
};

export default LeftMenu;