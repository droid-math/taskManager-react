import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import axios from 'axios';

const NewDialog = ({setVisible, newVisible}) => {
    const [newTaskOwner, setNewTaskOwner] = useState([]);
    const [newTaskPriority, setNewTaskPriority] = useState([]);
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [taskName, setTaskName] = useState(null);
    const [taskDescription, setTaskDescription] = useState(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://localhost:5000/users');
          debugger
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);

    const handleCreateTask = async () => {
      try {
        const response = await axios.post('http://localhost:5000/tasks', {
          name: taskName,
          description: taskDescription,
          priority: newTaskPriority.id,
          owner: newTaskOwner.userid
        });
  
        console.log('Task created successfully');
        // Fechar o diálogo após a criação bem-sucedida da tarefa
        setVisible(false);
      } catch (error) {
        console.error('There was an error creating the task!', error);
        // Você pode exibir uma mensagem de erro ao usuário aqui
      }
    };

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
        <Dialog visible={newVisible} header="Criar novo Item" style={{width: '60vw', height: '75vh'}} onHide={() => setVisible(false)}>
            <div className="flex flex-column gap-2">
              <label htmlFor="taskName">Nome da Tarefa: </label>
              <InputText id="taskName" onChange={(e) => setTaskName(e.target.value)}/>
            </div>
            <div className='flex mt-2'>
              <Dropdown 
                placeholder="Selecione um Responsável"
                options={users}
                value={newTaskOwner}
                optionLabel="name"
                disabled={loading}
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
              <InputTextarea autoResize id="taskDescription" onChange={(e) => setTaskDescription(e.target.value)} rows={8} cols={30} />
            </div>
            <div className="dialogBtns pt-2 flex justify-content-end">
              <Button label="Criar" onClick={handleCreateTask} icon="pi pi-plus" size="small"/>
            </div>
        </Dialog>
    );
};

export default NewDialog;