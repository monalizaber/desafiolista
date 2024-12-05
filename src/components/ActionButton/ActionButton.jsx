import React from 'react'
import './index.scss'

export default function ActionButton({children, action}) {
  return (
    <button onClick={action} className='button'>
      {children}
    </button>
  )
}
