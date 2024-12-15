/* eslint-disable react/prop-types */
import { useState } from "react";
import ActionButton from "../ActionButton/ActionButton";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import "./index.scss";
import Modal from "../Modal/Modal";
import InputGroup from "../InputGroup/InputGroup";

export default function Task({ task, editTask, removeTask }) {
  const [taskName, setTaskName] = useState(task.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [isChecked, setIsChecked] = useState(task.complete);

  function handleEdit() {
    editTask(task.id, taskName);
    setIsModalOpen(false);
  }

  function handleCheckboxChange(event) {
    const updatedTask = { ...task, complete: event.target.checked };
    setIsChecked(event.target.checked);

    editTask(task.id, updatedTask.name, event.target.checked);
  }

  function editModal() {
    setIsEdit(true);
    setIsModalOpen(true);
  }

  function deleteModal() {
    setIsEdit(false);
    setIsModalOpen(true);
  }

  return (
    <>
      <tr className="task" key={task.id}>
        <td>{task.name}</td>
        <td style={{ paddingLeft: "25px" }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </td>
        <td style={{ textAlign: "end" }}>
          <ActionButton action={editModal}>
            <MdEdit size={16} color="#fff" />
          </ActionButton>
          <ActionButton action={deleteModal}>
            <FaTrash color="#fff" />
          </ActionButton>
        </td>
      </tr>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isEdit ? (
          <div className="modal-edit">
            <h2 style={{ textAlign: "center" }}>Deseja editar esse item?</h2>

            <InputGroup
              onChange={(event) => setTaskName(event.target.value)}
              label={"Nome da tarefa"}
              placeholder={task.name}
              value={taskName}
            />

            <div className="confirm-action-container">
              <button onClick={() => setIsModalOpen(false)}>Não</button>
              <button className="cancel-btn" onClick={handleEdit}>
                Sim
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ textAlign: "center" }}>Deseja excluir esse item?</h2>

            <div className="task-prev">
              <span>{taskName}</span>
              <input type="checkbox" checked={isChecked} readOnly />
            </div>

            <div className="confirm-action-container">
              <button
                className="delete-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Não
              </button>
              <button
                className="cancel-btn"
                onClick={() => removeTask(task.id)}
              >
                Sim
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
