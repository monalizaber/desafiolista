import React from 'react'
import './index.scss'

export default function Header() {
  return (
    <div className='header'>
      <ul>
        <li>
          <span>Organização</span>
        </li>
        <li className='active'>
          <span>Tarefas</span>
        </li>
      </ul>
    </div>
  )
}
