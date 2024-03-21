import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';

const NewDialog = () => {
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
    return (
        <Dialog header="Criar novo Item" style={{width: '60vw', height: '70vh'}}>
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
                className="w-full mr-1"
              />
              <Dropdown 
                placeholder="Prioridade"
                options={priority}
                optionLabel="typeName" 
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.value)}
                className="w-full ml-1"
              />
            </div>
            <div className="flex flex-column gap-2 mt-2">
              <label htmlFor="taskDescription">Descrição da Tarefa: </label>
              <InputTextarea autoResize id="taskDescription" rows={8} cols={30} />
            </div>
        </Dialog>
    );
};

export default NewDialog;