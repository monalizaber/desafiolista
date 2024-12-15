import { useState } from 'react';
import './index.scss';
import Task from '../Task/Task';
import { tasksMock } from '../../mock/tasksMock';

export default function Table() {
  const [tasks, setTasks] = useState(tasksMock);
  const [newTaskName, setNewTaskName] = useState('');

  function addTask(task) {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  }

  function removeTask(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function editTask(taskId, updatedName, updatedComplete) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId 
          ? { ...task, name: updatedName, complete: updatedComplete }
          : task
      )
    );
  }

  const handleAddNewTask = () => {
    const taskName = newTaskName.trim()

    if (taskName) {
      addTask({ id: tasks.length + 1, name: newTaskName, complete: false });
      setNewTaskName('');
    }
  };

  return (
    <div className='table'>
      <table style={{ borderCollapse: 'collapse', width: '600px' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'start' }}>Tarefa</th>
            <th style={{ textAlign: 'start' }}>Status</th>
            <th style={{ textAlign: 'end' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              editTask={editTask}
              removeTask={removeTask}
            />
          ))}
        </tbody>
      </table>
      
      <div className='add-task'>
        <input onChange={(event) => setNewTaskName(event.target.value)} type="text" placeholder='Nova tarefa...' value={newTaskName}/>
        <button className='add-task-btn' onClick={handleAddNewTask}>
          +
        </button>
      </div>
      
    </div>
  );
}
