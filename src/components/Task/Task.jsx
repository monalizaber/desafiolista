import React, { useState } from 'react'
import ActionButton from '../ActionButton/ActionButton'
import { FaEdit, FaTrash } from 'react-icons/fa'
import './index.scss'
import Modal from '../Modal/Modal';
import InputGroup from '../InputGroup/InputGroup';

export default function Task({task, editTask, removeTask}) {
  const [taskName, setTaskName] = useState(task.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [isChecked, setIsChecked] = useState(task.complete);

  function handleEdit() {
    editTask(task.id, taskName)
    setIsModalOpen(false)
  }

  function handleCheckboxChange(event) {
    const updatedTask = { ...task, complete: event.target.checked };
    setIsChecked(event.target.checked);

    editTask(task.id, updatedTask.name, event.target.checked);
  }

  function editModal(){
    setIsEdit(true)
    setIsModalOpen(true)
  }

  function deleteModal(){
    setIsEdit(false)
    setIsModalOpen(true)
  }

  return (
    <>
      <tr className='task' key={task.id}>
        <td>{task.name}</td>
        <td style={{ paddingLeft: "25px" }}>
          <input
            type='checkbox' 
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </td>
        <td style={{ textAlign:'end' }}>
          <ActionButton action={editModal} ><FaEdit color='#fff'/></ActionButton>
          <ActionButton action={deleteModal}><FaTrash color='#fff'/></ActionButton>
        </td>
      </tr>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isEdit ? (
          <div className='modal-edit'>
            <h4 style={{textAlign: "center"}}>
              Editar Tarefa
            </h4>

            <InputGroup 
              onChange={(event) => setTaskName(event.target.value)} 
              label={"Nome da tarefa"} 
              placeholder={task.name} 
              value={taskName}
            />

            <div className='confirm-action-container'>
              <button className='cancel-btn' onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button onClick={handleEdit}>Editar tarefa</button>
            </div>
          </div>
        ) : (
          <div>
            <h4 style={{textAlign: "center"}}>
              Confirmar ação
            </h4>

            <span>Certeza que deseja excluir essa tarefa?</span>

            <div className='confirm-action-container'>
              <button className='cancel-btn' onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button className='delete-btn' onClick={() => removeTask(task.id)}>Excluir</button>
            </div>
          </div>
        )}

      </Modal>
    </>
  )
}
