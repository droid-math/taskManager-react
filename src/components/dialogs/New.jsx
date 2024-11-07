import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Avatar } from 'primereact/avatar';
import userImage from '../../assets/user.png'
import axios from 'axios';

const NewDialog = ({setVisible, newVisible, setEditData, editData}) => {
    const toast = useRef(null);
    const [newTaskOwner, setNewTaskOwner] = useState([]);
    const [newTaskPriority, setNewTaskPriority] = useState([]);
    const [newTaskStatus, setNewTaskStatus] = useState([]);
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [taskName, setTaskName] = useState([]);
    const [taskDescription, setTaskDescription] = useState([]);
    const title = !editData ? 'Criar nova Tarefa' : editData.name;
    const editMode = editData ? true : false;

    const fetchUsers = async () => {
		try {
			setLoading(true);
			const response = await axios.get('http://localhost:5000/users');
			setUsers(response.data);
		} catch (error) {
			toast.current.show({severity:'error', summary: 'Erro!', detail:'Erro ao retornar Usuários :(', life: 2000});
            setVisible(false);
		} finally {
			setLoading(false);
		}
    };

	useEffect(() => {
		prepareDialog();
	}, [users]);


	const prepareDialog = () => {
		if (editData) {
			setNewTaskOwner(users.find(p => p.userid === editData.user.id));
			setNewTaskPriority(priorities.find(p => p.typeName === editData.priority))
			setTaskName(editData.name)
			setTaskDescription(editData.description)
            return;
		}
        setNewTaskStatus(statusData.find(p => p.statusName === 'Não Finalizado'))
	};

    const handleCreateTask = async () => {
		try {
			const response = await axios.post('http://localhost:5000/tasks', {
			name: taskName,
			description: taskDescription,
			owner: newTaskOwner.userid,
			ownerName: newTaskOwner.name,
			priority: newTaskPriority.typeName
		});
	
			toast.current.show({severity:'success', summary: 'Sucesso', detail:'Tarefa Criada com Sucesso!', life: 2000});
			onHideDialog();
		} catch (error) {
			toast.current.show({severity:'error', summary: 'Erro!', detail:'Erro ao tentar criar tarefa :(', life: 2000});
		}
    };

    const handleUpdateTask = async () => {
		try {
			const response = await axios.put(`http://localhost:5000/tasks/${editData.id}`, {
			name: taskName,
			description: taskDescription,
			owner: newTaskOwner.userid,
			priority: newTaskPriority.typeName,
			status: newTaskStatus.statusName
		});
        toast.current.show({severity:'success', summary: 'Sucesso', detail:'Tarefa Atualizada com Sucesso!', life: 2000});
        onHideDialog();
		} catch (error) {
			toast.current.show({severity:'error', summary: 'Erro!', detail:'Erro ao tentar atualizar tarefa :(', life: 2000});
		}
    };

    const userTemplate = (option) => {
        const photo = option.foto ? option.foto : userImage
        return (
            <div className="flex align-items-center">
                <Avatar image={photo} />
                <div className='ml-3'>{option.name}</div>
            </div>
        );
    };

    const priorities = [
		{ typeName: "Alta", priority: "Alta" },
		{ typeName: "Média", priority: "Média" },
		{ typeName: "Baixa", priority: "Baixa" }
    ];

    const statusData = [
		{ statusName: "Não Finalizado", status: "Não Finalizado" },
		{ statusName: "Em Andamento", status: "Em Andamento" },
		{ statusName: "Finalizado", status: "Finalizado" },
		{ statusName: "Abandonado", status: "Abandonado" }
    ];

    const onHideDialog = () => {
		setVisible(false)
		setEditData(null)
		setTaskName('')
		setNewTaskOwner(null)
		setNewTaskPriority(null)
		setTaskDescription('')
    }
  
    const onShowWindow = () => {
      	fetchUsers();
    }

    const onConfirmDelete = () => {
        confirmDialog({
            message: 'Você realmente quer deletar essa tarefa?',
            header: 'Confirmação',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept,
            reject
        });
    };

    const accept = async () => {
        try {
			const response = await axios.delete(`http://localhost:5000/tasks/${editData.id}`);
            toast.current.show({severity:'success', summary: 'Sucesso', detail:'Tarefa Excluida com Sucesso!', life: 2000});
            onHideDialog();
		} catch (error) {
			toast.current.show({severity:'error', summary: 'Erro!', detail:'Erro ao tentar excluir tarefa :(', life: 2000});
		}
    }

    const reject = () => {
        return;
    }

    return (
        <Dialog visible={newVisible} header={title} style={{width: '60vw', height: '31rem'}} onShow={onShowWindow} onHide={onHideDialog}>
            <Toast ref={toast} />
            <ConfirmDialog/>
            <div className="flex flex-column gap-2">
                <label htmlFor="taskName">Nome da Tarefa: </label>
                <InputText id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
            </div>
            <div className='flex mt-2'>
            <Dropdown 
                placeholder="Selecione um Responsável"
                options={users}
                value={newTaskOwner}
                optionLabel="name"
                itemTemplate={userTemplate}
                disabled={loading}
                onChange={(e) => setNewTaskOwner(e.value)}
                className="w-full mr-1"
            />
            <Dropdown 
                placeholder="Prioridade"
                options={priorities}
                optionLabel="typeName" 
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.value)}
                className="w-full ml-1"
            />
            <Dropdown 
                placeholder="Status"
                disabled={!editMode}
                options={statusData}
                optionLabel="statusName" 
                value={newTaskStatus}
                onChange={(e) => setNewTaskStatus(e.value)}
                className="w-full ml-1"
            />
            </div>
            <div className="flex flex-column gap-2 mt-2">
                <label htmlFor="taskDescription">Descrição da Tarefa: </label>
                <InputTextarea autoResize className="flex-grow-1 w-full" value={taskDescription} id="taskDescription" onChange={(e) => setTaskDescription(e.target.value)} rows={8} cols={30} />
            </div>
                <div className="dialogBtns pt-2 flex justify-content-end">
                <Button label="Deletar" visible={editMode} onClick={onConfirmDelete} severity="danger" icon="pi pi-trash" size="small"/>
                <Button label="Atualizar" className="ml-2" visible={editMode} onClick={handleUpdateTask} icon="pi pi-sync" size="small"/>
                <Button label="Criar" visible={!editMode} onClick={handleCreateTask} icon="pi pi-plus" size="small"/>
            </div>
        </Dialog>
    );
};

export default NewDialog;